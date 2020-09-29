package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Department
import de.thkoeln.colab.roomsserver.models.Room
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource

//@NoRepositoryBean
//interface BaseRepository<T, ID>: CrudRepository<T, ID> {
//
//}
@RepositoryRestResource
interface RoomRepository : Repository<Room, Long> {

    //    @PostAuthorize("hasPermission(returnObject, 'read')")
    fun findById(id: Long): Room?

    //    @PostFilter("hasPermission(filterObject, 'READ')")
    fun findAll(): List<Room>

    //    @PreAuthorize("hasPermission(#room, 'delete')")
    fun delete(room: Room)

//    fun findOne(example: Example<Room>): Room?

    @Query("select r from Room r")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<Room>

    //    @PreAuthorize("hasPermission(#room.department, 'create:room') || hasPermission(#room, 'create')")
    fun save(room: Room): Room?

    @RestResource(exported = false)
    @Query("select r from Room r where r.department = :department")
    fun unsaveFindByDepartment(department: Department): List<Room>

    @RestResource(exported = false)
    @Query("select r from Room r where r.id = :id")
    fun unsaveFindById(id: Long): Room?

//    fun existsById(id: String): Boolean

//    @Modifying
//    @Query("UPDATE RoomDAO SET name=:name, number=:number, description=:description, department=:department WHERE id=:id")
//    fun update(id: String, name: String, number: String, description: String, department: DepartmentDAO)
}





