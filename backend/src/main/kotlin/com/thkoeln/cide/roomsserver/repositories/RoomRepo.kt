package com.thkoeln.cide.roomsserver.repositories

import com.thkoeln.cide.roomsserver.models.Department
import com.thkoeln.cide.roomsserver.models.Room
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import java.util.*

interface RoomRepo : Repository<Room, UUID> {

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





