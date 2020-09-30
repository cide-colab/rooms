/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.models.Abo
import de.thkoeln.colab.roomsserver.models.AbstractEntity
import de.thkoeln.colab.roomsserver.models.Room
import org.springframework.stereotype.Service

@Service
class AclLookupStrategy {
    fun getParent(targetObject: Any): Any? = when (targetObject) {
        is Abo -> targetObject.rooms
        is Room -> targetObject.department
        is Application -> null // Termination condition
        else -> Application // Application is the parent of everything except Application
    }

    fun getId(targetObject: Any): Long = when (targetObject) {
        is AbstractEntity -> targetObject.id
        is Application -> 0
        else -> throw throw Throwable("This should never happen")
    }
}