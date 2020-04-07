package com.thkoeln.cide.roomsserver.security

import com.thkoeln.cide.roomsserver.annotations.Constructable
import com.thkoeln.cide.roomsserver.models.PersistableEntity
import com.thkoeln.cide.roomsserver.services.ACLEntry
import com.thkoeln.cide.roomsserver.services.ACLService
import org.slf4j.LoggerFactory
import org.springframework.security.access.PermissionEvaluator
import org.springframework.security.core.Authentication
import java.io.Serializable
import java.util.*


@Constructable
class PermissionHandlerEvaluator(private val aclService: ACLService) : PermissionEvaluator {

    private val logger = LoggerFactory.getLogger(PermissionHandlerEvaluator::class.java)

    override fun hasPermission(authentication: Authentication?, target: Any?, permission: Any?): Boolean {

        if (permission !is String) return true
        val acl = aclService.getACL(authentication)

        return hasPermission(acl, target, permission)
    }

    private fun hasPermission(acl: List<ACLEntry>, target: Any?, permission: String): Boolean = when (target) {
        null -> acl.any { aclEntry -> aclEntry.id == null && aclEntry.permission == permission }
        is List<*> -> target.all { hasPermission(acl, it, permission) }
        is PersistableEntity -> hasPermissionForId(acl, target.id, permission)
        else -> false
    }

    private fun hasPermissionForId(acl: List<ACLEntry>, id: UUID?, permission: String) =
            acl.any { aclEntry -> aclEntry.id == id && aclEntry.permission == permission }

    override fun hasPermission(authentication: Authentication, targetId: Serializable, targetType: String, permission: Any): Boolean {
        if (permission !is String) return true
        val acl = aclService.getACL(authentication)
        return when (targetId) {
            is UUID -> hasPermissionForId(acl, targetId, permission)
            else -> false
        }
    }

}