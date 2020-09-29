package de.thkoeln.colab.roomsserver.repositories

import de.thkoeln.colab.roomsserver.models.Item
import org.springframework.data.domain.Example
import org.springframework.data.jpa.repository.support.SimpleJpaRepository
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.Repository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import java.util.*

interface ItemRepository: SecuredPagingAndSortingRepository<Item, Long> {
}
