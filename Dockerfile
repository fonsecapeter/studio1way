# Build
FROM maven:3.9.9-eclipse-temurin-23 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn dependency:go-offline -B
RUN mvn package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/studio1way-0.0.1-SNAPSHOT.jar"]
