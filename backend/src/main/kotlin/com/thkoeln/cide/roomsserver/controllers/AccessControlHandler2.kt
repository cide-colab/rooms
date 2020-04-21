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
    const val update = "UPDATE"
    const val read = "READ"
    const val delete = "DELETE"
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

    @HandleAfterCreate(User::class)
    @Transactional
    fun afterCreateUser(user: User) {
        user.addPermission(user, null, Permissions.read, Permissions.update).save()
        user.addPermission(null, null, Permissions.read).save()
    }

    @HandleAfterCreate(Room::class)
    @Transactional
    fun afterCreateRoom(room: Room) {
        aclRepository.unsavedFindByPermissionAndEntityId(room.department.id, Permissions.create(PersistableType.ROOM))
                .addChild(room, Permissions.update, Permissions.delete).save()
        aclRepository.unsavedFindByPermissionAndEntityType(PersistableType.APP, Permissions.read)
                .addChild(room, Permissions.read).save()
    }

    @HandleAfterCreate(Department::class)
    fun afterCreateDepartment(department: Department) {
        aclRepository.unsavedFindByPermissionAndEntityType(PersistableType.APP, Permissions.create(PersistableType.DEPARTMENT))
                .addChild(department, Permissions.update, Permissions.delete).save()
        aclRepository.unsavedFindByPermissionAndEntityType(PersistableType.APP, Permissions.read)
                .addChild(department, Permissions.read).save()
    }

    @HandleAfterCreate(AccessControlItem::class)
    fun afterCreateAccessControlItem(item: AccessControlItem) {
        when {
            item.matches(PersistableType.APP, Permissions.read) && item.user.isNotAnonym() -> {
                roomRepository.unsaveFindAll().grantPermission(item.user, item, Permissions.create(PersistableType.RESERVATION)).save()
            }
            item.matches(PersistableType.DEPARTMENT, Permissions.read) -> {
                departmentRepository.findById(item.entityId)?.rooms?.grantPermission(item.user, item, Permissions.read)?.save()
            }
            item.matches(PersistableType.USER, Permissions.read) -> {
            }
            item.matches(PersistableType.USER, Permissions.update) -> {
            }
            item.matches(PersistableType.ROOM, Permissions.read) -> {
            }
            item.matches(PersistableType.ROOM, Permissions.update) -> {
            }
            item.matches(PersistableType.ROOM, Permissions.delete) -> {
            }
        }
    }

    private fun User.isNotAnonym() = principal !== anonymousPrinciple

    private fun AccessControlItem.matches(type: PersistableType, vararg permissions: String): Boolean =
            entityType == type && permission in permissions

    private fun List<User>.addPermission(entity: PersistableEntity, parent: AccessControlItem?, vararg permissions: String): List<AccessControlItem> =
            flatMap { it.addPermission(entity, parent, *permissions) }

    private fun User.addPermission(entity: PersistableEntity?, parent: AccessControlItem?, vararg permissions: String): List<AccessControlItem> =
            permissions.map { AccessControlItem(entity?.id, entity?.type?: PersistableType.APP, it, this, true, parent) }

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