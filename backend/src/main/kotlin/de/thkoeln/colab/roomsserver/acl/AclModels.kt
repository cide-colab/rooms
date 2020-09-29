package de.thkoeln.colab.roomsserver.acl

import de.thkoeln.colab.roomsserver.models.AbstractEntity
import javax.persistence.*

@Entity
data class AclSid(

        @Column(unique = true)
        val principal: String,

        private val id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "sid")
        val roleAllocations: List<AclRoleAllocation> = listOf()
) : AbstractEntity(id)

@Entity
data class AclClass(

        @Column(unique = true)
        val className: String,

        private val id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "objectClass")
        val identities: List<AclObjectIdentity> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "targetClass")
        val permissions: List<AclPermission> = listOf()
) : AbstractEntity(id)

@Entity
//@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["objectId", "objectClass"])])
data class AclObjectIdentity(

        val objectId: Long,

        @ManyToOne
        val objectClass: AclClass,

        private val id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "scope")
        val allocations: List<AclRoleAllocation> = listOf()
) : AbstractEntity(id)

@Entity
//@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["targetClass", "action", "role"])])
data class AclPermission(

        @ManyToOne
        val targetClass: AclClass,

        @Enumerated(EnumType.STRING)
        val action: AclAction,

        @ManyToOne
        val role: AclRole,

        private val id: Long = 0
) : AbstractEntity(id)

@Entity
data class AclRole(

        @Column(unique = true)
        val name: String,

        private val id: Long = 0,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "role")
        val permissions: List<AclPermission> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "role")
        val allocations: List<AclRoleAllocation> = listOf()
) : AbstractEntity(id)

@Entity
//@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["sid", "role", "scope"])])
data class AclRoleAllocation(

        @ManyToOne
        val sid: AclSid,

        @ManyToOne
        val role: AclRole,

        @ManyToOne
        val scope: AclObjectIdentity?,

        private val id: Long = 0
) : AbstractEntity(id)

enum class AclAction {
    CREATE,
    READ,
    UPDATE,
    DELETE
}

object Application

const val ANONYMOUS_PRINCIPAL = "anonymous"