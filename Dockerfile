FROM node:20.9.0 AS frontend-builder
COPY . /app
WORKDIR /app/frontend
RUN npm install
RUN npm run build
RUN ls /app/src/main/resources/static

FROM maven:3.9.9-eclipse-temurin-23 AS final
COPY . /app
WORKDIR /app
COPY --from=frontend-builder /app/src/main/resources/static /app/src/main/resources/static
RUN mvn dependency:go-offline -B
RUN mvn package -DskipTests
CMD ["java", "-jar", "target/studio1way-0.0.1-SNAPSHOT.jar"]