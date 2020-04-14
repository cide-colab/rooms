package com.thkoeln.cide.roomsserver.controllers

import com.thkoeln.cide.roomsserver.services.AboService
import com.thkoeln.cide.roomsserver.services.Contingent
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import java.time.OffsetDateTime
import java.util.*

@RepositoryRestController
@RequestMapping("/abos")
class AboController @Autowired constructor(
        private val aboService: AboService
) {

    private val logger = LoggerFactory.getLogger(AboController::class.java)

//    @PreAuthorize("hasPermission(#id, 'read')")
    @GetMapping("/{id}/contingent")
    fun getSlots(@PathVariable id: UUID, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) date: OffsetDateTime) =
            ResponseEntity(aboService.getContingentForAboOnDate(id, date), HttpStatus.OK)
}