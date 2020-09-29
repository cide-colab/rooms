package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Department
import org.springframework.data.jpa.repository.Query
import org.springframework.data.rest.core.annotation.RestResource

interface DepartmentRepo : SecuredPagingAndSortingRepository<Department, Long> {

    @Query("select d from Department d")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<Department>

    @RestResource(exported = false)
    @Query("select d from Department d where d.id = :id")
    fun unsaveFindById(id: Long): Department?

}