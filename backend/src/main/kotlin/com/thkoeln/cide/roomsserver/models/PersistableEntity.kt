package com.thkoeln.cide.roomsserver.models

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import org.hibernate.annotations.UpdateTimestamp
import org.springframework.data.domain.Persistable
import java.time.OffsetDateTime
import java.util.*
import javax.persistence.*

@MappedSuperclass
abstract class PersistableEntity(
//    @JsonProperty(value = "id")
//    @JsonIgnore
        @Id
        @Column(name = "id", length = 256, unique = true, nullable = false)
        @GeneratedValue(generator = "UUID")
        @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
        @Type(type = "uuid-char")
        private var id: UUID
) : Persistable<UUID>, BaseEntity {

    @Version
    override val version: Long? = null

    @field:CreationTimestamp
    @Column(columnDefinition = "DATETIME")
    override val createdAt: OffsetDateTime = OffsetDateTime.now()

    @field:UpdateTimestamp
    @Column(columnDefinition = "DATETIME")
    override val updatedAt: OffsetDateTime = OffsetDateTime.now()

    val persisted: Boolean
        get() = version != null

    override fun getId(): UUID = id

    fun setId(id: UUID) {
        this.id = id
    }

    @JsonIgnore
    override fun isNew(): Boolean = !persisted

    override fun hashCode(): Int = id.hashCode()

    override fun equals(other: Any?): Boolean {
        return when {
            other == null -> false
            this === other -> true
            other !is PersistableEntity -> false
            else -> id == other.id
        }
    }
}