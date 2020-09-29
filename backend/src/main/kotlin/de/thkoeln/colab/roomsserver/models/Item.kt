package de.thkoeln.colab.roomsserver.models

import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.domain.Persistable
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.*


interface AbstractItem {
    val name: String
}

@Entity
class Item(
        override val name: String,
        @ManyToOne
        val parent: Item? = null,
        @OneToMany(mappedBy = "parent")
        val children: List<Item> = listOf(),
        id: Long = 0
): AbstractEntity(id), AbstractItem