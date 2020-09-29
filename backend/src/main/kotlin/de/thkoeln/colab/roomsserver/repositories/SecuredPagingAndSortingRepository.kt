package de.thkoeln.colab.roomsserver.repositories

import org.springframework.data.domain.Example
import org.springframework.data.domain.Sort
import org.springframework.data.repository.NoRepositoryBean
import org.springframework.data.repository.Repository
import org.springframework.security.access.prepost.PostAuthorize
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.access.prepost.PreFilter
import java.util.*

//ISSUE with Optionals https://github.com/spring-projects/spring-framework/issues/20433

//fun <T, ID> SecuredPagingAndSortingRepository<T, ID>.findByIdK(id: ID) = findById(id).orElseGet { null }
//fun <T, ID> SecuredPagingAndSortingRepository<T, ID>.findOneK(example: Example<T>) = findOne(example).orElseGet { null }

@NoRepositoryBean
interface SecuredPagingAndSortingRepository<T, ID>: Repository<T, ID> {

//    @PreAuthorize("hasPermission(#entity, 'CREATE') || hasPermission(#entity, 'ADMINISTRATION')")
    fun <S : T> save(entity: S): S

    @PostFilter("hasPermission(filterObject, 'READ') || hasPermission(filterObject, 'ADMINISTRATION')")
    fun findAll(): MutableIterable<T>

    @PreAuthorize("hasPermission(returnObject, 'DELETE') || hasPermission(returnObject, 'ADMINISTRATION')")
    fun deleteById(id: ID)

    @PreFilter("hasPermission(#entities, 'DELETE') || hasPermission(returnObject, 'ADMINISTRATION')")
    fun deleteAll(entities: MutableIterable<T>)

    @PreAuthorize("hasPermission(returnObject, 'DELETE') || hasPermission(returnObject, 'ADMINISTRATION')")
    fun deleteAll()

    @PreFilter("hasPermission(#entities, 'CREATE') || hasPermission(#entities, 'ADMINISTRATION')")
    fun <S : T> saveAll(entities: MutableIterable<S>): MutableIterable<S>

    // TODO Secure
    fun count(): Long

    @PostFilter("hasPermission(filterObject, 'READ') || hasPermission(filterObject, 'ADMINISTRATION')")
    fun findAllById(ids: MutableIterable<ID>): MutableIterable<T>

    @PostAuthorize("hasPermission(returnObject, 'READ') || hasPermission(returnObject, 'ADMINISTRATION')")
    fun existsById(id: ID): Boolean

    @PostAuthorize("hasPermission(returnObject, 'READ') || hasPermission(returnObject, 'ADMINISTRATION')")
    fun findById(id: ID): T?

    @PreAuthorize("hasPermission(returnObject, 'DELETE') || hasPermission(returnObject, 'ADMINISTRATION')")
    fun delete(entity: T)

    @PostFilter("hasPermission(filterObject, 'READ') || hasPermission(filterObject, 'ADMINISTRATION')")
    fun findAll(sort: Sort): MutableIterable<T>

    @PostFilter("hasPermission(filterObject, 'READ') || hasPermission(filterObject, 'ADMINISTRATION')")
    fun <S : T> findAll(example: Example<S>): MutableIterable<S>

    @PostFilter("hasPermission(filterObject, 'READ') || hasPermission(filterObject, 'ADMINISTRATION')")
    fun <S : T> findAll(example: Example<S>, sort: Sort): MutableIterable<S>

    // TODO Secure
    fun <S : T> count(example: Example<S>): Long

    @PostAuthorize("hasPermission(returnObject, 'READ') || hasPermission(returnObject, 'ADMINISTRATION')")
    fun <S : T> findOne(example: Example<S>): S?

    // TODO Secure
    fun <S : T> exists(example: Example<S>): Boolean
}