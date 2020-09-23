package com.thkoeln.cide.roomsserver.models

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "acl_sid")
class ACLSid(
        @Id
        @GeneratedValue
        val id: Long,
        val principal: Boolean,
        @Column(unique = true)
        val sid: String
)

@Entity
@Table(name = "acl_class")
class ACLClass(
        @Id
        @GeneratedValue
        val id: Long,
        @Column(name = "class", unique = true)
        val clazz: String
)

@Entity
@Table(name = "acl_object_identity", uniqueConstraints = [UniqueConstraint(columnNames = ["object_id_class", "object_id_identity"])])
class ACLObjectIdentity(
        @Id
        @GeneratedValue
        val id: Long,

        @ManyToOne
        @JoinColumn(name = "object_id_class")
        val objectIdClass: ACLClass,

        @Column(name = "object_id_identity")
        @Type(type = "uuid-char")
        val objectIdIdentity: UUID,

        @ManyToOne
        @JoinColumn(name = "parent_object")
        val parentObject: ACLObjectIdentity?,

        @ManyToOne
        @JoinColumn(name = "owner_sid")
        val ownerSid: ACLSid?,

        @Column(name = "entries_inheriting")
        val entriesInheriting: Boolean
)

@Entity
@Table(name = "acl_entry", uniqueConstraints = [UniqueConstraint(columnNames = ["acl_object_identity", "ace_order"])])
class ACLEntry(
        @Id
        @GeneratedValue
        val id: Long,

        @ManyToOne
        @JoinColumn(name = "acl_object_identity")
        val aclObjectIdentity: ACLObjectIdentity,

        @Column(name = "ace_order")
        val aceOrder: Int,

        @ManyToOne
        @JoinColumn(name = "sid")
        val sid: ACLSid,

        @Column(name = "mask")
        val mask: Int,

        @Column(name = "granting")
        val granting: Boolean,

        @Column(name = "audit_success")
        val auditSuccess: Boolean,

        @Column(name = "audit_failure")
        val auditFailure: Boolean
)
