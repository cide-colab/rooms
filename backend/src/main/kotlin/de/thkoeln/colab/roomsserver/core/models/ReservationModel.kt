/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.core.models

import java.time.OffsetDateTime

interface ReservationModel {
    val title: String
    val description: String?
    val start: OffsetDateTime
    val end: OffsetDateTime
}

interface ReservationIdentity: ReservationModel, IdentityModel