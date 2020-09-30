/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.endpoints

import de.thkoeln.colab.roomsserver.acl.*
import de.thkoeln.colab.roomsserver.models.Department
import org.keycloak.representations.idm.authorization.PermissionRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RepositoryRestController
@RequestMapping("permissions")
class AclController @Autowired constructor(private val aclService: AclService) {

    @PostMapping("/check")
    fun check(authentication: Authentication?, @RequestBody form: PermissionCheckForm) =
            aclService.hasPermission(form, authentication?.principal?.toString()?: ANONYMOUS_PRINCIPAL)
                    .let { ResponseEntity.ok(it) }

    @GetMapping("/{classAlias}/{id}")
    fun check(authentication: Authentication?, @PathVariable classAlias: String, @PathVariable id: Long) =
            aclService.createAcl(ContextForm(classAlias, id), authentication?.principal?.toString()?: ANONYMOUS_PRINCIPAL)
                    .let { ResponseEntity.ok(it) }

}