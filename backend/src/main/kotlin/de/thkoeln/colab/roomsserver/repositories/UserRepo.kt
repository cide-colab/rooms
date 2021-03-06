/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.acl.AclAction
import de.thkoeln.colab.roomsserver.models.User
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.transaction.annotation.Transactional

interface UserRepo : SecuredRepository<User, Long>  {

    @Query("select u from User u")
    @RestResource(exported = false)
    fun unsafeFindAll(): List<User>

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    fun findByPrincipal(principal: String): User?

    @RestResource(exported = false)
    @Query(value = """SELECT u FROM User u WHERE u.principal = :principal""")
    fun unsecuredFindByPrincipal(principal: String): User?

    //TODO secure
    fun existsByPrincipal(principal: String): Boolean

//     TODO add creation date ...
//    @Modifying
//    @Transactional
//    @RestResource(exported = false)
//    @Query(value = "insert into user(principal, given_name, family_name, email, image_url) VALUES (:principal, :givenName, :familyName, :email, :imageUrl)", nativeQuery = true)
//    fun unsecuredSave(principal: String, givenName: String, familyName: String, email: String?, imageUrl: String?): Int
    // TODO add creation date ...
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @RestResource(exported = false)
    @Query(value = """
        INSERT IGNORE INTO user(principal, given_name, family_name, email, image_url, version) 
        VALUES (:#{#user.principal}, :#{#user.givenName}, :#{#user.familyName}, :#{#user.email}, :#{#user.imageUrl}, :#{#user.version})
    """, nativeQuery = true)
    fun unsecuredSave(user: User): Int

    @RestResource(path = "byPermission")
    @Query("select u from User u")
    @PostFilter("hasPermission(filterObject, #action)")
    fun <T>findAllByPermission(@Param("action") action: AclAction): List<T>
}