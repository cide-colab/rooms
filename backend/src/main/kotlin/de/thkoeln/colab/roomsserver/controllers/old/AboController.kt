package de.thkoeln.colab.roomsserver.controllers.old

import de.thkoeln.colab.roomsserver.services.AboService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import java.time.OffsetDateTime

@RepositoryRestController
@RequestMapping("/abos")
class AboController @Autowired constructor(
        private val aboService: AboService
) {

    private val logger = LoggerFactory.getLogger(AboController::class.java)

//    @PreAuthorize("hasPermission(#id, 'read')")
    @GetMapping("/{id}/contingent")
    fun getSlots(@PathVariable id: Long, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) date: OffsetDateTime) =
            ResponseEntity(aboService.getContingentForAboOnDate(id, date), HttpStatus.OK)
}