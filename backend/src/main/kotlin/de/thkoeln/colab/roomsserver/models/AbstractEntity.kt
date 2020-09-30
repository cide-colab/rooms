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
abstract class AbstractEntity {

    abstract var id: Long

    @Version
    var version: Long = 1

    @Transient
    private var isNew = true

    fun isNew() = isNew

    @PrePersist
    @PostLoad
    open fun markNotNew() {
        isNew = false
    }

// TODO implement PROBLEM: Stack overflow in line 28 when making put request
//    @CreatedBy
//    @ManyToOne
//    var createdBy: User? = null

// TODO implement PROBLEM: Stack overflow in line 28 when making put request
//    @LastModifiedBy
//    @ManyToOne
//    var lastModifiedBy: User? = null

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