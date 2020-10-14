/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.core.models

interface UserModel {
    val principal: String
    val givenName: String
    val familyName: String
    val email: String
    val imageUrl: String?
}

interface UserIdentity: UserModel, Identity