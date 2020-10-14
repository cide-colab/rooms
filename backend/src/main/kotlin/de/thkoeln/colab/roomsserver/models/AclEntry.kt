/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.models

import de.thkoeln.colab.roomsserver.acl.AclAction
import de.thkoeln.colab.roomsserver.core.models.AclEntryModel

class AclEntry(
        override val contextId: Long,
        override val contextClass: String,
        override val targetId: Long?,
        override val targetClass: String,
        override val action: AclAction
): AclEntryModel