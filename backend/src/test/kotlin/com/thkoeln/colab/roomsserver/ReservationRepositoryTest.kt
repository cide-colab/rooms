//package com.thkoeln.cide.roomsserver
//
//import com.fasterxml.jackson.databind.ObjectMapper
//import com.fasterxml.jackson.databind.ObjectWriter
//import com.fasterxml.jackson.databind.SerializationFeature
//import com.thkoeln.cide.roomsserver.error.ContingentNotMatchException
//import com.thkoeln.cide.roomsserver.models.*
//import org.hamcrest.Matchers
//import org.junit.Before
//import org.junit.jupiter.api.BeforeAll
//import org.junit.jupiter.api.Test
//import org.junit.runner.RunWith
//import org.mockito.BDDMockito.given
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
//import org.springframework.boot.test.mock.mockito.MockBean
//import org.springframework.http.MediaType
//import org.springframework.security.test.context.support.WithMockUser
//import org.springframework.test.context.junit4.SpringRunner
//import org.springframework.test.web.servlet.MockMvc
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
//import java.time.LocalDateTime
//import java.time.ZoneOffset
//
//
//@RunWith(SpringRunner::class)
//@WebMvcTest(ReservationRepository::class)
//class ReservationRepositoryTest {
//
////    @MockBean
////    private lateinit var reservationRepository: ReservationRepository
////
//    @MockBean
//    private lateinit var userRepository: UserRepository
////
//    @MockBean
//    private lateinit var aboRepository: AboRepository
//
//    @Autowired
//    private lateinit var objectMapper: ObjectMapper
//
////    @MockBean
////    private lateinit var roomRepository: RoomRepository
////
////    @MockBean
////    private lateinit var departmentRepository: DepartmentRepository
////
//    @Autowired
//    private lateinit var mvc: MockMvc
//
//    @Before
//    fun mockSessionUser() {
//        given(userRepository.findByPrincipal("session")).willReturn(SESSION_USER)
//    }
//
//    @Test
//    @WithMockUser(value = "session")
//    fun `should throw ContingentNotMatchException if contingent in allocations not match reservation contingent`() {
//
////        val user = User(principal = "testuser", givenName = "Max", familyName = "Mustermann", email = "max@mustermann.de").apply { setId("1") }
////        val rooms = listOfNotNull(
////                Room(number = "1.234", name = "Test Raum 1", description = "Test Description", department = department).apply { setId("1") },
////                Room(number = "1.235", name = "Test Raum 1", description = "Test Description", department = department).apply { setId("1") }
////        )
//
////        `when`(userRepository.findById("1")).thenReturn(user)
////        `when`(departmentRepository.findById("1")).thenReturn(department)
////        `when`(roomRepository.findById("1")).thenReturn(department)
//
//        val department = Department(name = "Test Department", description = "Test Description")
//        val rooms = listOf(
//                Room(number = "1.234", name = "Test Raum 1", description = "Test Description", department = department),
//                Room(number = "1.235", name = "Test Raum 1", description = "Test Description", department = department)
//        )
//        val user = User(principal = "testuser", givenName = "Max", familyName = "Mustermann", email = "max@mustermann.de")
//        val abo = Abo(
//                start = LocalDateTime.of(2020, 2, 1, 0, 0).toInstant(ZoneOffset.UTC),
//                end = LocalDateTime.of(2020, 3, 1, 0, 0).toInstant(ZoneOffset.UTC),
//                contingent = 200,
//                unlimited_end = false,
//                unlimited_contingent = false,
//                description = "Test Description",
//                rooms = rooms,
//                user = user
//        )
//
//        given(aboRepository.findById(abo.id)).willReturn(abo)
//
//        val reservation = Reservation(
//                title = "Test Reservation",
//                description = "Test Description",
//                start = LocalDateTime.of(2020, 2, 25, 16, 0).toInstant(ZoneOffset.UTC),
//                end = LocalDateTime.of(2020, 2, 25, 17, 0).toInstant(ZoneOffset.UTC),
//                room = rooms[0],
//                user = user,
//                contingent_allocations = listOf(
//                        ContingentAllocation(abo = abo, minutes = 30, reservation = null)
//                )
//        )
//
//        mvc.perform(post("/reservations").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(reservation)))
//                .andExpect(status().isBadRequest)
//                .andExpect(jsonPath("$", Matchers.hasValue(ContingentNotMatchException().localizedMessage)))
//
////        val users = listOfNotNull(
////                userRepository.save(User(principal = "testuser", givenName = "Max", familyName = "Mustermann", email = "max@mustermann.de"))
////        )
////        val departments = listOfNotNull(
////                departmentRepository.save(Department(name = "Test Department", description = "Test Description"))
////        )
////        val rooms = listOfNotNull(
////                roomRepository.save(Room(number = "1.234", name = "Test Raum 1", description = "Test Description", department = departments[0])),
////                roomRepository.save(Room(number = "1.235", name = "Test Raum 1", description = "Test Description", department = departments[0]))
////        )
//
////        val abos = listOfNotNull(
////                aboRepository.save(Abo(
////                        start = LocalDateTime.of(2020, 2, 1, 0, 0).toInstant(ZoneOffset.UTC),
////                        end = LocalDateTime.of(2020, 3, 1, 0, 0).toInstant(ZoneOffset.UTC),
////                        contingent = 200,
////                        unlimited_end = false,
////                        unlimited_contingent = false,
////                        description = null,
////                        rooms = rooms,
////                        user = users[0]
////                ))
////        )
////
////        val reservationToSave = Reservation(
////                title = "Test Reservation",
////                description = "Test Description",
////                start = LocalDateTime.of(2020, 2, 25, 16, 0).toInstant(ZoneOffset.UTC),
////                end = LocalDateTime.of(2020, 2, 25, 17, 0).toInstant(ZoneOffset.UTC),
////                room = rooms[0],
////                user = users[0],
////                contingent_allocations = listOf(
////                        ContingentAllocation(abo = abos[0], minutes = 30, reservation = null)
////                )
////        )
////
////        assertThrows<ContingentNotMatchException> {
////            reservationRepository.save(reservationToSave)
////        }
//    }
//
////    @Autowired
////    private lateinit var reservationRepository: ReservationRepository
////
////    @Autowired
////    private lateinit var userRepository: UserRepository
////
////    @Autowired
////    private lateinit var aboRepository: AboRepository
////
////    @Autowired
////    private lateinit var roomRepository: RoomRepository
////
////    @Autowired
////    private lateinit var departmentRepository: DepartmentRepository
////
////    @Test
////    fun `should inject ReservationRepository`() {
////        assertThat(reservationRepository).isNotNull
////    }
////
////    @Test
////    fun `should inject UserRepository`() {
////        assertThat(userRepository).isNotNull
////    }
////
////    @Test
////    fun `should inject AboRepository`() {
////        assertThat(aboRepository).isNotNull
////    }
////
////    @Test
////    fun `should inject RoomRepository`() {
////        assertThat(roomRepository).isNotNull
////    }
////
////    @Test
////    fun `should inject DepartmentRepository`() {
////        assertThat(departmentRepository).isNotNull
////    }
//
//    companion object {
//        private val SESSION_USER =  User(
//                givenName = "Max",
//                familyName = "Mustermann",
//                principal = "session",
//                email = "Max@Musermann.de"
//        )
//    }
//
//}