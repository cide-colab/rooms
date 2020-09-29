package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Abo
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize

@RepositoryRestResource(collectionResourceRel = "abos", path = "abos")
interface AboRepo : Repository<Abo, Long> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<Abo>

    @Query("select a from Abo a")
    @RestResource(exported = false)
    fun uncheckedFindAll(): List<Abo>

    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findById(id: Long): Abo?

    fun findByUserId(@Param("id") id: Long): List<Abo>

    @PreAuthorize("hasPermission(#abo.rooms, 'create:abo') || hasPermission(#abo, 'update')")
    fun save(abo: Abo): Abo?

    @PreAuthorize("hasPermission(#abo, 'delete')")
    fun delete(@Param("abo") abo: Abo)


    fun existsById(id: Long): Boolean


    fun deleteById(id: Long)
}
