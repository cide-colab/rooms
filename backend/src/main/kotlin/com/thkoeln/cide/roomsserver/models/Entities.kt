package com.thkoeln.cide.roomsserver.models

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import org.hibernate.annotations.UpdateTimestamp
import org.springframework.data.domain.Persistable
import org.springframework.format.annotation.DateTimeFormat
import java.io.Serializable
import java.time.OffsetDateTime
import java.util.*
import javax.persistence.*


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

    //    @get:JsonProperty("id")
//    val id: UUID
}

//@MappedSuperclass
//abstract class PersistableEntity : BaseEntity, Serializable {
//
//    @Version
//    override val version: Long? = null
//
//    @field:CreationTimestamp
//    override val createdAt: OffsetDateTime = OffsetDateTime.now()
//
//    @field:UpdateTimestamp
//    override val updatedAt: OffsetDateTime = OffsetDateTime.now()
//
//    val persisted: Boolean
//        get() = version != null
//
////    @JsonIgnore
////    fun isNew() = !persisted
//
////    override fun getId(): UUID = id
//
////    @get:JsonProperty("id")
////    @GeneratedValue(generator = "UUID")
////    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
////    @GeneratedValue(generator = "uuid2")
////    @GenericGenerator(name = "uuid2", strategy = "uuid2")
////    @Id
////    @GeneratedValue(generator = "UUID")
////    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
////    @Type(type = "uuid-char")
////    override val id: UUID = UUID.fromString("80fa2fd6-0748-43b2-af4b-5edf5cc4b0e7")
//}

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

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseUser


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
) : PersistableEntity(id), BaseRole

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
) : PersistableEntity(id), BaseDepartment

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
) : PersistableEntity(id), BaseRoom

interface BaseReservation : BaseEntity {
    val title: String
    val description: String?
    val start: OffsetDateTime
    val end: OffsetDateTime
}

@Entity
@JsonIgnoreProperties(value = ["contingent_allocations"], allowGetters = false, allowSetters = true)
//@Table(uniqueConstraints= [UniqueConstraint(columnNames = ["contingent", "abo"])])
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

//        @OneToMany(mappedBy = "reservation", cascade = [CascadeType.ALL])
//        @ElementCollection
//        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//        @Column(name = "contingent")
        @OneToMany(mappedBy = "reservation", cascade = [CascadeType.ALL])
//        @JsonIgnoreProperties(allowGetters = false, allowSetters = true)
//        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        var contingent_allocations: List<ContingentAllocation> = listOf(),

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseReservation, Ownable

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

//        val renew: Long,

//        val endless: Boolean,

//        val unlimited: Boolean,

//        @Enumerated(EnumType.STRING)
//        override val scope: Scope,
//
//        @ManyToOne
//        override val department: Department?,

        @ManyToMany
        val rooms: List<Room>,

        @ManyToOne
        override val user: User,

        @OneToMany(mappedBy = "abo", cascade = [CascadeType.ALL])
//        @JsonIgnoreProperties(allowGetters = false, allowSetters = true)
//        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        val contingent_allocations: List<ContingentAllocation> = listOf(),

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseAbo, Ownable

interface BaseContingentAllocation {
    val minutes: Long
}

@Entity
@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["abo_id", "reservation_id"])])
class ContingentAllocation(

        @ManyToOne
        @JoinColumn
        val abo: Abo,

        @ManyToOne
        @JoinColumn
        val reservation: Reservation?,

        override val minutes: Long,

        id: UUID = UUID.randomUUID()
) : PersistableEntity(id), BaseContingentAllocation, Serializable