package de.thkoeln.colab.roomsserver.controllers

import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import java.time.OffsetDateTime

@RepositoryRestController
@RequestMapping("/test")
class TestController {

    @GetMapping("/time-conversion")
    fun convertTime(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) date: OffsetDateTime): ResponseEntity<OffsetDateTime> {
        return ResponseEntity(date, HttpStatus.OK)
    }
}