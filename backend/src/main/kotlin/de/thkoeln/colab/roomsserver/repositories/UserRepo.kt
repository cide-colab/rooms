package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import java.util.*

interface UserRepo : SecuredPagingAndSortingRepository<User, UUID> {

    @Query("select u from User u")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<User>

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    fun findByPrincipal(principal: String): User?

    // TODO secure
    fun existsByPrincipal(principal: String): Boolean
}