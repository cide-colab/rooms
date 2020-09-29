package de.thkoeln.colab.roomsserver

//import springfox.documentation.builders.PathSelectors
//import springfox.documentation.builders.RequestHandlerSelectors
//import springfox.documentation.spi.DocumentationType
//import springfox.documentation.spring.web.plugins.Docket
//import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
//@EnableHypermediaSupport(type = [EnableHypermediaSupport.HypermediaType.HAL])
//@EnableSwagger2WebMvc
class RoomsServerApplication {

//    @Bean
//    fun api(): Docket =
//            Docket(DocumentationType.SWAGGER_2)
//                    .select()
//                    .apis(RequestHandlerSelectors.any())
//                    .paths(PathSelectors.any())
//                    .build()

}

fun main(args: Array<String>) {
    SpringApplication.run(RoomsServerApplication::class.java, *args)
}