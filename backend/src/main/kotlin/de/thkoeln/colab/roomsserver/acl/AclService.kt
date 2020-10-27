/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.config.RoleConfiguration
import de.thkoeln.colab.roomsserver.models.AclEntry
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
        private val lookup: AclLookupStrategy,
        private val roleConfiguration: RoleConfiguration
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

                val parents = getParents(targetObject)
                val entity = objectIdRepo.findByObjectIdAndObjectClass(targetId, targetClass)
                        ?: AclObjectIdentity(targetId, targetClass, parents)

                objectIdRepo.saveAndFlush(entity)
                        .also { oid ->
                            println(oid.objectId)
                            getOwner(targetObject)?.let { owner ->
                                println("Principal: $owner")
                                this.roleRepo.findByName(roleConfiguration.owner)
                                        ?.let { role -> this.createRoleAllocationFor(owner, role, oid) }
                            }
                        }

            }


//    private fun getClassOrThrowException(targetObject: Any) =
//            classRepo.findByClassName(targetObject::class.java.name)
//                    ?: throw AclClassNotFoundException(targetObject::class.java.name)

    fun createOrUpdateClassByTargetClass(targetClass: AclClass) =
            classRepo.saveAndFlush(classRepo.findByClassName(targetClass.className) ?: targetClass)

    fun createOrUpdateSidByPrincipal(principal: String) =
            sidRepo.saveAndFlush(sidRepo.findByPrincipal(principal) ?: AclSid(principal))

    fun createRoleIfNotExists(role: AclRole) =
            roleRepo.saveAndFlush(role)

    fun createPermissions(permissions: List<AclPermission>) = permissions.map { createPermission(it) }
    fun createPermission(permission: AclPermission) = permissionRepo.saveAndFlush(permission)

    private fun getParents(targetObject: Any) =
            lookup.getParents(targetObject).mapNotNull { parent -> getObjectIdentity(parent) }

    private fun getOwner(targetObject: Any) =
            lookup.getOwnerPrincipal(targetObject)

    private fun getObjectIdentity(targetObject: Any) =
            objectIdRepo.findByObjectIdAndObjectClassClassName(lookup.getId(targetObject), targetObject::class.java.name)


//    private fun hasPermissionForContext(context: AclObjectIdentity, sid: AclSid, permission: AclAction, targetClass: AclClass): Boolean =
//            hasSelfPermission(context, sid, permission, targetClass) ||
//                    context.parent?.let { parent -> hasPermissionForContext(parent, sid, permission, targetClass) } ?: false

//    private fun hasSelfPermission(context: AclObjectIdentity, sid: AclSid, action: AclAction, targetClass: AclClass): Boolean =
//            roleAllocationRepo.findAllBySidAndContext(sid, context)
//                    .flatMap { permissionRepo.findByRole(it.role) }
//                    .contains { it.action == action && it.targetClass.id == targetClass.id }

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
        objectIdRepo.deleteByObjectIdAndObjectClassClassName(lookup.getId(entity), entity::class.java.name)
    }

    fun hasPermissionForContext(targetObject: Any, principal: String, permission: AclAction): Boolean {
        val sid = sidRepo.findByPrincipal(principal)
                ?: return false

        val targetClass = classRepo.findByClassName(targetObject::class.java.name)
                ?: throw AclClassNotFoundException(targetObject::class.java.name)

        val searchContexts = getObjectIdentity(targetObject)?.let { listOf(it) } ?: getParents(targetObject)

        return hasPermissionForContext(sid, permission, targetClass, searchContexts)
    }

    private fun hasPermissionForContext(sid: AclSid, action: AclAction, targetClass: AclClass, contexts: List<AclObjectIdentity>): Boolean {
        return contexts
                .takeIf { contexts.isNotEmpty() }
                ?.all { context ->
                    val r = roleAllocationRepo.findAllBySidAndContext(sid, context).any { allocation ->
                        permissionRepo.findByRole(allocation.role).any { permission ->
                            permission.action == action && permission.targetClass == targetClass
                        }
                    }
                    println("Context: ${context.objectClass.alias} ${context.objectId}: $r")
                    r || hasPermissionForContext(sid, action, targetClass, context.parents)
                }?: false
    }

    fun hasPermission(form: PermissionCheckForm, principal: String): Boolean {

        val sid = sidRepo.findByPrincipal(principal)
                ?: return false

        val targetClass = classRepo.findByAlias(form.target)
                ?: throw AclClassNotFoundException(form.target)

        return form.context
                ?.let {
                    objectIdRepo.findByObjectIdAndObjectClassAlias(form.context.objectId, form.context.objectClass)
                            ?.let { hasPermissionForContext(sid, form.action, targetClass, listOf(it)) }
                            ?: return false
                }
                ?: hasAnyPermission(sid, form.action, targetClass)
    }

    private fun hasAnyPermission(sid: AclSid, action: AclAction, targetClass: AclClass): Boolean {
        return roleAllocationRepo.findAllBySid(sid).any { allocation ->
            permissionRepo.findByRole(allocation.role).any { permission ->
                permission.action == action && permission.targetClass == targetClass
            }
        }
    }

    fun createAcl(contextForm: ContextForm, principal: String): List<PermissionEntry> {
        val sid = sidRepo.findByPrincipal(principal)
                ?: return listOf()

        val contextClass = classRepo.findByAlias(contextForm.objectClass)
                ?: throw AclClassNotFoundException(contextForm.objectClass)

        val context = objectIdRepo.findByObjectIdAndObjectClass(contextForm.objectId, contextClass)
                ?: return listOf()

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

        val parentEntries = context.parents
                .flatMap { getContextPermissions(sid, it) }

        return (contextEntries + parentEntries).distinct()
    }

    fun createACL(principal: String) =
            sidRepo.findByPrincipal(principal)
                    ?.let { createACL(it) }
                    ?: listOf()


    fun createACL(sid: AclSid) = roleAllocationRepo.findAllBySid(sid).flatMap { allocation ->
        permissionRepo.findByRole(allocation.role).flatMap { permission ->
            createACL(allocation.context, permission)
        }
    }


    private fun createACL(context: AclObjectIdentity, permission: AclPermission): List<AclEntry> {
        return listOf(AclEntry(context.objectId, context.objectClass.alias, null, permission.targetClass.alias, permission.action)) +
                objectIdRepo.findAllByParentsContainsAndObjectClassId(context, permission.targetClass.id).flatMap { child ->
                    listOf(AclEntry(context.objectId, context.objectClass.alias, child.id, child.objectClass.alias, permission.action)) +
                            createACL(child, permission)
                }
    }
}