/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.extensions.contains
import org.springframework.stereotype.Service
import javax.transaction.Transactional

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

    fun createRoleAllocationFor(principal: String, role: AclRole, context: AclObjectIdentity) =
            sidRepo.findByPrincipal(principal)
                    ?.let { createRoleAllocationFor(it, role, context) }


    fun createOrUpdateObjectIdentityByTargetObject(targetObject: Any): AclObjectIdentity =
            lookup.getId(targetObject).let { targetId ->

                val targetClass = classRepo.findByClassName(targetObject::class.java.name)
                        ?: throw AclClassNotFoundException(targetObject::class.java.name)

                val parent = getParent(targetObject)
                val entity = objectIdRepo.findByObjectIdAndObjectClass(targetId, targetClass)
                        ?: AclObjectIdentity(targetId, targetClass, parent)

                objectIdRepo.saveAndFlush(entity)
            }


    private fun getClassOrThrowException(targetObject: Any) =
            classRepo.findByClassName(targetObject::class.java.name)
                    ?: throw AclClassNotFoundException(targetObject::class.java.name)

    fun createOrUpdateClassByTargetClass(targetClass: AclClass) =
            classRepo.saveAndFlush(classRepo.findByClassName(targetClass.className) ?: targetClass)

    fun createOrUpdateSidByPrincipal(principal: String) =
            sidRepo.saveAndFlush(sidRepo.findByPrincipal(principal) ?: AclSid(principal))

    fun createRoleIfNotExists(role: AclRole) =
            roleRepo.saveAndFlush(role)

    fun createPermissions(permissions: List<AclPermission>) = permissions.map { createPermission(it) }
    fun createPermission(permission: AclPermission) = permissionRepo.saveAndFlush(permission)

    fun hasPermission(targetObject: Any, principal: String, permission: AclAction): Boolean {
        val sid = sidRepo.findByPrincipal(principal) ?: return false
        val targetClass = getClassOrThrowException(targetObject)
        val context = getObjectIdentity(targetObject) ?: getParent(targetObject) ?: return false

        return hasPermission(context, sid, permission, targetClass)
    }

    private fun getParent(targetObject: Any) =
        lookup.getParent(targetObject)?.let { parent -> getObjectIdentity(parent) }


    private fun getObjectIdentity(targetObject: Any) =
            objectIdRepo.findByObjectIdAndObjectClass(lookup.getId(targetObject), getClassOrThrowException(targetObject))


    private fun hasPermission(context: AclObjectIdentity, sid: AclSid, permission: AclAction, targetClass: AclClass): Boolean =
            hasSelfPermission(context, sid, permission, targetClass) ||
                    context.parent?.let { parent -> hasPermission(parent, sid, permission, targetClass) } ?: false

    private fun hasSelfPermission(context: AclObjectIdentity, sid: AclSid, action: AclAction, targetClass: AclClass): Boolean =
            roleAllocationRepo.findAllBySidAndContext(sid, context)
                    .flatMap { permissionRepo.findByRole(it.role) }
                    .contains { it.action == action && it.targetClass.id == targetClass.id }

    fun createOrUpdateRoleByName(role: AclRole) = with(roleRepo) {
        val existing = findByName(role.name)
        saveAndFlush(existing ?: role)
    }

    fun createOrUpdatePermission(permission: AclPermission) = with(permissionRepo) {
        val existing = findByRoleAndActionAndTargetClass(permission.role, permission.action, permission.targetClass)
        saveAndFlush(existing ?: permission)
    }

    fun createOrUpdateRoleAllocation(allocation: AclRoleAllocation) = with(roleAllocationRepo) {
        val existing = findByContextAndSidAndRole(allocation.context, allocation.sid, allocation.role)
        saveAndFlush(existing ?: allocation)
    }

    @Transactional
    fun deleteObjectIdentityByTargetObject(entity: Any) {
        objectIdRepo.deleteByObjectIdAndObjectClass(lookup.getId(entity), getClassOrThrowException(entity))
    }

    fun hasPermission(form: PermissionCheckForm, principal: String): Boolean {
        val sid = sidRepo.findByPrincipal(principal) ?: return false
        val targetClass = getClassByAliasOrThrowException(form.target)
        val contextClass = getClassByAliasOrThrowException(form.context.classAlias)
        val context = objectIdRepo.findByObjectIdAndObjectClass(form.context.id, contextClass) ?: return false
        return hasPermission(context, sid, form.action, targetClass)
    }

    private fun getClassByAliasOrThrowException(alias: String): AclClass =
        classRepo.findByAlias(alias) ?: throw AclClassNotFoundException(alias)

    fun createAcl(contextForm: ContextForm, principal: String): List<PermissionEntry> {
        val sid = sidRepo.findByPrincipal(principal) ?: return listOf()
        val contextClass = getClassByAliasOrThrowException(contextForm.classAlias)
        val context = objectIdRepo.findByObjectIdAndObjectClass(contextForm.id, contextClass) ?: return listOf()
        return getContextPermissions(sid, context)
    }

    private fun getContextPermissions(sid: AclSid, context: AclObjectIdentity): List<PermissionEntry> {
        val contextEntries = roleAllocationRepo.findAllBySidAndContext(sid, context).flatMap { allocation ->
            permissionRepo.findByRole(allocation.role).map { permission ->
                PermissionEntry(
                        target = permission.targetClass.alias,
                        context = allocation.context.objectClass.alias,
                        contextId = allocation.context.objectId,
                        action = permission.action
                )
            }
        }
        val parentEntries = (context.parent?.let { getContextPermissions(sid, it) } ?: listOf())

        val allEntries = contextEntries + parentEntries
        return allEntries.distinct()
    }
}