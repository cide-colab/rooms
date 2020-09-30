/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import javax.persistence.*

interface BaseDepartment {
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

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0
) : AbstractEntity(), BaseDepartment