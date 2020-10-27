/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.controllers

import de.thkoeln.colab.roomsserver.extensions.isInWeekOf
import de.thkoeln.colab.roomsserver.extensions.sumBy
import de.thkoeln.colab.roomsserver.repositories.AboRepo
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.hateoas.RepresentationModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import java.time.OffsetDateTime
import java.time.temporal.ChronoUnit


data class Contingent(
        val used: Long,
        val left: Long
)

@RepositoryRestController
@RequestMapping("/abos")
class AboController @Autowired constructor(
        private val aboRepo: AboRepo
) {

    private val logger = LoggerFactory.getLogger(AboController::class.java)

    @GetMapping("/{id}/contingent")
    fun getContingent(@PathVariable id: Long, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) date: OffsetDateTime) =
            (aboRepo.unsecuredFindById(id)
                    ?.let { abo ->
                        abo.reservations
                                .filter { it.isInWeekOf(date) }
                                .sumBy { ChronoUnit.MINUTES.between(it.start, it.end) }
                                .let { used -> Contingent(used = used, left = abo.contingent - used) }
                    }
                    ?: Contingent(0, 0))
                    .let { ResponseEntity(RepresentationModel.of(it), HttpStatus.OK) }

}