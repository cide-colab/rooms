package com.thkoeln.cide.roomsserver.controllers

import com.thkoeln.cide.roomsserver.extensions.*
import com.thkoeln.cide.roomsserver.models.Abo
import com.thkoeln.cide.roomsserver.models.Room
import com.thkoeln.cide.roomsserver.models.User
import com.thkoeln.cide.roomsserver.models.UserRepository
import com.thkoeln.cide.roomsserver.services.ACLEntry
import com.thkoeln.cide.roomsserver.services.ACLService
import org.keycloak.KeycloakPrincipal
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import java.time.OffsetDateTime
import java.util.*
import javax.transaction.Transactional


data class Session(
        val userId: UUID?,
        val acl: List<ACLEntry>
)

data class Contingent(
        val rooms: List<Room>,
        val abo: Abo,
        val used: Long,
        val left: Long
)

//@JsonPropertyOrder("content", "links")
//class FixedCollectionModel<T>(
//        @JsonProperty("_embedded")
//        @JsonInclude(JsonInclude.Include.ALWAYS)
//        @JsonSerialize(using = HalResourcesSerializer::class)
//        @JsonDeserialize(using = HalResourcesDeserializer::class)
//        var content: Collection<T>
//) : CollectionModel<T>()


// https://stackoverflow.com/questions/25980759/spring-data-rest-custom-query-integration
@RepositoryRestController
@RequestMapping("/users")
class UserController @Autowired constructor(
        private val userRepository: UserRepository,
        private val aclService: ACLService
) {

    private val logger = LoggerFactory.getLogger(UserController::class.java)

    @GetMapping("/session")
    fun get(authentication: Authentication?): ResponseEntity<Session> {
        val user = (authentication?.principal as? KeycloakPrincipal<*>)?.keycloakSecurityContext?.token?.let { token ->
            if (userRepository.existsByPrincipal(token.preferredUsername)) {
                userRepository.findByPrincipal(token.preferredUsername)
            } else {
                userRepository.save(User(token.preferredUsername, token.givenName ?: "", token.familyName
                        ?: "", token.email ?: ""))
            }
        }
        return ResponseEntity(Session(user?.id, aclService.getACL(user)), HttpStatus.OK)
    }

    // TODO CHECK FUNCTIONALITY
    @Transactional
    @GetMapping("/{id}/contingents")
    fun getInfo(
            @PathVariable id: UUID,
            @RequestParam("date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) date: OffsetDateTime?,
            @RequestParam("room", required = false) roomId: UUID?
    ): ResponseEntity<CollectionModel<out Any>> = userRepository.findById(id)
            ?.abos
            ?.filter { abo ->
                date?.let { abo.start.isBefore(date.endOfDay) && (abo.unlimited_end || abo.end.isAfter(date.startOfDay)) }
                        ?: true
            }
            ?.filter { abo -> roomId?.let { abo.rooms.contains { room -> room.id == it } } ?: true }
            ?.map { abo ->
                date?.let { d ->
                    abo.contingent_allocations
                            .filter { it.reservation.isInWeekOf(d) }
                            .sumBy { it.minutes }
                            .let { Contingent(abo.rooms, abo, it, abo.contingent - it) }
                } ?: Contingent(abo.rooms, abo, 0, 0)
            }
            ?.let {
                CollectionModel(it).apply {
                    add(linkTo(methodOn(UserController::class.java).getInfo(id, date, roomId)).withSelfRel())
                }.fixEmbedded(Contingent::class.java)
            }
            ?.let { ResponseEntity(it, HttpStatus.OK) }
            ?: ResponseEntity(HttpStatus.NOT_FOUND)


//    @PreAuthorize("hasPermission(#id, 'read')")
//    @GetMapping("/{id}/contingent")
//    fun getForRoomAndUser(@PathVariable id: String, @RequestParam(required = false) date: Instant?): HttpEntity<List<Contingent>> {
//
//        val requestedDate = date ?: Instant.now()
//
//        val user = userRepository.findById(id)
//
//
//        val usedContingent = user
//                ?.reservations
//                ?.filter { requestedDate.weekNumber >= it.start.weekNumber && requestedDate.weekNumber <= it.end.weekNumber }
//                ?.groupBy { it.room }
//                ?.mapValues { it.value.sumBy { reservation -> ChronoUnit.MINUTES.between(reservation.start, reservation.end) } }
//
//        val contingent = user
//                ?.abos
//                ?.filter { it.start.isBefore(requestedDate) && it.end.isAfter(requestedDate) }
//                ?.flatMap { abo -> abo.rooms.map { room -> Pair(abo, room) } }
//                ?.groupBy { aboRoom -> aboRoom.second }
//                ?.mapValues { it.value.sumBy { aboRoom -> aboRoom.first.contingent } }
//
//        return contingent
//                ?.map {
//                    Contingent(it.key.id, it.value, usedContingent?.get(it.key)
//                            ?: 0, it.value - (usedContingent?.get(it.key) ?: 0))
//                }
//                ?.let { ResponseEntity(it, HttpStatus.OK) }
//                ?: ResponseEntity<List<Contingent>>(HttpStatus.NOT_FOUND)
//    }


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