package de.thkoeln.colab.roomsserver.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.format.annotation.DateTimeFormat
import java.time.OffsetDateTime
import javax.persistence.*

enum class Permissions(val mask: Int) {
    READ(0),
    WRITE(1),
    CREATE(2),
    DELETE(3),
    ADMINISTER(4)
}

interface BaseAbo {
    val title: String
    val start: OffsetDateTime
    val end: OffsetDateTime
    val contingent: Long
    val unlimited_end: Boolean
    val unlimited_contingent: Boolean
    val description: String?
}

@Entity
@JsonIgnoreProperties(value = ["contingent_allocations"], allowGetters = false, allowSetters = true)
class Abo(

        @DateTimeFormat(pattern = jsonDateFormat)
        override val start: OffsetDateTime,

        @DateTimeFormat(pattern = jsonDateFormat)
        override val end: OffsetDateTime,

        override val contingent: Long,

        override val unlimited_end: Boolean = false,

        override val unlimited_contingent: Boolean = false,

        @Lob
        @Column(name = "title", length = 25)
        override val title: String,

        @Lob
        @Column(name = "description", length = 500)
        override val description: String?,

        @ManyToMany
        val rooms: List<Room>,

        @ManyToOne
        override val user: User,

        @OneToMany(mappedBy = "abo", cascade = [CascadeType.ALL])
        val reservations: List<Reservation> = listOf(),

        id: Long = 0
) : AbstractEntity(id), BaseAbo, Ownable {
}