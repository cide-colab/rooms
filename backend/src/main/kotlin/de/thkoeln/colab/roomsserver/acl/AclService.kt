/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.extensions.contains
import org.springframework.stereotype.Service
import org.springframework.transaction.event.TransactionalEventListener
import javax.transaction.Transactional
import kotlin.reflect.KClass

@Service
class AclService(
        private val classRepo: AclClassRepo,
        private val objectIdRepo: AclObjectIdentityRepo,
        private val sidRepo: AclSidRepo,
        private val roleAllocationRepo: AclRoleAllocationRepo,
        private val permissionRepo: AclPermissionRepo,
        private val roleRepo: AclRoleRepo,
        private val lookup: AclLookupStrategy
) {
    fun getRoleAllocationsFor(principal: String) =
            sidRepo.findByPrincipal(principal)
                    ?.let { roleAllocationRepo.findAllBySid(it) }
                    ?: listOf()

    fun createRoleAllocationFor(aclSid: AclSid, role: AclRole, scope: AclObjectIdentity) =
            roleAllocationRepo.saveAndFlush(AclRoleAllocation(aclSid, role, scope))

    fun createRoleAllocationFor(principal: String, role: AclRole, scope: AclObjectIdentity) =
            sidRepo.findByPrincipal(principal)
                    ?.let { createRoleAllocationFor(it, role, scope) }


    fun createOrUpdateObjectIdentityByTargetObject(targetObject: Any): AclObjectIdentity =
            lookup.getId(targetObject).let { targetId ->

                val targetClass = classRepo.findByClassName(targetObject::class.java.name)
                        ?: throw AclClassNotFoundException(targetObject::class.java.name)
                createOrUpdateObjectIdentityByIdAndTargetClass(targetId, targetClass)
            }

    private fun createOrUpdateObjectIdentityByIdAndTargetClass(targetId: Long, targetClass: AclClass) =
            objectIdRepo.saveAndFlush(objectIdRepo.findByObjectIdAndObjectClass(targetId, targetClass)
                    ?: AclObjectIdentity(targetId, targetClass))


    private fun getClassOrThrowException(targetObject: Any) =
            classRepo.findByClassName(targetObject::class.java.name)
                    ?: throw AclClassNotFoundException(targetObject::class.java.name)

    fun createOrUpdateClassByTargetClass(targetClass: KClass<*>) =
            classRepo.saveAndFlush(classRepo.findByClassName(targetClass.java.name) ?: AclClass(targetClass.java.name))

    fun createOrUpdateSidByPrincipal(principal: String) =
            sidRepo.saveAndFlush(sidRepo.findByPrincipal(principal) ?: AclSid(principal))

    fun createRoleIfNotExists(role: AclRole) =
            roleRepo.saveAndFlush(role)

    fun createPermissions(permissions: List<AclPermission>) = permissions.map { createPermission(it) }
    fun createPermission(permission: AclPermission) = permissionRepo.saveAndFlush(permission)

    fun hasPermission(targetObject: Any, principal: String, permission: AclAction) =
            hasPermission(targetObject, principal, permission, getClassOrThrowException(targetObject))

    private fun hasPermission(domainObject: Any, sid: String, permission: AclAction, targetClass: AclClass): Boolean =
            hasSelfPermission(domainObject, sid, permission, targetClass) || lookup.getParents(domainObject)
                    .any { parent -> hasPermission(parent, sid, permission, targetClass) }

    private fun hasSelfPermission(domainObject: Any, principal: String, permission: AclAction, targetClass: AclClass): Boolean =
            getObjectIdentity(domainObject)
                    ?.let { hasPermission(principal, it, permission, targetClass) }
                    ?: false

    private fun getObjectIdentity(domainObject: Any) =
            lookup.getId(domainObject)
                    .let { objectIdRepo.findByObjectIdAndObjectClass(it, getClassOrThrowException(domainObject)) }


    private fun hasPermission(principal: String, targetObjectIdentity: AclObjectIdentity, action: AclAction, targetClass: AclClass) =
            sidRepo.findByPrincipal(principal)
                    ?.let { roleAllocationRepo.findAllBySidAndScope(it, targetObjectIdentity) }
                    ?.flatMap { permissionRepo.findByRole(it.role) }
                    ?.contains { it.action == action && it.targetClass.id == targetClass.id }
                    ?: false

    fun createOrUpdateRoleByName(role: AclRole) = with(roleRepo) {
        val existing = findByName(role.name)
        saveAndFlush(existing ?: role)
    }

    fun createOrUpdatePermission(permission: AclPermission) = with(permissionRepo) {
        val existing = findByRoleAndActionAndTargetClass(permission.role, permission.action, permission.targetClass)
        saveAndFlush(existing ?: permission)
    }

    fun createOrUpdateRoleAllocation(allocation: AclRoleAllocation) = with(roleAllocationRepo) {
        val existing = findByScopeAndSidAndRole(allocation.scope, allocation.sid, allocation.role)
        saveAndFlush(existing ?: allocation)
    }

    @Transactional
    fun deleteObjectIdentityByTargetObject(entity: Any) {
        objectIdRepo.deleteByObjectIdAndObjectClass(lookup.getId(entity), getClassOrThrowException(entity))
    }

}