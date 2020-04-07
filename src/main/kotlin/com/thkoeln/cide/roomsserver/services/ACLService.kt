package com.thkoeln.cide.roomsserver.services

import com.thkoeln.cide.roomsserver.models.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import java.util.*


data class ACLEntry(val id: UUID?, val type: String?, val permission: String)

inline fun <reified T : PersistableEntity> aclEntryFor(obj: T?, permission: String) =
        ACLEntry(obj?.id, obj?.let { it::class.java.simpleName }, permission)

object Permissions {
    const val createDepartment = "create:department"
    const val createReservation = "create:reservation"
    const val createRole = "create:role"
    const val createRoom = "create:room"
    const val createAbo = "create:abo"
    const val update = "update"
    const val read = "read"
    const val delete = "delete"

}

@Service
class ACLService @Autowired constructor(
        private val userRepository: UserRepository,
        private val roomRepository: RoomRepository,
        private val departmentRepository: DepartmentRepository,
        private val roleRepository: RoleRepository,
        private val reservationRepository: ReservationRepository,
        private val aboRepository: AboRepository
) {

    private val logger = LoggerFactory.getLogger(ACLService::class.java)

    fun getACL(authentication: Authentication?): List<ACLEntry> = authentication
            ?.principal
            ?.toString()
            ?.let { userRepository.findByPrincipal(it) }
            .let { getACL(it) }

    fun getACL(authentication: Authentication?, type: String): List<ACLEntry> = authentication
            ?.principal
            ?.toString()
            ?.let { userRepository.findByPrincipal(it) }
            .let { getACL(it, type) }

    fun getACL(user: User?): List<ACLEntry> =
            createACLForApp(user) +
                    createACLForRooms(user) +
                    createACLForDepartments(user) +
                    createACLForUsers(user) +
                    createACLForRoles(user) +
                    createACLForReservations(user) +
                    createACLForAbo(user)

    fun getACL(user: User?, type: String): List<ACLEntry> = when (type.toUpperCase()) {
        Room::class.java.simpleName.toUpperCase() -> createACLForRooms(user)
        Department::class.java.simpleName.toUpperCase() -> createACLForDepartments(user)
        User::class.java.simpleName.toUpperCase() -> createACLForUsers(user)
        Role::class.java.simpleName.toUpperCase() -> createACLForRoles(user)
        Reservation::class.java.simpleName.toUpperCase() -> createACLForReservations(user)
        Abo::class.java.simpleName.toUpperCase() -> createACLForAbo(user)
        else -> emptyList()
    }

    fun createACLForApp(user: User?): List<ACLEntry> = when {
        user.hasAnyRole { it.isAppAdmin() } -> listOf(
                aclEntryFor<PersistableEntity>(null, Permissions.createDepartment)
        )
        else -> emptyList()
    }

    fun createACLForRooms(user: User?): List<ACLEntry> = roomRepository.uncheckedFindAll().flatMap { room ->
        when {
            user.hasAnyRole { it.isAppAdmin() || it.isAdminFor(room.department) || it.isAdminFor(room) } -> listOf(
                    aclEntryFor(room, Permissions.read),
                    aclEntryFor(room, Permissions.update),
                    aclEntryFor(room, Permissions.delete),
                    aclEntryFor(room, Permissions.createAbo),
                    aclEntryFor(room, Permissions.createRole),
                    aclEntryFor(room, Permissions.createReservation)
            )
            else -> listOf(
                    aclEntryFor(room, Permissions.read)
            )
        }
    }

    fun createACLForDepartments(user: User?): List<ACLEntry> = departmentRepository.uncheckedFindAll().flatMap { department ->
        when {
            user.hasAnyRole { it.isAppAdmin() || it.isAdminFor(department) } -> listOf(
                    aclEntryFor(department, Permissions.read),
                    aclEntryFor(department, Permissions.update),
                    aclEntryFor(department, Permissions.delete),
                    aclEntryFor(department, Permissions.createRoom),
                    aclEntryFor(department, Permissions.createRole)
            )
            else -> listOf(
                    aclEntryFor(department, Permissions.read)
            )
        }
    }

    fun createACLForUsers(user: User?): List<ACLEntry> = userRepository.uncheckedFindAll().flatMap { userEntry ->
        when {
            user.isOwnerOf(userEntry) || user.hasAnyRole { it.isAppAdmin() } -> listOf(
                    aclEntryFor(userEntry, Permissions.read),
                    aclEntryFor(userEntry, Permissions.update),
                    aclEntryFor(userEntry, Permissions.createReservation)
            )
            else -> emptyList()
        }
    }

    fun createACLForRoles(user: User?): List<ACLEntry> = roleRepository.uncheckedFindAll().flatMap { role ->
        when {
            user.hasAnyRole { it.isAppAdmin() || it.isAdminFor(role.department) || it.isAdminFor(role.room) } -> listOf(
                    aclEntryFor(role, Permissions.read),
                    aclEntryFor(role, Permissions.update),
                    aclEntryFor(role, Permissions.delete)
            )
            else -> listOf(
                    aclEntryFor(role, Permissions.read)
            )
        }
    }

    fun createACLForReservations(user: User?): List<ACLEntry> = reservationRepository.uncheckedFindAll().flatMap { reservation ->
        when {
            user.isOwnerOf(reservation) || user.hasAnyRole { it.isAppAdmin() || it.isAdminFor(reservation.room) } -> listOf(
                    aclEntryFor(reservation, Permissions.read),
                    aclEntryFor(reservation, Permissions.update),
                    aclEntryFor(reservation, Permissions.delete)
            )
            else -> listOf(
                    aclEntryFor(reservation, Permissions.read)
            )
        }
    }

    fun createACLForAbo(user: User?): List<ACLEntry> = aboRepository.uncheckedFindAll().flatMap { abo ->
        when {
            user.hasAnyRole { role -> role.isAppAdmin() || abo.rooms.all { role.isAdminFor(it) } } -> listOf(
                    aclEntryFor(abo, Permissions.read),
                    aclEntryFor(abo, Permissions.update),
                    aclEntryFor(abo, Permissions.delete)
            )
            user.isOwnerOf(abo) -> listOf(
                    aclEntryFor(abo, Permissions.read)
            )
            else -> emptyList()
        }
    }

    private fun User?.hasAnyRole(block: (Role) -> Boolean) = this?.roles?.any(block) == true
    private fun User?.isOwnerOf(ownable: Ownable) = this != null && this == ownable.user
    private fun User?.isOwnerOf(user: User) = this != null && this == user

    private fun Role.isAppAdmin() = scope == Scope.APP && role == RoleName.ADMIN
    private fun Role.isAdminFor(department: Department?) = department != null && scope == Scope.DEPARTMENT && role == RoleName.ADMIN && department == department
    private fun Role.isAdminFor(room: Room?) = room != null && scope == Scope.ROOM && role == RoleName.ADMIN && room == room

}