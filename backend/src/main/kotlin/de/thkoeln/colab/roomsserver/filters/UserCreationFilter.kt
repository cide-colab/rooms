/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.filters

import de.thkoeln.colab.roomsserver.models.User
import de.thkoeln.colab.roomsserver.repositories.UserRepo
import org.keycloak.KeycloakPrincipal
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.annotation.WebFilter

@WebFilter(urlPatterns = ["/**"])
@Component
class UserCreationFilter: Filter {

    @Autowired
    private lateinit var userRepo: UserRepo

    private val logger = LoggerFactory.getLogger(UserCreationFilter::class.java)

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        val principal = SecurityContextHolder.getContext().authentication.principal.toString()

        (SecurityContextHolder.getContext().authentication?.principal as? KeycloakPrincipal<*>)
                ?.keycloakSecurityContext
                ?.token
                ?.takeIf { !userRepo.existsByPrincipal(principal) }
                ?.let { userRepo.unsafeSave(it.preferredUsername, it.givenName ?: "", it.familyName ?: "", it.email ?: "", "") }
//                ?.let { User(it.preferredUsername, it.givenName ?: "", it.familyName ?: "", it.email ?: "") }
//                ?.also { logger.debug("Added user ${it.principal}") }

        chain?.doFilter(request, response)
    }

}