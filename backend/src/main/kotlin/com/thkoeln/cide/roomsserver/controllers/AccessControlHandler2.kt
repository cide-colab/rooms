package com.thkoeln.cide.roomsserver.controllers

import com.thkoeln.cide.roomsserver.models.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationEventPublisher
import org.springframework.data.rest.core.annotation.HandleAfterCreate
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.data.rest.core.event.AfterCreateEvent
import org.springframework.data.rest.core.event.BeforeCreateEvent
import org.springframework.stereotype.Component
import java.util.*
import javax.transaction.Transactional

enum class PersistableType {
    ACCESS_CONTROL_ITEM,
    USER,
    ROLE,
    DEPARTMENT,
    ROOM,
    RESERVATION,
    ABO,
    APP
}

object Permissions {
    const val UPDATE = "UPDATE"
    const val READ = "READ"
    const val DELETE = "DELETE"
    fun create(type: PersistableType) = "CREATE:${type}"
}

@Component
@RepositoryEventHandler
class AccessControlHandler2 @Autowired constructor(
        private val eventPublisher: ApplicationEventPublisher,
        private val aclRepository: ACLRepository,
        private val roomRepository: RoomRepository,
        private val userRepository: UserRepository,
        private val departmentRepository: DepartmentRepository
) {

    private var logger = LoggerFactory.getLogger(AccessControlHandler2::class.java)
    private var anonymousPrinciple: String = ANONYMOUS_PRINCIPAL

    /**
     * Abhängigkeiten:
     *  / = No Parent   - = Never Used
     * 1-   APP READ -> /                                       OK
     * 2-   APP UPDATE -> /                                     OK
     * 3-   APP CREATE:DEPARTMENT -> 2                          OK
     * 4-   APP CREATE:ACCESS_CONTROL_ITEM -> 2                 OK
     * 5-   DEPARTMENT UPDATE -> 2                              OK
     * 6-   DEPARTMENT DELETE -> 2                              OK
     * 7-   DEPARTMENT READ -> 1                                OK
     * 8-   DEPARTMENT CREATE:ROOM -> 5                         OK
     * 9-   DEPARTMENT CREATE:ACCESS_CONTROL_ITEM -> 5          OK
     * 10-  ROOM UPDATE -> 5                                    OK
     * 11-  ROOM READ -> 7                                      OK
     * 12-  ROOM DELETE -> 5                                    OK
     * 13-  ROOM CREATE:ABO -> 10                               OK
     * 14-  ROOM CREATE:RESERVATION -> 11                       OK
     * 15-  ROOM CREATE:ACCESS_CONTROL_ITEM -> 10               OK
     * 16-  USER UPDATE -> /
     * 17-  USER READ -> owner, 2, 4, 9, 13, 15
     * 18-  RESERVATION READ ->
     * 19-  RESERVATION UPDATE ->
     * 20-  RESERVATION DELETE ->
     * 21-  ABO READ ->
     * 22-  ABO DELETE ->
     * 23-  ABO UPDATE ->
     * 24-  ABO CREATE:RESERVATION ->
     * 25-  ACCESS_CONTROL_ITEM READ ->
     * 26-  ACCESS_CONTROL_ITEM UPDATE ->
     * 27-  ACCESS_CONTROL_ITEM DELETE ->
     */
    @HandleAfterCreate(AccessControlItem::class)
    fun afterCreateAccessControlItem(item: AccessControlItem) {
        when {
            // 1-   APP READ
            item.matches(PersistableType.APP, Permissions.READ) -> {
                // 7-   DEPARTMENT READ
                departmentRepository.unsaveFindAll().grantPermission(item.user, item, Permissions.READ).save()
            }
            // 2-   APP UPDATE
            item.matches(PersistableType.APP, Permissions.UPDATE) -> {
                // 3-   APP CREATE:DEPARTMENT
                // 4-   APP CREATE:ACCESS_CONTROL_ITEM
                item.user.addPermission(null, item, Permissions.create(PersistableType.DEPARTMENT), Permissions.create(PersistableType.ACCESS_CONTROL_ITEM)).save()
                // 5-   DEPARTMENT UPDATE
                // 6-   DEPARTMENT DELETE
                departmentRepository.unsaveFindAll().grantPermission(item.user, item, Permissions.UPDATE, Permissions.DELETE).save()
            }
            // 3-   APP CREATE:DEPARTMENT
            item.matches(PersistableType.APP, Permissions.create(PersistableType.DEPARTMENT)) -> {
            }
            // 4-   APP CREATE:ACCESS_CONTROL_ITEM
            item.matches(PersistableType.APP, Permissions.create(PersistableType.ACCESS_CONTROL_ITEM)) -> {
            }
            // 5-   DEPARTMENT UPDATE
            item.matches(PersistableType.DEPARTMENT, Permissions.UPDATE) && item.entityId != null -> departmentRepository.unsaveFindById(item.entityId)?.apply {
                // 8-   DEPARTMENT CREATE:ROOM
                // 9-   DEPARTMENT CREATE:ACCESS_CONTROL_ITEM
                grantPermission(item.user, item, Permissions.create(PersistableType.ROOM), Permissions.create(PersistableType.ACCESS_CONTROL_ITEM)).save()
                // 10-  ROOM UPDATE
                // 12-  ROOM DELETE
                rooms.grantPermission(item.user, item, Permissions.UPDATE, Permissions.DELETE).save()
            }
            // 6-   DEPARTMENT DELETE
            item.matches(PersistableType.DEPARTMENT, Permissions.DELETE) && item.entityId != null -> departmentRepository.unsaveFindById(item.entityId)?.apply {
            }
            // 7-   DEPARTMENT READ
            item.matches(PersistableType.DEPARTMENT, Permissions.READ) && item.entityId != null -> departmentRepository.unsaveFindById(item.entityId)?.apply {
                // 11-  ROOM READ
                rooms.grantPermission(item.user, item, Permissions.READ).save()
            }
            // 8-   DEPARTMENT CREATE:ROOM
            item.matches(PersistableType.DEPARTMENT, Permissions.create(PersistableType.ROOM)) && item.entityId != null -> departmentRepository.unsaveFindById(item.entityId)?.apply {
            }
            // 9-   DEPARTMENT CREATE:ACCESS_CONTROL_ITEM
            item.matches(PersistableType.DEPARTMENT, Permissions.create(PersistableType.ACCESS_CONTROL_ITEM)) && item.entityId != null -> departmentRepository.unsaveFindById(item.entityId)?.apply {
            }
            // 10-  ROOM UPDATE
            item.matches(PersistableType.ROOM, Permissions.UPDATE) && item.entityId != null -> roomRepository.unsaveFindById(item.entityId)?.apply {
                // 13-  ROOM CREATE:ABO
                // 15-  ROOM CREATE:ACCESS_CONTROL_ITEM
                grantPermission(item.user, item, Permissions.create(PersistableType.ABO), Permissions.create(PersistableType.ACCESS_CONTROL_ITEM)).save()
            }
            // 11-  ROOM READ
            item.matches(PersistableType.ROOM, Permissions.READ) && item.entityId != null -> roomRepository.unsaveFindById(item.entityId)?.apply {
                if (item.user.isNotAnonym()) {
                    // 14-  ROOM CREATE:RESERVATION
                    grantPermission(item.user, item, Permissions.create(PersistableType.RESERVATION))
                }
            }
            // 12-  ROOM DELETE
            item.matches(PersistableType.ROOM, Permissions.DELETE) && item.entityId != null -> roomRepository.unsaveFindById(item.entityId)?.apply {
            }
            // 13-  ROOM CREATE:ABO
            item.matches(PersistableType.ROOM, Permissions.create(PersistableType.ABO)) && item.entityId != null -> roomRepository.unsaveFindById(item.entityId)?.apply {
            }
            // 14-  ROOM CREATE:RESERVATION
            item.matches(PersistableType.ROOM, Permissions.create(PersistableType.RESERVATION)) && item.entityId != null -> roomRepository.unsaveFindById(item.entityId)?.apply {
            }
            // 15-  ROOM CREATE:ACCESS_CONTROL_ITEM
            item.matches(PersistableType.ROOM, Permissions.create(PersistableType.ACCESS_CONTROL_ITEM)) && item.entityId != null -> roomRepository.unsaveFindById(item.entityId)?.apply {
            }
        }
    }

    @HandleAfterCreate(User::class)
    @Transactional
    fun afterCreateUser(user: User) {
        user.addPermission(user, null, Permissions.READ, Permissions.UPDATE).save()
        user.addPermission(null, null, Permissions.READ).save()
    }

    @HandleAfterCreate(Room::class)
    @Transactional
    fun afterCreateRoom(room: Room) {
        aclRepository.unsavedFindByPermissionAndEntityId(room.department.id, Permissions.create(PersistableType.ROOM))
                .addChild(room, Permissions.UPDATE, Permissions.DELETE).save()
        aclRepository.unsavedFindByPermissionAndEntityType(PersistableType.APP, Permissions.READ)
                .addChild(room, Permissions.READ).save()
    }

    @HandleAfterCreate(Department::class)
    fun afterCreateDepartment(department: Department) {
        aclRepository.unsavedFindByPermissionAndEntityType(PersistableType.APP, Permissions.create(PersistableType.DEPARTMENT))
                .addChild(department, Permissions.UPDATE, Permissions.DELETE).save()
        aclRepository.unsavedFindByPermissionAndEntityType(PersistableType.APP, Permissions.READ)
                .addChild(department, Permissions.READ).save()
    }



    private fun User.isNotAnonym() = principal !== anonymousPrinciple

    private fun AccessControlItem.matches(type: PersistableType, vararg permissions: String): Boolean =
            entityType == type && permission in permissions

    private fun List<User>.addPermission(entity: PersistableEntity, parent: AccessControlItem?, vararg permissions: String): List<AccessControlItem> =
            flatMap { it.addPermission(entity, parent, *permissions) }

    private fun User.addPermission(entity: PersistableEntity?, parent: AccessControlItem?, vararg permissions: String): List<AccessControlItem> =
            permissions.map {
                AccessControlItem(entity?.id, entity?.type ?: PersistableType.APP, it, this, true, parent)
            }

    private fun List<PersistableEntity>.grantPermission(user: User, parent: AccessControlItem?, vararg permissions: String): List<AccessControlItem> =
            flatMap { user.addPermission(it, parent, *permissions) }

    private fun PersistableEntity.grantPermission(user: User, parent: AccessControlItem?, vararg permissions: String): List<AccessControlItem> =
            permissions.map { AccessControlItem(id, type, it, user, true, parent) }

    private fun AccessControlItem.addChild(entity: PersistableEntity, vararg permissions: String): List<AccessControlItem> =
            entity.grantPermission(user, this, *permissions)

    private fun List<AccessControlItem>.addChild(entity: PersistableEntity, vararg permissions: String): List<AccessControlItem> =
            flatMap { it.addChild(entity, *permissions) }

    private fun List<AccessControlItem>.save(): List<AccessControlItem> = map { it.save() }

    private fun AccessControlItem.save(): AccessControlItem =
            eventPublisher.publishEvent(BeforeCreateEvent(this))
                    .let { aclRepository.save(this) }
                    .also { eventPublisher.publishEvent(AfterCreateEvent(it)) }

    companion object {
        private const val ANONYMOUS_PRINCIPAL = "anonym"
    }
}