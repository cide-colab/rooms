package com.thkoeln.cide.roomsserver.repositories

import com.thkoeln.cide.roomsserver.models.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostFilter
import java.util.*


interface UserRepo : Repository<User, UUID> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<User>

    @Query("select u from User u")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<User>

    //    @PreAuthorize("@authManager.hasUserAnyRoleOfType('ADMIN')")
    fun findById(id: UUID): User?

    //    @PreAuthorize("@authManager.hasUserPrincipal(#principal)")
    fun findByPrincipal(principal: String): User?

    fun save(user: User): User?

    fun existsByPrincipal(principal: String): Boolean
}