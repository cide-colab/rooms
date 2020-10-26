/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.controllers

import de.thkoeln.colab.roomsserver.models.User
import de.thkoeln.colab.roomsserver.repositories.AboRepo
import de.thkoeln.colab.roomsserver.repositories.UserRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.hateoas.server.ExposesResourceFor
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@RepositoryRestController
@RequestMapping("/me")
class MeController @Autowired constructor(
        private val userRepo: UserRepo,
        private val aboRepo: AboRepo
) {
//    @GetMapping
//    fun get(authentication: Authentication, assembler: PersistentEntityResourceAssembler): User? {
//        return userRepo.findByPrincipal(authentication.principal.toString())
//    }
    @GetMapping
    fun get(authentication: Authentication?, assembler: PersistentEntityResourceAssembler) =
        authentication?.principal?.toString()
                ?.let { userRepo.findByPrincipal(it) }
                ?.let { assembler.toFullResource(it) }
                ?.let { ResponseEntity.ok(it) }

    @GetMapping("abos")
    fun getAbos(authentication: Authentication?, assembler: PersistentEntityResourceAssembler) =
        authentication?.principal?.toString()
                ?.let { userRepo.findByPrincipal(it) }
                ?.let { aboRepo.findByUserId(it.id) }
                ?.let { assembler.toCollectionModel(it) }
                ?.let { ResponseEntity.ok(it) }

}

