/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.acl.AclAction
import de.thkoeln.colab.roomsserver.models.Department
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostFilter
import javax.websocket.server.PathParam

interface DepartmentRepo : SecuredRepository<Department, Long>{

    @Query("select d from Department d")
    @RestResource(exported = false)
    fun unsafeFindAll(): List<Department>

    @RestResource(exported = false)
    @Query("select d from Department d where d.id = :id")
    fun unsafeFindById(id: Long): Department?

    @RestResource(path = "byPermission")
    @Query("select d from Department d")
    @PostFilter("hasPermission(filterObject, #action)")
    fun <T>findAllByPermission(@Param("action") action: AclAction): List<T>

}