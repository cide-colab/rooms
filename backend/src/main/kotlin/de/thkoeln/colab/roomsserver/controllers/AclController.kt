/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.controllers

import de.thkoeln.colab.roomsserver.acl.ANONYMOUS_PRINCIPAL
import de.thkoeln.colab.roomsserver.acl.AclService
import de.thkoeln.colab.roomsserver.acl.ContextForm
import de.thkoeln.colab.roomsserver.acl.PermissionCheckForm
import de.thkoeln.colab.roomsserver.extensions.fixEmbedded
import de.thkoeln.colab.roomsserver.models.AclEntry
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.server.mvc.linkTo
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RepositoryRestController
@RequestMapping("permissions")
class AclController @Autowired constructor(private val aclService: AclService) {

    @PostMapping("/check")
    fun check(authentication: Authentication?, @RequestBody form: PermissionCheckForm) =
            aclService.hasPermission(form, authentication?.principal?.toString() ?: ANONYMOUS_PRINCIPAL)
                    .let { ResponseEntity.ok(it) }

    @GetMapping("/{classAlias}/{id}")
    fun check(authentication: Authentication?, @PathVariable classAlias: String, @PathVariable id: Long) =
            aclService.createAcl(ContextForm(classAlias, id), authentication?.principal?.toString()
                    ?: ANONYMOUS_PRINCIPAL)
                    .let { ResponseEntity.ok(it) }

    @GetMapping("/acl")
    fun acl(authentication: Authentication?): ResponseEntity<CollectionModel<out Any>> =
            aclService.createACL(authentication?.principal?.toString() ?: ANONYMOUS_PRINCIPAL)
                    .let { CollectionModel.of(it) }
                    .apply {
                        add(linkTo<AclController> { acl(authentication) }.withSelfRel())
                    }
                    .fixEmbedded(AclEntry::class.java)
                    .let { ResponseEntity.ok(it) }

}