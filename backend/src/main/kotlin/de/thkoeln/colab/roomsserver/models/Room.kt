/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import javax.persistence.*

interface BaseRoom {
    val number: String
    val name: String
    val description: String
    val imageUrl: String?
}

@Entity
data class Room(

        @Column(unique = true)
        override val number: String,

        override val name: String,

        @Lob
        @Column(name = "description", length = 512)
        override val description: String,

        @ManyToOne
        val department: Department,

        override val imageUrl: String? = null,

        private val id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "room", orphanRemoval = true)
        val reservations: List<Reservation> = listOf(),

        @ManyToMany(mappedBy = "rooms")
        val abos: List<Abo> = listOf()
) : AbstractEntity(id), BaseRoom