package com.thkoeln.cide.roomsserver.config

//import com.thkoeln.cide.roomsserver.security.PermissionHandlerEvaluator
import org.keycloak.adapters.springsecurity.KeycloakConfiguration
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter
import org.keycloak.adapters.springsecurity.management.HttpSessionManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Lazy
import org.springframework.context.annotation.Scope
import org.springframework.context.annotation.ScopedProxyMode
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper
import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@KeycloakConfiguration
class SecurityConfig : KeycloakWebSecurityConfigurerAdapter() {

    @Autowired
    fun configureGlobal(auth: AuthenticationManagerBuilder) {
        val keycloakAuthenticationProvider = keycloakAuthenticationProvider()
        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(SimpleAuthorityMapper())
        auth.authenticationProvider(keycloakAuthenticationProvider);
    }


    override fun configure(http: HttpSecurity) {
        super.configure(http)
        http.cors().and()
                .csrf().disable()
                .authorizeRequests()
                .anyRequest().permitAll()
    }

    override fun sessionAuthenticationStrategy() =
            RegisterSessionAuthenticationStrategy(SessionRegistryImpl())


    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource = UrlBasedCorsConfigurationSource().apply {
        registerCorsConfiguration("/**", CorsConfiguration().apply {
            addAllowedOrigin("http://localhost:4200")
            addAllowedHeader("Content-Type, Authorization, Content-Length, X-Requested-With")
            addAllowedMethod("POST")
            addAllowedMethod("PUT")
            addAllowedMethod("PATCH")
            addAllowedMethod("GET")
            addAllowedMethod("OPTIONS")
            addAllowedMethod("DELETE")
        })
    }

    @Bean
    @ConditionalOnMissingBean(HttpSessionManager::class)
    protected override fun httpSessionManager(): HttpSessionManager? {
        return HttpSessionManager()
    }

//    @Bean
//    @Lazy
//    @Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
//    fun getPermissionEvaluator(aclService: ACLService) = PermissionHandlerEvaluator(aclService)

}

