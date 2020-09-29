package de.thkoeln.colab.roomsserver.services

import de.thkoeln.colab.roomsserver.extensions.isInWeekOf
import de.thkoeln.colab.roomsserver.extensions.sumBy
import de.thkoeln.colab.roomsserver.repositories.AboRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.OffsetDateTime
import java.time.temporal.ChronoUnit

data class Contingent(
        val used: Long,
        val left: Long
)

@Service
class AboService @Autowired constructor(private val aboRepository: AboRepo) {
    fun getContingentForAboOnDate(id: Long, date: OffsetDateTime) = aboRepository.findById(id)
            ?.let { abo ->
                val used = abo.reservations
                        .filter { it.isInWeekOf(date) }
                        .sumBy { ChronoUnit.MINUTES.between(it.start, it.end) }
                Contingent(used = used, left = abo.contingent - used)
            } ?: Contingent(0, 0)
}