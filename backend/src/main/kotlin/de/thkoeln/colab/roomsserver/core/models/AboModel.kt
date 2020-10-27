/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.core.models

import java.time.OffsetDateTime

interface AboModel {
    val title: String
    val start: OffsetDateTime
    val end: OffsetDateTime
    val contingent: Long
    val unlimited_end: Boolean
    val unlimited_contingent: Boolean
    val description: String
}

interface AboIdentity: AboModel, Identity