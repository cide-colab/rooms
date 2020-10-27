/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties("rooms.roles")
class RoleConfiguration {
    var admin: String = ""
    var user: String = ""
    var owner: String = ""
    var guest: String = ""
}