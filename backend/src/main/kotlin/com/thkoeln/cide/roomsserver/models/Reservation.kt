package com.thkoeln.cide.roomsserver.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.format.annotation.DateTimeFormat
import java.time.OffsetDateTime
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Lob
import javax.persistence.ManyToOne


interface BaseReservation : BaseEntity {
    val title: String
    val description: String?
    val start: OffsetDateTime
    val end: OffsetDateTime
}

@Entity
@JsonIgnoreProperties(value = ["contingent_allocations"], allowGetters = false, allowSetters = true)
class Reservation(

        override val title: String,

        @Lob
        @Column(name = "description", length = 100)
        override val description: String?,

        @DateTimeFormat(pattern = jsonDateFormat)
        override val start: OffsetDateTime,

        @DateTimeFormat(pattern = jsonDateFormat)
        override val end: OffsetDateTime,

        @ManyToOne
        val room: Room,

        @ManyToOne
        override val user: User,

        @ManyToOne
        val abo: Abo,

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseReservation, Ownable {
}