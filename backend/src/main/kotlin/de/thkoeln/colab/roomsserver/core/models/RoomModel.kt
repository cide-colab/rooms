/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.core.models

interface RoomModel {
    val number: String
    val name: String
    val description: String
    val imageUrl: String?
}

interface RoomIdentity: RoomModel, Identity