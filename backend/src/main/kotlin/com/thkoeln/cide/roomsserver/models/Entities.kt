package com.thkoeln.cide.roomsserver.models

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.thkoeln.cide.roomsserver.controllers.PersistableType
import org.hibernate.annotations.*
import org.hibernate.cfg.AvailableSettings.USER
import org.hibernate.type.EntityType
import org.springframework.data.domain.Persistable
import org.springframework.format.annotation.DateTimeFormat
import java.io.Serializable
import java.time.OffsetDateTime
import java.util.*
import javax.persistence.*
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.Table

@MappedSuperclass
abstract class PersistableEntity(//    @JsonProperty(value = "id")
//    @JsonIgnore
        @Id
        @Column(name = "id", length = 256, unique = true, nullable = false)
        @GeneratedValue(generator = "UUID")
        @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
        @Type(type = "uuid-char")
        private var id: UUID
) : Persistable<UUID>, BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    open val type = PersistableType.APP

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

interface BaseAccessControlItem {
    val entityType: PersistableType
    val entityId: UUID?
    val permission: String
    val isGenerated: Boolean
}

@Entity
@Table(name = "acl")
class AccessControlItem(

        @Type(type = "uuid-char")
        override val entityId: UUID?,

        @Enumerated(EnumType.STRING)
        override val entityType: PersistableType,

        override val permission: String,

        @ManyToOne
        val user: User,

        override val isGenerated: Boolean = false,

        @ManyToOne
        val parent: AccessControlItem? = null,

        id: UUID = UUID.randomUUID(),

        @OneToMany(mappedBy = "parent", cascade = [CascadeType.ALL])
        val children: List<AccessControlItem> = listOf()
) : PersistableEntity(id), BaseAccessControlItem {

    @JsonEnumDefaultValue()
    override val type = PersistableType.ACCESS_CONTROL_ITEM
}

enum class RoleName {
    ADMIN
}

enum class Scope {
    APP,
    DEPARTMENT,
    ROOM
}

const val jsonDateFormat = "EEE MMM dd yyyy HH:mm:ss z XX"
private const val defaultImage = "http://swasti.org/wp-content/plugins/awsm-team-pro/images/default-user.png"

interface BaseEntity {

    val version: Long?

    val createdAt: OffsetDateTime

    val updatedAt: OffsetDateTime
}

interface BaseUser : BaseEntity {
    val principal: String
    val givenName: String
    val familyName: String
    val email: String
    val imageUrl: String
}

@Entity
class User(
        @Column(unique = true, columnDefinition = "LONGBLOB")
        override val principal: String,
        override val givenName: String,
        override val familyName: String,
        override val email: String,
        override val imageUrl: String = defaultImage,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user", orphanRemoval = true)
        val roles: List<Role> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user", orphanRemoval = true)
        val abos: List<Abo> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user", orphanRemoval = true)
        val reservations: List<Reservation> = listOf(),

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user", orphanRemoval = true)
        val acl: List<AccessControlItem> = listOf(),

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseUser {
    override val type = PersistableType.USER
}


interface BaseRole : BaseEntity, Scoped, Ownable {
    val role: RoleName
}

@Entity
class Role(

        @Enumerated(EnumType.STRING)
        override val role: RoleName,

        @Enumerated(EnumType.STRING)
        override val scope: Scope,

        @ManyToOne
        override val department: Department?,

        @ManyToOne
        override val room: Room?,

        @ManyToOne
        override val user: User,

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseRole {
    override val type = PersistableType.ROLE
}

interface BaseDepartment : BaseEntity {
    val name: String
    val description: String
    val imageUrl: String
}

@Entity
class Department(

        @Column(unique = true)
        override val name: String,

        @Lob
        @Column(name = "description", length = 512)
        override val description: String,

        override val imageUrl: String = "http://swasti.org/wp-content/plugins/awsm-team-pro/images/default-user.png",

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "department", orphanRemoval = true)
        val rooms: List<Room> = listOf(),

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseDepartment {
    override val type = PersistableType.DEPARTMENT
}

interface Scoped {
    val scope: Scope
    val department: Department?
    val room: Room?
}

interface Ownable {
    val user: User
}

interface BaseRoom : BaseEntity {
    val number: String
    val name: String
    val description: String
    val imageUrl: String
}

@Entity
class Room(

        @Column(unique = true)
        override val number: String,

        override val name: String,

        @Lob
        @Column(name = "description", length = 512)
        override val description: String,

        override val imageUrl: String = "http://swasti.org/wp-content/plugins/awsm-team-pro/images/default-user.png",

        @ManyToOne
        val department: Department,

        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "room", orphanRemoval = true)
        val reservations: List<Reservation> = listOf(),

        @ManyToMany(mappedBy = "rooms")
        val abos: List<Abo> = listOf(),

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseRoom {
    override val type = PersistableType.ROOM
}

interface BaseReservation : BaseEntity {
    val title: String
    val description: String?
    val start: OffsetDateTime
    val end: OffsetDateTime
}

@Entity
@JsonIgnoreProperties(value = ["contingent_allocations"], allowGetters = false, allowSetters = true)
class Reservation(

        override val title: String,

        @Lob
        @Column(name = "description", length = 100)
        override val description: String?,

        @DateTimeFormat(pattern = jsonDateFormat)
        override val start: OffsetDateTime,

        @DateTimeFormat(pattern = jsonDateFormat)
        override val end: OffsetDateTime,

        @ManyToOne
        val room: Room,

        @ManyToOne
        override val user: User,

        @ManyToOne
        val abo: Abo,

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseReservation, Ownable {
    override val type = PersistableType.RESERVATION
}

interface BaseAbo : BaseEntity {
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

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseAbo, Ownable {
    override val type = PersistableType.ABO
}
