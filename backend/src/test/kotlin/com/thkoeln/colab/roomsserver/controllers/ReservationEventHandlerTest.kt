package com.thkoeln.colab.roomsserver.controllers

internal class ReservationEventHandlerTest {

//    private val reservationEventHandler: ReservationEventHandler = ReservationEventHandler()
//
//    private val department = Department(name = "Test Department", description = "Test Description")
//    private val rooms = listOf(
//            Room(number = "1.234", name = "Test Raum 1", description = "Test Description", department = department),
//            Room(number = "1.235", name = "Test Raum 1", description = "Test Description", department = department)
//    )
//    private val user = User(principal = "testuser", givenName = "Max", familyName = "Mustermann", email = "max@mustermann.de")
//    private val abo = Abo(
//            start = OffsetDateTime.of(month = 2, dayOfMonth = 1),
//            end = instantOf(month = 3, dayOfMonth = 1),
//            contingent = 200,
//            unlimited_end = false,
//            unlimited_contingent = false,
//            description = "Test Description",
//            rooms = rooms,
//            user = user
//    )
//
//    @Test
//    fun `should inject ReservationEventHandler`() {
//        assertThat(reservationEventHandler).isNotNull
//    }
//
//    @Test
//    fun `should throw ContingentNotMatchException if sum of contingents in allocation unequal reservation duration`() {
//        val reservation = Reservation(
//                title = "Test Reservation",
//                description = "Test Description",
//                start = instantOf(month = 2, dayOfMonth = 25, hour = 16),
//                end = instantOf(month = 2, dayOfMonth = 25, hour = 17),
//                room = rooms[0],
//                user = user,
//                contingent_allocations = listOf(
//                        ContingentAllocation(abo = abo, minutes = 30, reservation = null)
//                )
//        )
//        assertThrows<ContingentNotMatchException> { reservationEventHandler.handleReservationBeforeCreate(reservation) }
//
//    }
//
//    @Test
//    fun `should throw UserNotOwnerOfAboException if user of reservation doesn't match abo user`() {
//        val reservation = Reservation(
//                title = "Test Reservation",
//                description = "Test Description",
//                start = instantOf(month = 2, dayOfMonth = 25, hour = 16),
//                end = instantOf(month = 2, dayOfMonth = 25, hour = 17),
//                room = rooms[0],
//                user = User(principal = "testuser", givenName = "Max", familyName = "Mustermann", email = "max@mustermann.de"),
//                contingent_allocations = listOf(
//                        ContingentAllocation(abo = abo, minutes = 60, reservation = null)
//                )
//        )
//        println("EXEC")
//        assertThrows<UserNotOwnerOfAboException> { reservationEventHandler.handleReservationBeforeCreate(reservation) }
//
//    }
//
//    @Test
//    fun `should throw AboOutOfBoundsException if reservation is not in abo time`() {
//        val reservation = Reservation(
//                title = "Test Reservation",
//                description = "Test Description",
//                start = instantOf(month = 3, dayOfMonth = 1, hour = 16),
//                end = instantOf(month = 3, dayOfMonth = 1, hour = 17),
//                room = rooms[0],
//                user = user,
//                contingent_allocations = listOf(
//                        ContingentAllocation(abo = abo, minutes = 60, reservation = null)
//                )
//        )
//        assertThrows<AboOutOfBoundsException> { reservationEventHandler.handleReservationBeforeCreate(reservation) }
//
//    }
//
//    @Test
//    fun `should throw AboNotForRoomException if abo doesn't container reservation room`() {
//        val reservation = Reservation(
//                title = "Test Reservation",
//                description = "Test Description",
//                start = instantOf(month = 2, dayOfMonth = 15, hour = 16),
//                end = instantOf(month = 2, dayOfMonth = 15, hour = 17),
//                room = Room(number = "3.212", name = "Test Raum 3", description = "Test Description", department = department),
//                user = user,
//                contingent_allocations = listOf(
//                        ContingentAllocation(abo = abo, minutes = 60, reservation = null)
//                )
//        )
//        assertThrows<AboNotForRoomException> { reservationEventHandler.handleReservationBeforeCreate(reservation) }
//
//    }
//
//    @Test
//    fun `should throw NotEnoughContingentException if abo contingent not enough`() {
//        val reservation = Reservation(
//                title = "Test Reservation",
//                description = "Test Description",
//                start = instantOf(month = 2, dayOfMonth = 15, hour = 0),
//                end = instantOf(month = 2, dayOfMonth = 15, hour = 23),
//                room = rooms[0],
//                user = user,
//                contingent_allocations = listOf(
//                        ContingentAllocation(abo = abo, minutes = 1380, reservation = null)
//                )
//        )
//        assertThrows<NotEnoughContingentException> { reservationEventHandler.handleReservationBeforeCreate(reservation) }
//
//    }
}