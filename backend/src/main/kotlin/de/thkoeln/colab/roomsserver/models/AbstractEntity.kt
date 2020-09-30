/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.domain.Persistable
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class AbstractEntity(
        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private var id: Long
) : Persistable<Long> {

    @Version
    var version: Long = 0

    @Transient
    override fun getId(): Long = id

    fun setId(id: Long) {
        this.id = id
    }

    @Transient
    private var isNew = true

    override fun isNew() = isNew

    @PrePersist
    @PostLoad
    open fun markNotNew() {
        isNew = false
    }

    @CreatedBy
    @ManyToOne
    var createdBy: User? = null

    @LastModifiedBy
    @ManyToOne
    var lastModifiedBy: User? = null

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    var lastModifiedDate: Date = Date()

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    var createdDate: Date = Date()

    override fun hashCode(): Int = id.hashCode()

    override fun equals(other: Any?): Boolean {
        return when {
            other == null -> false
            this === other -> true
            other !is AbstractEntity -> false
            else -> id == other.id
        }
    }
}