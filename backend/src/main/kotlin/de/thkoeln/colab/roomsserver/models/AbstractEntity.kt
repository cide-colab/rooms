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
    val version: Long? = null

    val persisted: Boolean
        get() = version != null

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
    private val createdBy: User? = null

    @LastModifiedBy
    @ManyToOne
    protected var lastModifiedBy: User? = null

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    protected var lastModifiedDate: Date? = null

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    protected var createdDate: Date? = null

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