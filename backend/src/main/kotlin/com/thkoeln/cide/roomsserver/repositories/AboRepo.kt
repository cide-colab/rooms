package com.thkoeln.cide.roomsserver.repositories

import com.thkoeln.cide.roomsserver.models.Abo
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import java.util.*

@RepositoryRestResource(collectionResourceRel = "abos", path = "abos")
interface AboRepository : Repository<Abo, UUID> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<Abo>

    @Query("select a from Abo a")
    @RestResource(exported = false)
    fun uncheckedFindAll(): List<Abo>

    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findById(id: UUID): Abo?

    fun findByUserId(@Param("id") id: UUID): List<Abo>

    @PreAuthorize("hasPermission(#abo.rooms, 'create:abo') || hasPermission(#abo, 'update')")
    fun save(abo: Abo): Abo?

    @PreAuthorize("hasPermission(#abo, 'delete')")
    fun delete(@Param("abo") abo: Abo)


    fun existsById(id: UUID): Boolean


    fun deleteById(id: UUID)
}
