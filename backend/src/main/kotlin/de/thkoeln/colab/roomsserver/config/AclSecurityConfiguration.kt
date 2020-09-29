package de.thkoeln.colab.roomsserver.config

//import com.thkoeln.cide.roomsserver.security.PermissionHandlerEvaluator
import de.thkoeln.colab.roomsserver.acl.AclPermissionEvaluator
import de.thkoeln.colab.roomsserver.acl.AclService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration


@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
class AclSecurityConfiguration : GlobalMethodSecurityConfiguration() {

    @Autowired
    private lateinit var aclService: AclService

    override fun createExpressionHandler(): MethodSecurityExpressionHandler =
            DefaultMethodSecurityExpressionHandler().apply {
                setPermissionEvaluator(AclPermissionEvaluator(aclService))
            }

}