package de.thkoeln.colab.roomsserver.extensions

import java.time.*
import java.time.temporal.WeekFields
import java.util.*

val OffsetDateTime.endOfDay
    get() = toLocalDate().atTime(LocalTime.MAX).atOffset(offset)

val OffsetDateTime.startOfDay
    get() = toLocalDate().atTime(LocalTime.MIN).atOffset(offset)

val Instant.weekNumber
    get() = LocalDateTime.ofInstant(this, ZoneOffset.systemDefault()).get(WeekFields.of(Locale.getDefault()).weekOfWeekBasedYear())

fun instantOf(
        year: Int = 1,
        month: Int = LocalDate.now().monthValue,
        dayOfMonth: Int = LocalDate.now().dayOfMonth,
        hour: Int = LocalDateTime.now().hour,
        minute: Int = LocalDateTime.now().minute,
        zone: ZoneOffset = ZoneOffset.UTC
) = LocalDateTime.of(year, month, dayOfMonth, hour, minute).toInstant(zone)

fun Instant.copy(
        year: Int = LocalDateTime.ofInstant(this, ZoneOffset.UTC).year,
        month: Int = LocalDateTime.ofInstant(this, ZoneOffset.UTC).monthValue,
        dayOfMonth: Int = LocalDateTime.ofInstant(this, ZoneOffset.UTC).dayOfMonth,
        hour: Int = LocalDateTime.ofInstant(this, ZoneOffset.UTC).hour,
        minute: Int = LocalDateTime.ofInstant(this, ZoneOffset.UTC).minute
) = instantOf(year, month, dayOfMonth, hour, minute, ZoneOffset.UTC)
