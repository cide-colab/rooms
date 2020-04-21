package com.thkoeln.cide.roomsserver.controllers

import com.thkoeln.cide.roomsserver.models.Reservation
import org.slf4j.LoggerFactory
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.HandleBeforeSave
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.stereotype.Component
import javax.transaction.Transactional

@Component
@RepositoryEventHandler(Reservation::class)
class ReservationEventHandler {

    private var logger = LoggerFactory.getLogger(ReservationEventHandler::class.java)

    @HandleBeforeCreate
    @HandleBeforeSave
    @Transactional
    fun handleReservationBeforeCreate(reservation: Reservation) {

//        reservation.contingent_allocations = reservation.contingent_allocations.map { allocation ->
//            allocation.reservation
//                    ?.let { allocation }
//                    ?: ContingentAllocation(abo = allocation.abo, reservation = reservation, minutes = allocation.minutes)
//        }
//
//        when {
//            isAllocationTimeNotValid(reservation) -> throw ContingentNotMatchException()
//        }
//
//        reservation.contingent_allocations.forEach { allocation ->
//            when {
//                allocation.abo.user != reservation.user -> throw UserNotOwnerOfAboException()
//                allocation.abo.start.isAfter(reservation.start) || (!allocation.abo.unlimited_end && allocation.abo.end.isBefore(reservation.end)) -> throw AboOutOfBoundsException()
//                !allocation.abo.rooms.contains { it == reservation.room } -> throw AboNotForRoomException()
//                !allocation.hasEnoughContingent() -> throw NotEnoughContingentException()
//            }
//        }

    }

//    private fun ContingentAllocation.hasEnoughContingent() = abo.unlimited_contingent || abo.contingent_allocations
//            .filter { it.reservation?.let { reservation -> reservation.isInWeekOf(reservation.start) } ?: false }
//            .filter { it.reservation != reservation }
//            .sumBy { it.minutes }
//            .let { abo.contingent - it >= minutes }
//
//    private fun isAllocationTimeNotValid(reservation: Reservation) =
//            reservation.contingent_allocations.sumBy { it.minutes } != Duration.between(reservation.start, reservation.end).toMinutes()
}