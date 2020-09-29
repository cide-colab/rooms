package de.thkoeln.colab.roomsserver.acl

//import de.thkoeln.colab.roomsserver.services.ACLService

import de.thkoeln.colab.roomsserver.models.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class AclInitializer {

    @Autowired
    private lateinit var aclService: AclService

    @Value("\${rooms.admin.principal}")
    private lateinit var adminPrincipal: String

    @Bean
    fun initializer(): ApplicationRunner = ApplicationRunner {

        val applicationClass = aclService.createClassIfNotExistsFor(Application::class)
        val userClass = aclService.createClassIfNotExistsFor(User::class)
        val roomClass = aclService.createClassIfNotExistsFor(Room::class)
        val departmentClass = aclService.createClassIfNotExistsFor(Department::class)
        val aboClass = aclService.createClassIfNotExistsFor(Abo::class)
        val reservationClass = aclService.createClassIfNotExistsFor(Reservation::class)
        val itemClass = aclService.createClassIfNotExistsFor(Item::class)

        val applicationIdentity = aclService.createObjectIdentityFor(Application)


        val allowAll = listOf(userClass, roomClass, departmentClass, aboClass, reservationClass, itemClass, applicationClass)
                .flatMap { targetClass -> AclAction.values().map { action -> PermissionForm(targetClass, action) } }

        val admin = aclService.createSidFor(adminPrincipal)
        val anonymous = aclService.createSidFor(ANONYMOUS_PRINCIPAL)

        aclService.createRole(RoleForm("Admin", allowAll))?.let {  adminRole ->
            aclService.createRoleAllocationFor(admin, adminRole, applicationIdentity)
        }

        aclService.createRole(RoleForm("Guest"))?.let { guestRole ->
            aclService.createRoleAllocationFor(anonymous, guestRole, applicationIdentity)
        }

    }

}