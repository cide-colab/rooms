/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import com.fasterxml.jackson.annotation.JsonRootName
import de.thkoeln.colab.roomsserver.acl.AclAction
import de.thkoeln.colab.roomsserver.core.models.AclEntryModel
import org.springframework.hateoas.server.core.Relation


@JsonRootName(value = "entry")
@Relation(collectionRelation = "entries", itemRelation = "entry")
class AclEntry(
        override val contextId: Long,
        override val contextClass: String,
        override val targetId: Long?,
        override val targetClass: String,
        override val action: AclAction
): AclEntryModel