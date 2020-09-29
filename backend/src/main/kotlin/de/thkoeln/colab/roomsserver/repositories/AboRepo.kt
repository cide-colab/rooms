/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Abo
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostFilter

@RepositoryRestResource(collectionResourceRel = "abos", path = "abos")
interface AboRepo : SecuredRepository<Abo, Long> {

    @Query("select a from Abo a")
    @RestResource(exported = false)
    fun uncheckedFindAll(): List<Abo>

    @PostFilter("hasPermission(filterObject, 'READ')")
    fun findByUserId(@Param("id") id: Long): List<Abo>
}
