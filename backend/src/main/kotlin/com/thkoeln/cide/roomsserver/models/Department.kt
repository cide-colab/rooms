package com.thkoeln.cide.roomsserver.models

import java.util.*
import javax.persistence.*

interface BaseDepartment : BaseEntity {
    val name: String
    val description: String
    val imageUrl: String
}

@Entity
class Department(

        @Column(unique = true)
        override val name: String,

        @Lob
        @Column(name = "description", length = 512)
        override val description: String,

        override val imageUrl: String = "http://swasti.org/wp-content/plugins/awsm-team-pro/images/default-user.png",

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "department", orphanRemoval = true)
        val rooms: List<Room> = listOf(),

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseDepartment {
}