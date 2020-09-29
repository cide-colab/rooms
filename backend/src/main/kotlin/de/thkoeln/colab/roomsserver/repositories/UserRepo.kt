/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.User
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import java.util.*
import javax.transaction.Transactional

interface UserRepo : SecuredRepository<User, Long> {

    @Query("select u from User u")
    @RestResource(exported = false)
    fun unsafeFindAll(): List<User>

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    fun findByPrincipal(principal: String): User?

    //TODO secure
    fun existsByPrincipal(principal: String): Boolean

    // TODO add creation date ...
    @Modifying
    @Transactional
    @RestResource(exported = false)
    @Query(value = "insert into user(principal, given_name, family_name, email, image_url) VALUES (:principal, :givenName, :familyName, :email, :imageUrl)", nativeQuery = true)
    fun unsafeSave(principal: String, givenName: String, familyName: String, email: String?, imageUrl: String?): Int
}