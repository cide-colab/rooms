/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.models.AbstractEntity
import javax.persistence.*

@Entity
data class AclSid(

        @Column(unique = true)
        val principal: String,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "sid")
        val roleAllocations: List<AclRoleAllocation> = listOf()
) : AbstractEntity()

@Entity
data class AclClass(

        @Column(unique = true)
        val className: String,

        val alias: String,

        val prettyName: String,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "objectClass")
        val identities: List<AclObjectIdentity> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "targetClass")
        val permissions: List<AclPermission> = listOf()
) : AbstractEntity()

@Entity
//@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["objectId", "objectClass"])])
data class AclObjectIdentity(

        val objectId: Long,

        @ManyToOne
        val objectClass: AclClass,

        @ManyToMany
        val parents: List<AclObjectIdentity> = listOf(),

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "context")
        val allocations: List<AclRoleAllocation> = listOf(),

        @ManyToMany(cascade = [CascadeType.ALL], mappedBy = "parents")
        val children: List<AclObjectIdentity> = listOf()
) : AbstractEntity()

@Entity
//@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["targetClass", "action", "role"])])
data class AclPermission(

        @ManyToOne
        val targetClass: AclClass,

        @Enumerated(EnumType.STRING)
        val action: AclAction,

        @ManyToOne
        val role: AclRole,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0
) : AbstractEntity()

@Entity
data class AclRole(

        @Column(unique = true)
        val name: String,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "role")
        val permissions: List<AclPermission> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "role")
        val allocations: List<AclRoleAllocation> = listOf()
) : AbstractEntity()

@Entity
//@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["sid", "role", "scope"])])
data class AclRoleAllocation(

        @ManyToOne
        val sid: AclSid,

        @ManyToOne
        val role: AclRole,

        @ManyToOne
        val context: AclObjectIdentity,

        @Id
        @Column(name = "id", nullable = false)
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        override var id: Long = 0
) : AbstractEntity()

enum class AclAction {
    CREATE,
    READ,
    UPDATE,
    DELETE,
    ADMINISTRATE
}

object Application

const val ANONYMOUS_PRINCIPAL = "anonymousUser"

data class ContextForm(
        val objectClass: String,
        val objectId: Long
)

data class PermissionCheckForm(
        val target: String,
        val context: ContextForm?,
        val action: AclAction
)

data class PermissionEntry(
        val target: String,
        val contextId: Long?,
        val context: String?,
        val action: AclAction
)