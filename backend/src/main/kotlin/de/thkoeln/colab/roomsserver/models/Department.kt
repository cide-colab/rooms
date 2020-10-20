/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import de.thkoeln.colab.roomsserver.core.models.DepartmentModel
import javax.persistence.*


@Entity
class Department(

        @Column(unique = true)
        override val name: String,

        @Lob
        @Column(name = "description", length = 512)
        override val description: String,

        override val imageUrl: String = "",

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "department", orphanRemoval = true)
        val rooms: List<Room> = listOf(),

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0
) : AbstractEntity(), DepartmentModel