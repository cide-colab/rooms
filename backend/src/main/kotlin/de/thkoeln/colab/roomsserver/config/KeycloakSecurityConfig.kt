package de.thkoeln.colab.roomsserver.config

//import com.thkoeln.cide.roomsserver.security.PermissionHandlerEvaluator

import org.keycloak.adapters.springsecurity.KeycloakConfiguration
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter
import org.keycloak.adapters.springsecurity.management.HttpSessionManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper
import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@KeycloakConfiguration
class KeycloakSecurityConfig : KeycloakWebSecurityConfigurerAdapter() {

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
    fun corsConfigurer(): WebMvcConfigurer = object : WebMvcConfigurer {
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE")
                    .allowedHeaders("Content-Type, Authorization, Content-Length, X-Requested-With")
        }
    }

//    @Bean
//    fun corsConfigurationSource(): CorsConfigurationSource = UrlBasedCorsConfigurationSource().apply {
//        registerCorsConfiguration("/**", CorsConfiguration().apply {
//            addAllowedOrigin("http://localhost:4200")
//            addAllowedHeader("Content-Type, Authorization, Content-Length, X-Requested-With")
//            addAllowedMethod("POST")
//            addAllowedMethod("PUT")
//            addAllowedMethod("PATCH")
//            addAllowedMethod("GET")
//            addAllowedMethod("OPTIONS")
//            addAllowedMethod("DELETE")
//        })
//    }

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

