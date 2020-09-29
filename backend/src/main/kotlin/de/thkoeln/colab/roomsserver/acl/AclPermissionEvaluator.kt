/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import org.springframework.security.access.PermissionEvaluator
import org.springframework.security.core.Authentication
import java.io.Serializable

class AclPermissionEvaluator(private val aclService: AclService) : PermissionEvaluator {

    override fun hasPermission(authentication: Authentication?, domainObject: Any?, permission: Any?): Boolean {
        domainObject ?: return false
        permission ?: return false
        val action = AclAction.values()
                .find { it.name.toLowerCase() == permission.toString().toLowerCase() }
                ?: return false

        val principal = authentication?.principal?.toString() ?: ANONYMOUS_PRINCIPAL
        return aclService.hasPermission(domainObject, principal, action)
    }

    override fun hasPermission(authentication: Authentication?, targetId: Serializable?, targetType: String?, permission: Any?): Boolean {
        return TODO()
    }
}