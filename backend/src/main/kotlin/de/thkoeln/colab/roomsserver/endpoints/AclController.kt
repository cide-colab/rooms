/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.endpoints

import de.thkoeln.colab.roomsserver.acl.AclService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.web.bind.annotation.RequestMapping

@RepositoryRestController
@RequestMapping("permissions")
class AclController @Autowired constructor(private val aclService: AclService) {

}