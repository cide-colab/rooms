/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Department
import de.thkoeln.colab.roomsserver.models.Room
import org.springframework.data.jpa.repository.Query
import org.springframework.data.rest.core.annotation.RestResource

interface RoomRepo : SecuredRepository<Room, Long> {

    @Query("select r from Room r")
    @RestResource(exported = false)
    fun unsaveFindAll(): List<Room>

    @RestResource(exported = false)
    @Query("select r from Room r where r.department = :department")
    fun unsaveFindByDepartment(department: Department): List<Room>

    @RestResource(exported = false)
    @Query("select r from Room r where r.id = :id")
    fun unsaveFindById(id: Long): Room?
}





