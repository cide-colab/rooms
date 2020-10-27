/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.models.AbstractEntity
import org.slf4j.LoggerFactory
import org.springframework.security.access.PermissionEvaluator
import org.springframework.security.core.Authentication
import java.io.Serializable
import java.util.*

class AclPermissionEvaluator(private val aclService: AclService) : PermissionEvaluator {

    private val logger = LoggerFactory.getLogger(AclPermissionEvaluator::class.java)

    override fun hasPermission(authentication: Authentication?, domainObject: Any?, permission: Any?): Boolean {
        val target = if (domainObject is Optional<*>) domainObject.orElse(null) else domainObject
        logger.debug("Checking Permission for Action: $permission on: $target ${if (target is AbstractEntity) target.id.toString() else ""} for: ${authentication?.principal?.toString()}")
        target ?: return false
        permission ?: return false
        val action = AclAction.values()
                .find { it.name.toLowerCase() == permission.toString().toLowerCase() }
                ?: return false

        val principal = authentication?.principal?.toString() ?: ANONYMOUS_PRINCIPAL
        logger.debug("Checking Permission for Action: $action on: $target for: $principal")
        return aclService.hasPermissionForContext(target, principal, action)
    }

    override fun hasPermission(authentication: Authentication?, targetId: Serializable?, targetType: String?, permission: Any?): Boolean {
        return TODO()
    }
}