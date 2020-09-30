/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.core.event.AbstractRepositoryEventListener
import org.springframework.stereotype.Component

@Component
class AclObjectIdentityHandler @Autowired constructor(private val aclService: AclService): AbstractRepositoryEventListener<Any>() {

    private var logger = LoggerFactory.getLogger(AclObjectIdentityHandler::class.java)

    override fun onAfterCreate(entity: Any) {
        logger.debug("Creating ObjectIdentity for Entity $entity")
        aclService.createOrUpdateObjectIdentityByTargetObject(entity)
    }

    override fun onAfterDelete(entity: Any) {
        logger.debug("Deleting ObjectIdentity for Entity $entity")
        aclService.deleteObjectIdentityByTargetObject(entity)
    }
}