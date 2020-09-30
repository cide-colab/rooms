/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.models.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import de.thkoeln.colab.roomsserver.acl.AclAction.*

@Configuration
class AclInitializer {

    @Autowired
    private lateinit var aclService: AclService

    @Value("\${rooms.admin.principal}")
    private lateinit var adminPrincipal: String

    @Bean
    fun initializer(): ApplicationRunner = ApplicationRunner {

        val applicationClass = aclService.createOrUpdateClassByTargetClass(AclClass(Application::class.java.name, "application", "Application"))
        val userClass = aclService.createOrUpdateClassByTargetClass(AclClass(User::class.java.name, "user", "User"))
        val roomClass = aclService.createOrUpdateClassByTargetClass(AclClass(Room::class.java.name, "room", "Room"))
        val departmentClass = aclService.createOrUpdateClassByTargetClass(AclClass(Department::class.java.name, "department", "Department"))
        val aboClass = aclService.createOrUpdateClassByTargetClass(AclClass(Abo::class.java.name, "abo", "Abo"))
        val reservationClass = aclService.createOrUpdateClassByTargetClass(AclClass(Reservation::class.java.name, "reservation", "Reservation"))

        val applicationIdentity = aclService.createOrUpdateObjectIdentityByTargetObject(Application)

        val adminRole = aclService.createOrUpdateRoleByName(AclRole("Admin"))
        val guestRole = aclService.createOrUpdateRoleByName(AclRole("Guest"))
        val userRole = aclService.createOrUpdateRoleByName(AclRole("User"))
        val ownerRole = aclService.createOrUpdateRoleByName(AclRole("Owner"))

        fun AclRole.addPermissions(targetClass: AclClass, vararg actions: AclAction) {
            actions.forEach { aclService.createOrUpdatePermission(AclPermission(targetClass, it, this)) }
        }

        adminRole.addPermissions(userClass, READ)
        adminRole.addPermissions(departmentClass, CREATE, READ, UPDATE, DELETE)
        adminRole.addPermissions(roomClass, CREATE, READ, UPDATE, DELETE)
        adminRole.addPermissions(aboClass, CREATE, READ, UPDATE, DELETE)
        adminRole.addPermissions(reservationClass, CREATE, READ, UPDATE, DELETE)

        guestRole.addPermissions(departmentClass, READ)
        guestRole.addPermissions(roomClass, READ)
        guestRole.addPermissions(reservationClass, READ)

        userRole.addPermissions(departmentClass, READ)
        userRole.addPermissions(roomClass, READ)
        userRole.addPermissions(reservationClass, READ)

        ownerRole.addPermissions(userClass, READ)
        ownerRole.addPermissions(aboClass, READ)
        ownerRole.addPermissions(reservationClass, CREATE, READ, UPDATE, DELETE)

        val admin = aclService.createOrUpdateSidByPrincipal(adminPrincipal)
        val anonymous = aclService.createOrUpdateSidByPrincipal(ANONYMOUS_PRINCIPAL)

        aclService.createOrUpdateRoleAllocation(AclRoleAllocation(admin, adminRole, applicationIdentity))
        aclService.createOrUpdateRoleAllocation(AclRoleAllocation(admin, userRole, applicationIdentity))

        aclService.createOrUpdateRoleAllocation(AclRoleAllocation(anonymous, guestRole, applicationIdentity))

    }

}