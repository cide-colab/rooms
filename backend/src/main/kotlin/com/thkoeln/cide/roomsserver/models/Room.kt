package com.thkoeln.cide.roomsserver.models

import java.util.*
import javax.persistence.*


interface BaseRoom : BaseEntity {
    val number: String
    val name: String
    val description: String
    val imageUrl: String
}

@Entity
class Room(

        @Column(unique = true)
        override val number: String,

        override val name: String,

        @Lob
        @Column(name = "description", length = 512)
        override val description: String,

        override val imageUrl: String = "http://swasti.org/wp-content/plugins/awsm-team-pro/images/default-user.png",

        @ManyToOne
        val department: Department,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "room", orphanRemoval = true)
        val reservations: List<Reservation> = listOf(),

        @ManyToMany(mappedBy = "rooms")
        val abos: List<Abo> = listOf(),

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseRoom {
}