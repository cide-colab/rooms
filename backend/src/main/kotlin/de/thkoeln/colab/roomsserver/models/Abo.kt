/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.format.annotation.DateTimeFormat
import java.time.OffsetDateTime
import javax.persistence.*

interface BaseAbo {
    val title: String
    val start: OffsetDateTime
    val end: OffsetDateTime
    val contingent: Long
    val unlimited_end: Boolean
    val unlimited_contingent: Boolean
    val description: String?
}

@Entity
@JsonIgnoreProperties(value = ["contingent_allocations"], allowGetters = false, allowSetters = true)
class Abo(

        @DateTimeFormat(pattern = "EEE MMM dd yyyy HH:mm:ss z XX")
        override val start: OffsetDateTime,

        @DateTimeFormat(pattern = "EEE MMM dd yyyy HH:mm:ss z XX")
        override val end: OffsetDateTime,

        override val contingent: Long,

        override val unlimited_end: Boolean = false,

        override val unlimited_contingent: Boolean = false,

        @Lob
        @Column(name = "title", length = 25)
        override val title: String,

        @Lob
        @Column(name = "description", length = 500)
        override val description: String?,

        @ManyToMany
        val rooms: List<Room>,

        @ManyToOne
        val user: User,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0,

        @OneToMany(mappedBy = "abo", cascade = [CascadeType.ALL])
        val reservations: List<Reservation> = listOf()
) : AbstractEntity(), BaseAbo