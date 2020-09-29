/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import org.springframework.data.repository.Repository

interface AclClassRepo : Repository<AclClass, Long> {
    fun saveAndFlush(aclClass: AclClass): AclClass
    fun findByClassName(className: String): AclClass?
}

interface AclObjectIdentityRepo : Repository<AclObjectIdentity, Long> {
    fun findByObjectIdAndObjectClass(objectId: Long, objectClass: AclClass): AclObjectIdentity?
    fun saveAndFlush(aclObjectIdentity: AclObjectIdentity): AclObjectIdentity
}

interface AclSidRepo : Repository<AclSid, Long> {
    fun saveAndFlush(aclSid: AclSid): AclSid
    fun findByPrincipal(principal: String): AclSid?
}

interface AclRoleAllocationRepo : Repository<AclRoleAllocation, Long> {
    fun saveAndFlush(roleAllocation: AclRoleAllocation): AclRoleAllocation
    fun findAllBySidAndScope(sid: AclSid, objectIdentity: AclObjectIdentity): List<AclRoleAllocation>
    fun findAllBySid(sid: AclSid): List<AclRoleAllocation>
    fun findByScopeAndSidAndRole(scope: AclObjectIdentity?, sid: AclSid, role: AclRole): AclRoleAllocation?

}

interface AclPermissionRepo : Repository<AclPermission, Long> {
    fun deleteAllByRole(role: AclRole)
    fun existsByRoleAndActionAndTargetClass(role: AclRole, action: AclAction, targetClass: AclClass): Boolean
    fun findByRoleAndActionAndTargetClass(role: AclRole, action: AclAction, targetClass: AclClass): AclPermission?
    fun saveAndFlush(permission: AclPermission): AclPermission
}

interface AclRoleRepo : Repository<AclRole, Long> {
    fun saveAndFlush(role: AclRole): AclRole
    fun findById(id: Long): AclRole?
    fun findByName(roleName: String): AclRole?
}