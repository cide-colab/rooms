/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.OneToMany

interface BaseUser {
    val principal: String
    val givenName: String
    val familyName: String
    val email: String
    val imageUrl: String?
}

@Entity
data class User(

        @Column(unique = true, columnDefinition = "LONGBLOB")
        override val principal: String,

        override val givenName: String,

        override val familyName: String,

        override val email: String,

        override val imageUrl: String? = null,

        private val id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user", orphanRemoval = true)
        val abos: List<Abo> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user", orphanRemoval = true)
        val reservations: List<Reservation> = listOf()
) : AbstractEntity(id), BaseUser