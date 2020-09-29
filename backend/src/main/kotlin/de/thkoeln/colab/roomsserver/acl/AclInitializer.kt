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

@Configuration
class AclInitializer {

    @Autowired
    private lateinit var aclService: AclService

    @Value("\${rooms.admin.principal}")
    private lateinit var adminPrincipal: String

    @Bean
    fun initializer(): ApplicationRunner = ApplicationRunner {

        val applicationClass = aclService.createOrUpdateClassByTargetClass(Application::class)
        val userClass = aclService.createOrUpdateClassByTargetClass(User::class)
        val roomClass = aclService.createOrUpdateClassByTargetClass(Room::class)
        val departmentClass = aclService.createOrUpdateClassByTargetClass(Department::class)
        val aboClass = aclService.createOrUpdateClassByTargetClass(Abo::class)
        val reservationClass = aclService.createOrUpdateClassByTargetClass(Reservation::class)

        val applicationIdentity = aclService.createOrUpdateObjectIdentityByTargetObject(Application)

        val adminRole = aclService.createOrUpdateRoleByName(AclRole("Admin"))
        val guestRole = aclService.createOrUpdateRoleByName(AclRole("Guest"))

        listOf(userClass, roomClass, departmentClass, aboClass, reservationClass, applicationClass)
                .flatMap { targetClass -> AclAction.values().map { action -> AclPermission(targetClass, action, adminRole) } }
                .map { aclService.createOrUpdatePermission(it) }

        val admin = aclService.createOrUpdateSidByPrincipal(adminPrincipal)
        val anonymous = aclService.createOrUpdateSidByPrincipal(ANONYMOUS_PRINCIPAL)

        aclService.createOrUpdateRoleAllocation(AclRoleAllocation(admin, adminRole, applicationIdentity))
        aclService.createOrUpdateRoleAllocation(AclRoleAllocation(anonymous, guestRole, applicationIdentity))

    }

}