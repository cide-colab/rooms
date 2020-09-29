package de.thkoeln.colab.roomsserver.controllers

import de.thkoeln.colab.roomsserver.repositories.DepartmentRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

//@RepositoryRestController
//@RequestMapping("departments")
//class DepartmentController @Autowired constructor(
//        private val departmentRepo: DepartmentRepo
//) {
//
//    @GetMapping
//    fun getAll() =
//
//
//}