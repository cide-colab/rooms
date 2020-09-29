package de.thkoeln.colab.roomsserver.models

import javax.persistence.*


interface BaseRoom {
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

        id: Long = 0
) : AbstractEntity(id), BaseRoom {
}