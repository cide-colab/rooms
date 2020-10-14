/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.core.models

import de.thkoeln.colab.roomsserver.acl.AclAction

interface AclEntryModel {
    val contextId: Long
    val contextClass: String
    val targetId: Long?
    val targetClass: String
    val action: AclAction
}