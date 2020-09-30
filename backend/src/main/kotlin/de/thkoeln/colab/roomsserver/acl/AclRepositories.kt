/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.repositories.InternalRepository
import de.thkoeln.colab.roomsserver.repositories.KRepository
import org.springframework.data.repository.Repository

interface AclClassRepo : InternalRepository<AclClass, Long> {
    fun findByClassName(className: String): AclClass?
}

interface AclObjectIdentityRepo : InternalRepository<AclObjectIdentity, Long> {
    fun findByObjectIdAndObjectClass(objectId: Long, objectClass: AclClass): AclObjectIdentity?
    fun deleteByObjectIdAndObjectClass(id: Long, classOrThrowException: AclClass)
}

interface AclSidRepo : InternalRepository<AclSid, Long> {
    fun findByPrincipal(principal: String): AclSid?
}

interface AclRoleAllocationRepo : InternalRepository<AclRoleAllocation, Long> {
    fun findAllBySidAndScope(sid: AclSid, objectIdentity: AclObjectIdentity): List<AclRoleAllocation>
    fun findAllBySid(sid: AclSid): List<AclRoleAllocation>
    fun findByScopeAndSidAndRole(scope: AclObjectIdentity?, sid: AclSid, role: AclRole): AclRoleAllocation?

}

interface AclPermissionRepo : InternalRepository<AclPermission, Long> {
    fun deleteAllByRole(role: AclRole)
    fun existsByRoleAndActionAndTargetClass(role: AclRole, action: AclAction, targetClass: AclClass): Boolean
    fun findByRoleAndActionAndTargetClass(role: AclRole, action: AclAction, targetClass: AclClass): AclPermission?
    fun findByRole(role: AclRole): List<AclPermission>
}

interface AclRoleRepo : InternalRepository<AclRole, Long> {
    fun findByName(roleName: String): AclRole?
}