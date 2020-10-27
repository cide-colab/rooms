/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.controllers

import de.thkoeln.colab.roomsserver.acl.*
import de.thkoeln.colab.roomsserver.extensions.fixEmbedded
import de.thkoeln.colab.roomsserver.models.User
import de.thkoeln.colab.roomsserver.repositories.UserRepo
//import com.thkoeln.cide.roomsserver.services.ACLEntry
//import com.thkoeln.cide.roomsserver.services.ACLService
import org.keycloak.KeycloakPrincipal
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationEventPublisher
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.event.AfterCreateEvent
import org.springframework.data.rest.core.event.BeforeCreateEvent
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping


data class Session(
        val userId: Long?
//        val acl: List<ACLEntry>
)


// https://stackoverflow.com/questions/25980759/spring-data-rest-custom-query-integration
@RepositoryRestController
@RequestMapping("/users")
class UserController @Autowired constructor(
        private val userRepository: UserRepo,
//        private val aclService: ACLService,
        private val eventPublisher: ApplicationEventPublisher,
        private val aclService: AclService
) {

    private val logger = LoggerFactory.getLogger(UserController::class.java)

    @GetMapping("search/byTargetPermission")
    fun getByPermission(
            @Param("target") target: String,
            @Param("action") action: AclAction,
            authentication: Authentication?,
            assembler: PersistentEntityResourceAssembler
    ) = userRepository.findAll()
            .filter {
                aclService.hasPermission(
                        PermissionCheckForm(target, ContextForm("user", it.id), action),
                        authentication?.principal?.toString() ?: ANONYMOUS_PRINCIPAL
                )
            }
            .let { assembler.toCollectionModel(it) }
            .let { ResponseEntity.ok(it) }


    @GetMapping("/session")
    fun get(authentication: Authentication?): ResponseEntity<Session> {
        val user = (authentication?.principal as? KeycloakPrincipal<*>)?.keycloakSecurityContext?.token?.let { token ->
            if (userRepository.existsByPrincipal(token.preferredUsername)) {
                userRepository.findByPrincipal(token.preferredUsername)
            } else {
                User(token.preferredUsername, token.givenName ?: "", token.familyName ?: "", token.email ?: "")
                        .also { eventPublisher.publishEvent(BeforeCreateEvent(it)) }
                        .let { userRepository.save(it) }
                        .also { eventPublisher.publishEvent(AfterCreateEvent(it)) }
            }
        }

//        return ResponseEntity(Session(user?.id, aclService.getACL(user)), HttpStatus.OK)
        return ResponseEntity(Session(user?.id), HttpStatus.OK)
    }

//    // TODO CHECK FUNCTIONALITY
//    @Transactional
//    @GetMapping("/{id}/contingents")
//    fun getInfo(
//            @PathVariable id: UUID,
//            @RequestParam("date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) date: OffsetDateTime?,
//            @RequestParam("room", required = false) roomId: UUID?
//    ): ResponseEntity<CollectionModel<out Any>> = userRepository.findById(id)
//            ?.abos
//            ?.filter { abo ->
//                date?.let { abo.start.isBefore(date.endOfDay) && (abo.unlimited_end || abo.end.isAfter(date.startOfDay)) }
//                        ?: true
//            }
//            ?.filter { abo -> roomId?.let { abo.rooms.contains { room -> room.id == it } } ?: true }
//            ?.map { abo ->
//                date?.let { d ->
//                    abo.contingent_allocations
//                            .filter { it.reservation.isInWeekOf(d) }
//                            .sumBy { it.minutes }
//                            .let { Contingent(abo.rooms, abo, it, abo.contingent - it) }
//                } ?: Contingent(abo.rooms, abo, 0, 0)
//            }
//            ?.let {
//                CollectionModel(it).apply {
//                    add(linkTo(methodOn(UserController::class.java).getInfo(id, date, roomId)).withSelfRel())
//                }.fixEmbedded(Contingent::class.java)
//            }
//            ?.let { ResponseEntity(it, HttpStatus.OK) }
//            ?: ResponseEntity(HttpStatus.NOT_FOUND)
//
//
////    @PreAuthorize("hasPermission(#id, 'read')")
////    @GetMapping("/{id}/contingent")
////    fun getForRoomAndUser(@PathVariable id: String, @RequestParam(required = false) date: Instant?): HttpEntity<List<Contingent>> {
////
////        val requestedDate = date ?: Instant.now()
////
////        val user = userRepository.findById(id)
////
////
////        val usedContingent = user
////                ?.reservations
////                ?.filter { requestedDate.weekNumber >= it.start.weekNumber && requestedDate.weekNumber <= it.end.weekNumber }
////                ?.groupBy { it.room }
////                ?.mapValues { it.value.sumBy { reservation -> ChronoUnit.MINUTES.between(reservation.start, reservation.end) } }
////
////        val contingent = user
////                ?.abos
////                ?.filter { it.start.isBefore(requestedDate) && it.end.isAfter(requestedDate) }
////                ?.flatMap { abo -> abo.rooms.map { room -> Pair(abo, room) } }
////                ?.groupBy { aboRoom -> aboRoom.second }
////                ?.mapValues { it.value.sumBy { aboRoom -> aboRoom.first.contingent } }
////
////        return contingent
////                ?.map {
////                    Contingent(it.key.id, it.value, usedContingent?.get(it.key)
////                            ?: 0, it.value - (usedContingent?.get(it.key) ?: 0))
////                }
////                ?.let { ResponseEntity(it, HttpStatus.OK) }
////                ?: ResponseEntity<List<Contingent>>(HttpStatus.NOT_FOUND)
////    }
//
//
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
