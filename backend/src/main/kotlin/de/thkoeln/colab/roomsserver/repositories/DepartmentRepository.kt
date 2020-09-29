package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Department
import org.springframework.data.domain.Example
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize

interface DepartmentRepository : Repository<Department, Long> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<Department>

    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findById(id: Long): Department?

    @Query("select d from Department d")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<Department>

//    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findOne(example: Example<Department>): Department?

    //    @PreAuthorize("hasPermission(null, 'create:department') || hasPermission(department, 'update')")
    fun save(department: Department): Department?

//    fun existsById(id: UUID): Boolean

    //    fun existsByName(name: String): Boolean
    @PreAuthorize("hasPermission(#department, 'delete')")
    fun delete(department: Department)

    @RestResource(exported = false)
    @Query("select d from Department d where d.id = :id")
    fun unsaveFindById(id: Long): Department?
//
//    @Modifying
//    @Query("UPDATE DepartmentDAO SET name=:name, description=:description WHERE id=:id")
//    fun update(id: UUID, name: String, description: String)

}