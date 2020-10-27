/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.extensions

import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.server.core.EmbeddedWrappers

fun <T : Any> CollectionModel<T>.fixEmbedded(clazz: Class<T>): CollectionModel<out Any> = when {
    content.isEmpty() -> CollectionModel(listOf(EmbeddedWrappers(false).emptyCollectionOf(clazz))).apply { add(this@fixEmbedded.links) }
    else -> this
}