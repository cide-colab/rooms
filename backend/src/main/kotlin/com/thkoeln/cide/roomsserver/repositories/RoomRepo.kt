package com.thkoeln.cide.roomsserver.models

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import java.time.OffsetDateTime
import java.util.*

interface RoomRepository : Repository<Room, UUID> {

    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findById(id: UUID): Room?

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<Room>

    @Query("select r from Room r")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<Room>

//    @PreAuthorize("hasPermission(#room.department, 'create:room') || hasPermission(room, 'update')")
    fun save(room: Room): Room?

    @PreAuthorize("hasPermission(#room, 'delete')")
    fun delete(room: Room)

    @RestResource(exported = false)
    @Query("select r from Room r where r.department = :department")
    fun unsaveFindByDepartment(department: Department): List<Room>

    @RestResource(exported = false)
    @Query("select r from Room r where r.id = :id")
    fun unsaveFindById(id: UUID): Room?

//    fun existsById(id: String): Boolean

//    @Modifying
//    @Query("UPDATE RoomDAO SET name=:name, number=:number, description=:description, department=:department WHERE id=:id")
//    fun update(id: String, name: String, number: String, description: String, department: DepartmentDAO)
}

interface DepartmentRepository : Repository<Department, UUID> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<Department>

    @Query("select d from Department d")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<Department>

    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findById(id: UUID): Department?

//    @PreAuthorize("hasPermission(null, 'create:department') || hasPermission(department, 'update')")
    fun save(department: Department): Department?

//    fun existsById(id: UUID): Boolean

    //    fun existsByName(name: String): Boolean
    @PreAuthorize("hasPermission(#department, 'delete')")
    fun delete(department: Department)

    @RestResource(exported = false)
    @Query("select d from Department d where d.id = :id")
    fun unsaveFindById(id: UUID): Department?
//
//    @Modifying
//    @Query("UPDATE DepartmentDAO SET name=:name, description=:description WHERE id=:id")
//    fun update(id: UUID, name: String, description: String)

}

interface UserRepository : Repository<User, UUID> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<User>

    @Query("select u from User u")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<User>

    //    @PreAuthorize("@authManager.hasUserAnyRoleOfType('ADMIN')")
    fun findById(id: UUID): User?

    //    @PreAuthorize("@authManager.hasUserPrincipal(#principal)")
    fun findByPrincipal(principal: String): User?

    fun save(user: User): User?

    fun existsByPrincipal(principal: String): Boolean
}


