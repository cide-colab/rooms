/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.config

import de.thkoeln.colab.roomsserver.models.*
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer

@Configuration
class RepositoryConfig {
    @Bean
    fun repositoryRestConfigurer(): RepositoryRestConfigurer =
            object : RepositoryRestConfigurer {
                override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
                    config.exposeIdsFor(
                            Room::class.java,
                            Department::class.java,
                            User::class.java,
                            Reservation::class.java,
                            Abo::class.java
//                        Role::class.java
                    )
                }
            }
}