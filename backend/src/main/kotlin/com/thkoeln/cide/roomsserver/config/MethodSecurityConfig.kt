package com.thkoeln.cide.roomsserver.config

//import com.thkoeln.cide.roomsserver.security.PermissionHandlerEvaluator
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.cache.ehcache.EhCacheFactoryBean
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler
import org.springframework.security.acls.AclPermissionEvaluator
import org.springframework.security.acls.domain.*
import org.springframework.security.acls.jdbc.BasicLookupStrategy
import org.springframework.security.acls.jdbc.JdbcMutableAclService
import org.springframework.security.acls.jdbc.LookupStrategy
import org.springframework.security.acls.model.PermissionGrantingStrategy
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration
import org.springframework.security.core.authority.SimpleGrantedAuthority
import javax.sql.DataSource


@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
class AclMethodSecurityConfiguration : GlobalMethodSecurityConfiguration() {

    @Autowired
    private lateinit var defaultMethodSecurityExpressionHandler: MethodSecurityExpressionHandler

    @Bean
    fun getDataSource(): DataSource {
        val dataSourceBuilder = DataSourceBuilder.create()
        dataSourceBuilder.driverClassName("com.mysql.jdbc.Driver")
        dataSourceBuilder.url("jdbc:mysql://localhost:3309/rooms_dev?autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true")
        dataSourceBuilder.username("rooms_dev")
        dataSourceBuilder.password("1YaKN6M6dP13")
        return dataSourceBuilder.build()
    }

//    @Autowired
//    private lateinit var dataSource: DataSource

    override fun createExpressionHandler(): MethodSecurityExpressionHandler =
            defaultMethodSecurityExpressionHandler

    @Bean
    fun defaultMethodSecurityExpressionHandler(): MethodSecurityExpressionHandler =
            DefaultMethodSecurityExpressionHandler().apply {
                setPermissionEvaluator(AclPermissionEvaluator(aclService()))
            }

    @Bean
    fun aclService(): JdbcMutableAclService =
            JdbcMutableAclService(getDataSource(), lookupStrategy(), aclCache())


    @Bean
    fun aclAuthorizationStrategy(): AclAuthorizationStrategy? =
            AclAuthorizationStrategyImpl(SimpleGrantedAuthority("ROLE_ADMIN"))

    @Bean
    fun permissionGrantingStrategy(): PermissionGrantingStrategy =
            DefaultPermissionGrantingStrategy(ConsoleAuditLogger())

    @Bean
    fun aclCache(): EhCacheBasedAclCache? =
            EhCacheBasedAclCache(
                    aclEhCacheFactoryBean().getObject(),
                    permissionGrantingStrategy(),
                    aclAuthorizationStrategy()
            )

    @Bean
    fun aclEhCacheFactoryBean(): EhCacheFactoryBean =
            EhCacheFactoryBean().apply {
                setCacheManager(aclCacheManager().getObject()!!)
                setCacheName("aclCache")
            }

    @Bean
    fun aclCacheManager(): EhCacheManagerFactoryBean =
            EhCacheManagerFactoryBean()

    @Bean
    fun lookupStrategy(): LookupStrategy =
            BasicLookupStrategy(
                    getDataSource(),
                    aclCache(),
                    aclAuthorizationStrategy(),
                    ConsoleAuditLogger()
            )
}