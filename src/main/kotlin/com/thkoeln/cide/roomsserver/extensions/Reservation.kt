package com.thkoeln.cide.roomsserver.extensions

import com.thkoeln.cide.roomsserver.models.Reservation
import java.time.Instant
import java.time.OffsetDateTime
import java.time.temporal.WeekFields
import java.util.*


private val defaultLocale = Locale.GERMANY

fun OffsetDateTime.getWeekDay(locale: Locale = defaultLocale) = get(WeekFields.of(locale).weekOfWeekBasedYear())

fun Reservation?.isInWeekOf(date: Instant) =
        this?.start?.getWeekDay()?.let { nr -> nr == date.weekNumber } ?: false


fun Reservation?.isInWeekOf(date: OffsetDateTime) =
        this?.start?.getWeekDay()?.let { nr -> nr == date.getWeekDay() } ?: false