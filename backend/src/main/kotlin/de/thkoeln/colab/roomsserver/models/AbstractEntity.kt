/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import de.thkoeln.colab.roomsserver.core.models.IdentityModel
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import javax.persistence.*

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class AbstractEntity: IdentityModel {

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

// TODO implement PROBLEM: Is not updated
//    @Temporal(TemporalType.TIMESTAMP)
//    @LastModifiedDate
//    var lastModifiedDate: Date = Date()
//
// TODO implement PROBLEM: Is not updated
//    @Temporal(TemporalType.TIMESTAMP)
//    @CreatedDate
//    var createdDate: Date = Date()

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