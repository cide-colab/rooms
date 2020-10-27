/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import de.thkoeln.colab.roomsserver.core.models.Identity
import de.thkoeln.colab.roomsserver.core.models.RoomModel
import org.springframework.data.rest.core.config.Projection
import javax.persistence.*


@Entity
class Room(

        @Column(unique = true)
        override val number: String,

        override val name: String,

        @Lob
        @Column(name = "description", length = 512)
        override val description: String,

        @ManyToOne
        val department: Department,

        override val imageUrl: String? = null,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "room", orphanRemoval = true)
        val reservations: List<Reservation> = listOf(),

        @ManyToMany(mappedBy = "rooms")
        val abos: List<Abo> = listOf()
) : AbstractEntity(), RoomModel

@Projection(name = Projections.RICH, types = [Room::class])
interface RichRoom : RoomModel, Identity {
        fun getDepartment(): Department
}