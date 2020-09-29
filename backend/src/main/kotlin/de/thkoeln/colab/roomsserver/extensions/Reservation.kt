package de.thkoeln.colab.roomsserver.extensions

import de.thkoeln.colab.roomsserver.models.Reservation
import java.time.Instant
import java.time.OffsetDateTime
import java.time.temporal.WeekFields
import java.util.*

fun OffsetDateTime.getWeekDay(locale: Locale = Locale.GERMANY) = get(WeekFields.of(locale).weekOfWeekBasedYear())

fun Reservation?.isInWeekOf(date: Instant) =
        this?.start?.getWeekDay()?.let { nr -> nr == date.weekNumber } ?: false

fun Reservation?.isInWeekOf(date: OffsetDateTime) =
        this?.start?.getWeekDay()?.let { nr -> nr == date.getWeekDay() } ?: false