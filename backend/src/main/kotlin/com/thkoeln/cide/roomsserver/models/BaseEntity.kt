package com.thkoeln.cide.roomsserver.models

import java.time.OffsetDateTime

interface BaseEntity {

    val version: Long?

    val createdAt: OffsetDateTime

    val updatedAt: OffsetDateTime
}