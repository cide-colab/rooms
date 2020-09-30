/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.repositories

import org.springframework.data.domain.Example
import org.springframework.data.domain.Sort
import org.springframework.data.repository.NoRepositoryBean
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import kotlin.math.exp

@NoRepositoryBean
interface KRepository<T, ID>: Repository<T, ID> {
    fun <S : T> save(entity: S): S
    fun <S : T> saveAndFlush(entity: S): S
    fun findAll(): List<T>
//    fun deleteAll(entities: Iterable<T>)
//    fun deleteAll(vararg entities: T)
//    fun <S : T> saveAll(entities: Iterable<S>): List<S>
//    fun <S : T> saveAll(vararg entities: S): List<S>
    fun count(): Long
    fun findAllByIdIn(ids: Iterable<ID>): List<T>
    fun existsById(id: ID): Boolean
    fun findById(id: ID): T?
    fun delete(entity: T)
    fun findAll(sort: Sort): List<T>
    fun <S : T> findAll(example: Example<S>): List<S>
    fun <S : T> findAll(example: Example<S>, sort: Sort): List<S>
    fun <S : T> count(example: Example<S>): Long
    fun <S : T> findOne(example: Example<S>): S?
    fun <S : T> exists(example: Example<S>): Boolean
}

@NoRepositoryBean
interface SecuredRepository<T, ID> : KRepository<T, ID> {

    @PreAuthorize("hasPermission(#entity, 'CREATE')")
    override fun <S : T> save(entity: S): S

    @PreAuthorize("hasPermission(#entity, 'CREATE')")
    override fun <S : T> saveAndFlush(entity: S): S

    @PostFilter("hasPermission(filterObject, 'READ')")
    override fun findAll(): List<T>

    // TODO Secure
    override fun count(): Long

    @PostFilter("hasPermission(filterObject, 'READ')")
    override fun findAllByIdIn(ids: Iterable<ID>): List<T>

    // TODO Secure
    override fun existsById(id: ID): Boolean

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    override fun findById(id: ID): T?

    @PreAuthorize("hasPermission(#entity, 'DELETE')")
    override fun delete(entity: T)

    @PostFilter("hasPermission(filterObject, 'READ')")
    override fun findAll(sort: Sort): List<T>

    @PostFilter("hasPermission(filterObject, 'READ')")
    override fun <S : T> findAll(example: Example<S>): List<S>

    @PostFilter("hasPermission(filterObject, 'READ')")
    override fun <S : T> findAll(example: Example<S>, sort: Sort): List<S>

    // TODO Secure
    override fun <S : T> count(example: Example<S>): Long

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    override fun <S : T> findOne(example: Example<S>): S?

    // TODO Secure
    override fun <S : T> exists(example: Example<S>): Boolean
}