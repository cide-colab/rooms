/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import org.dom4j.tree.AbstractEntity
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.core.annotation.HandleAfterCreate
import org.springframework.data.rest.core.annotation.RepositoryEventHandler

@RepositoryEventHandler(AbstractEntity::class)
class AclObjectIdentityHandler @Autowired constructor(
        private val aclService: AclService
) {

    private var logger = LoggerFactory.getLogger(AclObjectIdentityHandler::class.java)

    @HandleAfterCreate
    fun handleAuthorAfterCreate(entity: AbstractEntity) {
        logger.info("Creating ObjectIdentity for Entity $entity")
        aclService.createOrUpdateObjectIdentityByTargetObject(entity)
    }
}