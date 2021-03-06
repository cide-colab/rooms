/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import de.thkoeln.colab.roomsserver.core.models.Identity
import de.thkoeln.colab.roomsserver.core.models.ReservationModel
import de.thkoeln.colab.roomsserver.core.models.RoomModel
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.rest.core.config.Projection
import org.springframework.format.annotation.DateTimeFormat
import java.time.OffsetDateTime
import javax.persistence.*



@Entity
@JsonIgnoreProperties(value = ["contingent_allocations"], allowGetters = false, allowSetters = true)
class Reservation(

        override val title: String,

        @Lob
        @Column(name = "description", length = 100)
        override val description: String?,

        @DateTimeFormat(pattern = "EEE MMM dd yyyy HH:mm:ss z XX")
        override val start: OffsetDateTime,

        @DateTimeFormat(pattern = "EEE MMM dd yyyy HH:mm:ss z XX")
        override val end: OffsetDateTime,

        @ManyToOne
        val room: Room,

        @ManyToOne
        val user: User,

        @ManyToOne
        val abo: Abo,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0
) : AbstractEntity(), ReservationModel


@Projection(name = Projections.RICH, types = [Reservation::class])
interface RichReservation : ReservationModel, Identity {
        fun getRoom(): Room
        fun getUser(): User
        fun getAbo(): Abo
}