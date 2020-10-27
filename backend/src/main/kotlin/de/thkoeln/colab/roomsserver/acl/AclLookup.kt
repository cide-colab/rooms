/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.models.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AclLookupStrategy {

    fun getParents(targetObject: Any): List<Any> = when (targetObject) {
        is Abo -> targetObject.rooms
        is Room -> listOf(targetObject.department)
        is Reservation -> listOf(targetObject.room)
        is Application -> listOf() // Termination condition
        else -> listOf(Application) // Application is the parent of everything except Application
    }

    fun getId(targetObject: Any): Long = when (targetObject) {
        is AbstractEntity -> targetObject.id
        is Application -> 0
        else -> throw throw Throwable("This should never happen ${targetObject::class.java} $targetObject")
    }

    fun getOwnerPrincipal(targetObject: Any): String? = when (targetObject) {
        is User -> targetObject.principal
        is Abo -> targetObject.user.principal
        is Reservation -> targetObject.user.principal
        else -> null
    }
}