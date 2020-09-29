package de.thkoeln.colab.roomsserver.acl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.PermissionEvaluator
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.io.Serializable

class AclPermissionEvaluator(private val aclService: AclService) : PermissionEvaluator {

    override fun hasPermission(authentication: Authentication?, domainObject: Any?, permission: Any?): Boolean {
        if(domainObject == null || permission !is AclAction) return false
        val principal = authentication?.principal?.toString() ?: ANONYMOUS_PRINCIPAL
        return aclService.hasPermission(domainObject, principal, permission)
    }


    override fun hasPermission(authentication: Authentication?, targetId: Serializable?, targetType: String?, permission: Any?): Boolean {
        return TODO()
    }
}