package de.thkoeln.colab.roomsserver

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class RoomsServerApplication

fun main(args: Array<String>) {
    SpringApplication.run(RoomsServerApplication::class.java, *args)
}