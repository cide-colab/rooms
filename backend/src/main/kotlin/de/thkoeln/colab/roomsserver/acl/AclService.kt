package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.extensions.contains
import org.springframework.stereotype.Service
import kotlin.reflect.KClass

data class PermissionForm(
        val targetClass: AclClass,
        val action: AclAction
)

data class RoleForm(
        val name: String,
        val permissions: List<PermissionForm> = listOf()
)

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
            roleAllocationRepo.save(AclRoleAllocation(aclSid, role, scope))

    fun createRoleAllocationFor(principal: String, role: AclRole, scope: AclObjectIdentity) =
            sidRepo.findByPrincipal(principal)
                    ?.let { createRoleAllocationFor(it, role, scope) }


    fun createObjectIdentityFor(targetObject: Any): AclObjectIdentity =
            lookup.getId(targetObject).let { targetId ->

                val targetClass = classRepo.findByClassName(targetObject::class.java.name)
                        ?: throw AclClassNotFoundException(targetObject::class.java.name)

                objectIdRepo.findByObjectIdAndObjectClass(targetId, targetClass)
                        ?: objectIdRepo.save(AclObjectIdentity(targetId, targetClass))
            }


    private fun getClassOrThrowException(targetObject: Any) =
            classRepo.findByClassName(targetObject::class.java.name)
                    ?: throw AclClassNotFoundException(targetObject::class.java.name)

    fun createClassIfNotExistsFor(targetClass: KClass<*>) =
            classRepo.findByClassName(targetClass.java.name)
                    ?: classRepo.save(AclClass(targetClass.java.name))

    fun createSidFor(principal: String) =
            sidRepo.findByPrincipal(principal)
                    ?: sidRepo.save(AclSid(principal))

    fun createRole(roleForm: RoleForm): AclRole? {
        val role = createRole(AclRole(roleForm.name))
        val permissions = roleForm.permissions
                .map { AclPermission(it.targetClass, it.action, role) }
                .map { permissionRepo.save(it) }
        return roleRepo.findById(role.id)
    }

    fun createRole(role: AclRole) = roleRepo.save(role)

    fun createPermissions(permissions: List<AclPermission>) = permissions.map { createPermission(it) }
    fun createPermission(permission: AclPermission) = permissionRepo.save(permission)

//    fun createRole(role: AclRole, permissions: List<AclPermission>) =
//            roleRepo.save(role).also { savedRole ->
//                permissions.forEach {  }
//            }
//            role.permissions
//                    .map { permissionRepo.save(it) }
//                    .let { role.copy(permissions = it) }
//                    .let { roleRepo.save(it) }

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
                    ?.flatMap { it.role.permissions }
                    ?.contains { it.action == action && it.targetClass.id == targetClass.id }
                    ?: false

}