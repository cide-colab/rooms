package com.thkoeln.cide.roomsserver.repositories

import com.thkoeln.cide.roomsserver.models.Reservation
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import java.time.OffsetDateTime
import java.util.*

interface ReservationRepo : Repository<Reservation, UUID> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<Reservation>

    @Query("""
        select r from Reservation r
        where r.start BETWEEN :start AND :end
        AND r.room.id = :room_id
        ORDER BY r.start
    """)
    fun findForDate(room_id: UUID, start: OffsetDateTime, end: OffsetDateTime): List<Reservation>

    @Query("select r from Reservation r")
    @RestResource(exported = false)
    fun uncheckedFindAll(): List<Reservation>

    @RestResource(exported = false)
    fun findById(id: UUID): Reservation?

    @PreAuthorize("hasPermission(#reservation.room, 'create:reservation') && hasPermission(#reservation.user, 'create:reservation')")
    fun save(reservation: Reservation): Reservation?
}
