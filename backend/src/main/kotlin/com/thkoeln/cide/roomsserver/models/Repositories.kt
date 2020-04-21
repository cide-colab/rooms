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
    fun uncheckedFindAll(): List<Room>

    @PreAuthorize("hasPermission(#room.department, 'create:room') || hasPermission(room, 'update')")
    fun save(room: Room): Room?

    @PreAuthorize("hasPermission(#room, 'delete')")
    fun delete(room: Room)

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
    fun uncheckedFindAll(): List<Department>

    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findById(id: UUID?): Department?

    @PreAuthorize("hasPermission(null, 'create:department') || hasPermission(department, 'update')")
    fun save(department: Department): Department?

//    fun existsById(id: UUID): Boolean

    //    fun existsByName(name: String): Boolean
    @PreAuthorize("hasPermission(#department, 'delete')")
    fun delete(department: Department)
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
    fun uncheckedFindAll(): List<User>

    //    @PreAuthorize("@authManager.hasUserAnyRoleOfType('ADMIN')")
    fun findById(id: UUID): User?

    //    @PreAuthorize("@authManager.hasUserPrincipal(#principal)")
    fun findByPrincipal(principal: String): User?

    fun save(user: User): User?

    fun existsByPrincipal(principal: String): Boolean

//    @Query("""
//        SELECT room.id AS roomId,
//           SUM(abo.contingent) AS contingent,
//           SUM(TIMESTAMPDIFF(MINUTE, reservation.start, reservation.end)) AS used,
//           SUM(abo.contingent) - SUM(TIMESTAMPDIFF(MINUTE, reservation.start, reservation.end)) AS available
//        FROM abo
//            LEFT JOIN abo_rooms ON abo.id = abo_rooms.abos_id
//            LEFT JOIN room ON abo_rooms.rooms_id = room.id
//            LEFT JOIN reservation on room.id = reservation.room_id AND abo.user_id = reservation.user_id
//        WHERE abo.user_id = ?1
//        AND ?2 BETWEEN abo.start AND abo.end
//        AND (reservation.id IS NULL OR WEEK(?2, 5) BETWEEN WEEK(reservation.start, 5) AND WEEK(reservation.end, 5))
//        GROUP BY room.id
//    """, nativeQuery = true)
// , SUM(TIMESTAMPDIFF(MINUTE, re.start, re.end)), SUM(abo.contingent) - SUM(TIMESTAMPDIFF(MINUTE, re.start, re.end)))
//    @Query("""
//        SELECT new com.thkoeln.cide.roomsserver.controllers.Contingent(r.id, SUM(a.contingent), SUM(FUNCTION('TIMESTAMPDIFF', 'MINUTE', re.start, re.end)), 0L)
//        FROM Abo a
//        LEFT JOIN a.rooms r
//        LEFT JOIN r.reservations re ON re.room.id = r.id AND a.user.id = re.user.id
//        WHERE a.user.id = :id
//        AND :date BETWEEN a.start AND a.end
//        AND (re.id IS NULL OR WEEK(:date, 5) BETWEEN WEEK(re.start, 5) AND WEEK(re.end, 5))
//        GROUP BY r.id
//    """)
//    @RestResource(exported = false)
//    fun getContingent(id: UUID, date: OffsetDateTime): List<Contingent>

//    @Modifying
//    @Query("UPDATE UserDAO SET givenName=:givenName, familyName=:familyName, email=:email WHERE principal=:principal")
//    fun updateByPrincipal(principal: String, givenName: String, familyName: String, email: String)


}
/*
    User / Raum / Date
        Mehr -> weniger logik im FE
            -> weniger payload
            -> häufigere Abfragen

    [AboInfo {
        raum
        (start)
        (end)
        abo_id

        contingent
        used
        available
        reservations
    }]
 */

//@Projection(name = "info", types = [Abo::class])
//interface AboInfoProjection: BaseAbo {
//
//}

@RepositoryRestResource(collectionResourceRel = "abos", path = "abos")
interface AboRepository : Repository<Abo, UUID> {

// https://jira.spring.io/browse/DATAREST-841
//    @RestResource(path = "infos", rel = "infos")
//    @Query("""
//        SELECT a.*
//        FROM abo a
//        WHERE a.user_id = :user
//    """, nativeQuery = true)
//    fun findInfos(@Param("user") user: UUID/*, @Param("room") room: UUID, @Param("date") date: String*/): List<AboInfoProjection>

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


interface RoleRepository : Repository<Role, UUID> {

    fun findAll(): List<Role>

    @Query("select r from Role r")
    @RestResource(exported = false)
    fun uncheckedFindAll(): List<Role>

    fun findById(id: UUID): Role?

    fun findByUserId(id: UUID): List<Role>

    fun save(role: Role): Role?

    fun delete(role: Role)

    fun deleteByDepartmentId(id: UUID)

    fun existsById(id: UUID): Boolean

    fun existsByUserIdAndDepartmentIdAndRoleAndScope(userId: UUID, resource: UUID?, role: RoleName, scope: Scope): Boolean

    fun deleteById(id: UUID)
}


interface ReservationRepository : Repository<Reservation, UUID> {

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

    //    @PostAuthorize("@authManager.hasUserAnyOfRolesForRoom(returnObject.room, 'ADMIN') || @authManager.hasUserId(returnObject.userDTO.id)")
//    fun findById(id: UUID): Reservation?

    //    @PreAuthorize("@authManager.hasUserAnyRoleOfType('ADMIN') || @authManager.hasUserId(#id)")
//    fun findByRoomId(@Param("id") id: UUID): List<Reservation>

//    fun findByRoomIdAndUserId(roomId: UUID, userId: UUID): List<Reservation>

    @PreAuthorize("hasPermission(#reservation.room, 'create:reservation') && hasPermission(#reservation.user, 'create:reservation')")
    fun save(reservation: Reservation): Reservation?

//    @PreAuthorize("@authManager.hasUserAnyOfRolesForRoom(#abo.room, 'ADMIN')")
//    fun delete(@Param("reservation") abo: Reservation)
}


//@RepositoryRestResource(collectionResourceRel = "contingent_allocations", path = "contingent_allocations")
//interface ContingentAllocationRepository : Repository<ContingentAllocation, UUID> {
//
//    @PostFilter("hasPermission(filterObject, 'read')")
//    fun findAll(): List<ContingentAllocation>
//
//    @PostAuthorize("hasPermission(returnObject, 'read')")
//    fun findById(id: UUID): ContingentAllocation?
//
//}
