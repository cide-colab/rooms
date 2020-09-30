/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.repositories.KRepository
import org.springframework.data.repository.Repository

interface AclClassRepo : KRepository<AclClass, Long> {
    fun findByClassName(className: String): AclClass?
}

interface AclObjectIdentityRepo : KRepository<AclObjectIdentity, Long> {
    fun findByObjectIdAndObjectClass(objectId: Long, objectClass: AclClass): AclObjectIdentity?
}

interface AclSidRepo : KRepository<AclSid, Long> {
    fun findByPrincipal(principal: String): AclSid?
}

interface AclRoleAllocationRepo : KRepository<AclRoleAllocation, Long> {
    fun findAllBySidAndScope(sid: AclSid, objectIdentity: AclObjectIdentity): List<AclRoleAllocation>
    fun findAllBySid(sid: AclSid): List<AclRoleAllocation>
    fun findByScopeAndSidAndRole(scope: AclObjectIdentity?, sid: AclSid, role: AclRole): AclRoleAllocation?

}

interface AclPermissionRepo : KRepository<AclPermission, Long> {
    fun deleteAllByRole(role: AclRole)
    fun existsByRoleAndActionAndTargetClass(role: AclRole, action: AclAction, targetClass: AclClass): Boolean
    fun findByRoleAndActionAndTargetClass(role: AclRole, action: AclAction, targetClass: AclClass): AclPermission?
    fun findByRole(role: AclRole): List<AclPermission>
}

interface AclRoleRepo : KRepository<AclRole, Long> {
    fun findByName(roleName: String): AclRole?
}