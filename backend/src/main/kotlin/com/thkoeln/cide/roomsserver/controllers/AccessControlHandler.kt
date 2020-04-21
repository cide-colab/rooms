//package com.thkoeln.cide.roomsserver.controllers
//
//import com.thkoeln.cide.roomsserver.models.*
//import org.slf4j.LoggerFactory
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.context.ApplicationEventPublisher
//import org.springframework.context.ApplicationListener
//import org.springframework.context.event.ContextRefreshedEvent
//import org.springframework.data.rest.core.annotation.HandleAfterCreate
//import org.springframework.data.rest.core.annotation.RepositoryEventHandler
//import org.springframework.data.rest.core.event.AfterCreateEvent
//import org.springframework.data.rest.core.event.BeforeCreateEvent
//import org.springframework.stereotype.Component
//import javax.transaction.Transactional
//
//
//@Component
//class ApplicationStartupListener @Autowired constructor(
//        private val userRepository: UserRepository,
//        private val eventPublisher: ApplicationEventPublisher
//) : ApplicationListener<ContextRefreshedEvent> {
//
//    private val logger = LoggerFactory.getLogger(ApplicationStartupListener::class.java)
//
//    private var anonymousPrinciple: String = ANONYMOUS_PRINCIPAL
//
//    override fun onApplicationEvent(event: ContextRefreshedEvent) {
//        logger.info("Preparing Application")
//        createAnonymousUser()
//    }
//
//    private fun createAnonymousUser() {
//        if (!userRepository.existsByPrincipal(anonymousPrinciple)) {
//            User(anonymousPrinciple, "Unknown", "Unknown", "")
//                    .also { eventPublisher.publishEvent(BeforeCreateEvent(it)) }
//                    .let { userRepository.save(it) }
//                    .also { eventPublisher.publishEvent(AfterCreateEvent(it)) }
//        }
//    }
//}
//
//
//object Permissions {
//    const val update = "update"
//    const val read = "read"
//    const val delete = "delete"
//    fun create(type: String) = "create:${type}"
//}
//
//const val ANONYMOUS_PRINCIPAL = "anonym"
//const val APPLICATION_TYPE = "app"
//
//
////@Component
////@RepositoryEventHandler(PersistableEntity::class)
//class AccessControlHandler /*@Autowired constructor*/(
//        private val aclRepository: ACLRepository,
//        private val roomRepository: RoomRepository,
//        private val departmentRepository: DepartmentRepository,
//        private val userRepository: UserRepository
//) {
//
//    private var logger = LoggerFactory.getLogger(AccessControlHandler::class.java)
//
//    private var anonymousPrinciple: String = ANONYMOUS_PRINCIPAL
//
//    private fun User.isNotAnonym() = principal !== anonymousPrinciple
//
//
////    @HandleAfterCreate
////    @Transactional
//    fun handleReservationBeforeCreate(entity: PersistableEntity) {
//        when (entity) {
//            is User -> onUserCreated(entity)
//            is Department -> onDepartmentCreated(entity)
//            is Room -> onRoomCreated(entity)
//            is Abo -> onAboCreated(entity)
//        }
//    }
//
//    private fun onAboCreated(entity: Abo) {
//        aclRepository.unsavedFindByPermissionAndEntityId(entity.rooms.map { it.id }, Permissions.create(Abo.TYPE))
//                .flatMap { entity.grant(it.user, Permissions.update, Permissions.delete, Permissions.read) }
//                .save()
//
//        entity.grant(entity.user, Permissions.read).save()
//
//    }
//
//    private fun onRoomCreated(entity: Room) {
//        aclRepository.unsavedFindByPermissionAndEntityId(entity.department.id, Permissions.create(Room.TYPE))
////                .filter { it.entityType == Department.TYPE && it.permission == Permissions.create(Department.TYPE) }
//                .flatMap { entity.grant(it.user, Permissions.update, Permissions.delete) }
//                .save()
//        userRepository.unsaveFindAll()
//                .flatMap { entity.grant(it, Permissions.read) }
//                .save()
//    }
//
//    private fun onDepartmentCreated(entity: Department) {
//        aclRepository.unsavedFindByPermissionAndEntityType(APPLICATION_TYPE, Permissions.create(Department.TYPE))
////                .filter { it.entityType == APPLICATION_TYPE && it.permission == Permissions.create(Department.TYPE) }
//                .flatMap { entity.grant(it.user, Permissions.update, Permissions.delete) }
//                .save()
//        userRepository.unsaveFindAll()
//                .flatMap { entity.grant(it, Permissions.read) }
//                .save()
//    }
//
//    private fun onUserCreated(entity: User) {
//
//        entity.grant(entity, Permissions.read, Permissions.update)
//                .and(grantForApp(entity, Permissions.read))
//                .andIf(entity.isNotAnonym()) {
//                    roomRepository.findAll().flatMap { it.grant(entity, Permissions.create(Reservation.TYPE)) }
//                }
//                .save()
//
//    }
//
//    private fun User.grant(user: User, vararg permissions: String): List<AccessControlItem> = permissions.map { permission ->
//        when (permission) {
//            Permissions.read -> AccessControlItem(id, User.TYPE, Permissions.read, user, true)
//            Permissions.update -> AccessControlItem(id, User.TYPE, Permissions.update, user, true)
//            else -> AccessControlItem(id, User.TYPE, permission, user, true)
//        }
//    }
//
//    private fun grantForApp(user: User, vararg permissions: String): List<AccessControlItem> = permissions.map { permission ->
//        when (permission) {
//            Permissions.read -> AccessControlItem(null, APPLICATION_TYPE, Permissions.read, user, true,
//                    children = departmentRepository.unsaveFindAll().flatMap { it.grant(user, Permissions.read) }
//            )
//            Permissions.update -> AccessControlItem(null, APPLICATION_TYPE, Permissions.update, user, true,
//                    children = departmentRepository.unsaveFindAll().flatMap { it.grant(user, Permissions.update, Permissions.delete) }
//                            .and(grantForApp(user, Permissions.create(Department.TYPE)))
//                            .and(grantForApp(user, Permissions.create(AccessControlItem.TYPE)))
//            )
//            else -> AccessControlItem(null, APPLICATION_TYPE, permission, user, true)
//        }
//
//    }
//
//    private fun Room.grant(user: User, vararg permissions: String): List<AccessControlItem> = permissions.map { permission ->
//        when (permission) {
//            Permissions.read -> AccessControlItem(id, Room.TYPE, permission, user, true)
//            Permissions.update -> AccessControlItem(id, Room.TYPE, permission, user, true,
//                    children = grant(user, Permissions.create(AccessControlItem.TYPE))
//                            .and(grant(user, Permissions.create(Abo.TYPE)))
//            )
//            else -> AccessControlItem(id, Room.TYPE, permission, user, true)
//        }
//    }
//
//    private fun Department.grant(user: User, vararg permissions: String): List<AccessControlItem> = permissions.map { permission ->
//        when (permission) {
//            Permissions.read -> AccessControlItem(id, Department.TYPE, permission, user, true,
//                    children = roomRepository.unsaveFindByDepartment(this).flatMap { it.grant(user, Permissions.read) }
//            )
//            Permissions.update -> AccessControlItem(id, Department.TYPE, permission, user, true,
//                    children = roomRepository.unsaveFindByDepartment(this).flatMap { it.grant(user, Permissions.update, Permissions.delete) }
//                            .and(grant(user, Permissions.create(Room.TYPE)))
//                            .and(grant(user, Permissions.create(AccessControlItem.TYPE)))
//            )
//            else -> AccessControlItem(id, Department.TYPE, permission, user, true)
//        }
//    }
//
//    private fun Abo.grant(user: User, vararg permissions: String): List<AccessControlItem> = permissions.map { permission ->
//        when (permission) {
//            else -> AccessControlItem(id, Abo.TYPE, permission, user, true)
//        }
//    }
//
//    //    private fun List<AccessControlItem>.and(vararg items: AccessControlItem): List<AccessControlItem> = this + items.toList()
//    private fun List<AccessControlItem>.and(items: List<AccessControlItem>): List<AccessControlItem> = this + items.toList()
//    private fun List<AccessControlItem>.andIf(condition: Boolean, items: () -> List<AccessControlItem>): List<AccessControlItem> =
//            if (condition) this.and(items()) else this
//
//    //    private fun AccessControlItem.and(vararg items: AccessControlItem): List<AccessControlItem> = listOf(this).and(*items)
//    private fun AccessControlItem.and(items: List<AccessControlItem>): List<AccessControlItem> = listOf(this).and(items)
//    private fun AccessControlItem.andIf(condition: Boolean, items: List<AccessControlItem>): List<AccessControlItem> =
//            if (condition) this.and(items) else listOf()
//
//    private fun List<AccessControlItem>.fixChildren(): List<AccessControlItem> = this.also {
//        forEach { parent ->
////            parent.children.forEach { it.parent = parent }
//            parent.children.fixChildren()
//        }
//    }
//
//    private fun List<AccessControlItem>.save() = aclRepository.saveAll(this.fixChildren())
//}