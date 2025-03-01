FROM node:20.9.0 AS frontend-builder
ARG API_URL_ARL
ENV API_URL=${API_URL}
COPY . /app
WORKDIR /app/frontend
RUN npm install
RUN npm run build
RUN ls /app/src/main/resources/static

FROM maven:3.9.9-eclipse-temurin-23 AS deps
COPY . /app
WORKDIR /app
RUN mvn dependency:go-offline -B

FROM maven:3.9.9-eclipse-temurin-23 AS builder
COPY . /app
WORKDIR /app
COPY --from=deps /root/.m2/repository /root/.m2/repository
RUN mvn package -DskipTests

FROM  maven:3.9.9-eclipse-temurin-23 AS final
COPY . /app
WORKDIR /app
COPY --from=frontend-builder /app/src/main/resources/static /app/src/main/resources/static
COPY --from=deps /root/.m2/repository /root/.m2/repository
COPY --from=builder /app/target /app/target
CMD ["java", "-jar", "target/studio1way-0.0.1-SNAPSHOT.jar"]