package de.thkoeln.colab.roomsserver.acl

import org.springframework.data.repository.Repository


interface AclClassRepo : Repository<AclClass, Long> {
    fun save(aclClass: AclClass): AclClass
    fun findByClassName(className: String): AclClass?
}

interface AclObjectIdentityRepo : Repository<AclObjectIdentity, Long> {
    fun findByObjectIdAndObjectClass(objectId: Long, objectClass: AclClass): AclObjectIdentity?
    fun save(aclObjectIdentity: AclObjectIdentity): AclObjectIdentity
}

interface AclSidRepo : Repository<AclSid, Long> {
    fun save(aclSid: AclSid): AclSid
    fun findByPrincipal(principal: String): AclSid?
}

interface AclRoleAllocationRepo: Repository<AclRoleAllocation, Long> {
    fun save(roleAllocation: AclRoleAllocation): AclRoleAllocation
    fun findAllBySidAndScope(sid: AclSid, objectIdentity: AclObjectIdentity): List<AclRoleAllocation>
    fun findAllBySid(it: AclSid): List<AclRoleAllocation>

}

interface AclPermissionRepo: Repository<AclPermission, Long> {
    fun save(permission: AclPermission): AclPermission
}

interface AclRoleRepo: Repository<AclRole, Long> {
    fun save(role: AclRole): AclRole
    fun findById(id: Long): AclRole?
}