package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Reservation
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import java.time.OffsetDateTime

interface ReservationRepo : Repository<Reservation, Long> {

    @PostFilter("hasPermission(filterObject, 'read')")
    fun findAll(): List<Reservation>

    @Query("""
        select r from Reservation r
        where r.start BETWEEN :start AND :end
        AND r.room.id = :room_id
        ORDER BY r.start
    """)
    fun findForDate(room_id: Long, start: OffsetDateTime, end: OffsetDateTime): List<Reservation>

    @Query("select r from Reservation r")
    @RestResource(exported = false)
    fun uncheckedFindAll(): List<Reservation>

    @RestResource(exported = false)
    fun findById(id: Long): Reservation?

    @PreAuthorize("hasPermission(#reservation.room, 'create:reservation') && hasPermission(#reservation.user, 'create:reservation')")
    fun save(reservation: Reservation): Reservation?
}
