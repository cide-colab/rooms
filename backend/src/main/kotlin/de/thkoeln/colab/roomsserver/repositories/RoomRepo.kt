/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.acl.AclAction
import de.thkoeln.colab.roomsserver.models.Abo
import de.thkoeln.colab.roomsserver.models.Department
import de.thkoeln.colab.roomsserver.models.Room
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostFilter

interface RoomRepo : SecuredRepository<Room, Long> {

    @RestResource(exported = false)
    fun countByAbosContains(abo: Abo)

    @Query("select r from Room r")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<Room>

    @RestResource(exported = false)
    @Query("select r from Room r where r.department = :department")
    fun unsaveFindByDepartment(department: Department): List<Room>

    @RestResource(exported = false)
    @Query("select r from Room r where r.id = :id")
    fun unsaveFindById(id: Long): Room?

    @RestResource(path = "byPermission")
    @Query("select r from Room r")
    @PostFilter("hasPermission(filterObject, #action)")
    fun <T>findAllByPermission(@Param("action") action: AclAction): List<T>
}





