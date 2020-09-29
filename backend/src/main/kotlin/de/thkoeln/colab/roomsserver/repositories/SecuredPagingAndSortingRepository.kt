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
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize

@NoRepositoryBean
interface SecuredPagingAndSortingRepository<T, ID> : Repository<T, ID> {

    @PreAuthorize("hasPermission(#entity, 'CREATE')")
    fun <S : T> save(entity: S): S

    @PostFilter("hasPermission(filterObject, 'READ')")
    fun findAll(): List<T>

//    @PreFilter("hasPermission(#entities, 'DELETE')")
//    fun deleteAll(entities: Iterable<T>)
//
//    @PreFilter("hasPermission(#entities, 'DELETE')")
//    fun deleteAll(vararg entities: T)

//    @PreFilter("hasPermission(#entities, 'CREATE')")
//    fun <S : T> saveAll(entities: Iterable<S>): List<S>
//
//    @PreFilter("hasPermission(#entities, 'CREATE')")
//    fun <S : T> saveAll(vararg entities: S): List<S>

    // TODO Secure
    fun count(): Long

    @PostFilter("hasPermission(filterObject, 'READ')")
    fun findAllByIdIn(ids: Iterable<ID>): List<T>

    // TODO Secure
    fun existsById(id: ID): Boolean

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    fun findById(id: ID): T?

    @PreAuthorize("hasPermission(#entity, 'DELETE')")
    fun delete(entity: T)

    @PostFilter("hasPermission(filterObject, 'READ')")
    fun findAll(sort: Sort): List<T>

    @PostFilter("hasPermission(filterObject, 'READ')")
    fun <S : T> findAll(example: Example<S>): List<S>

    @PostFilter("hasPermission(filterObject, 'READ')")
    fun <S : T> findAll(example: Example<S>, sort: Sort): List<S>

    // TODO Secure
    fun <S : T> count(example: Example<S>): Long

    @PostAuthorize("hasPermission(returnObject, 'READ')")
    fun <S : T> findOne(example: Example<S>): S?

    // TODO Secure
    fun <S : T> exists(example: Example<S>): Boolean
}