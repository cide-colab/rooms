#FROM openjdk:8-jdk-alpine
#MAINTAINER th-koeln.de
#VOLUME /tmp
#EXPOSE 8080
#ARG JAR_FILE
#COPY ${JAR_FILE} /roomsbackend.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/roomsbackend.jar"]

FROM openjdk:8-jdk-alpine
MAINTAINER Florian Herborn florian.herborn@th-koeln.de
VOLUME /tmp
EXPOSE 8080
ADD build/libs/rooms-backend-0.0.1-SNAPSHOT.jar server.jar
#RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/server.jar"]

#FROM adoptopenjdk:11-jre-hotspot as builder
#WORKDIR application
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} application.jar
#RUN java -Djarmode=layertools -jar application.jar extract
#
#FROM adoptopenjdk:11-jre-hotspot
#WORKDIR application
#COPY --from=builder application/dependencies/ ./
#COPY --from=builder application/spring-boot-loader/ ./
#COPY --from=builder application/snapshot-dependencies/ ./
#COPY --from=builder application/application/ ./
#ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]