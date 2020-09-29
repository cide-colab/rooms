package de.thkoeln.colab.roomsserver.config

import de.thkoeln.colab.roomsserver.models.User
import de.thkoeln.colab.roomsserver.repositories.UserRepo
import org.keycloak.KeycloakPrincipal
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import java.util.*

class EntityAuditorAware(private val userRepository: UserRepo) : AuditorAware<User> {

    override fun getCurrentAuditor() = SecurityContextHolder.getContext()
            ?.authentication
            ?.takeIf(Authentication::isAuthenticated)
            ?.let(Authentication::getPrincipal)
            ?.toString()
            ?.let(userRepository::findByPrincipal)
            .let { Optional.ofNullable(it) }
}

@Configuration
@EnableJpaAuditing
class AuditConfiguration {

    @Autowired
    private lateinit var userRepository: UserRepo

    @Bean
    fun auditorAware(): AuditorAware<User> {
        return EntityAuditorAware(userRepository)
    }
}