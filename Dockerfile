FROM node:20.9.0 AS frontend-builder
ARG API_URL_ARL
ENV API_URL=${API_URL}
COPY . /app
WORKDIR /app/frontend
RUN npm install
RUN npm run build

FROM  eclipse-temurin:21-jdk AS dev
COPY . /app
WORKDIR /app
RUN ./mvnw dependency:go-offline -B
RUN ./mvnw package

FROM eclipse-temurin:21-jdk AS builder
COPY . /app
WORKDIR /app
COPY --from=frontend-builder /app/src/main/resources/static /app/src/main/resources/static
RUN ./mvnw dependency:go-offline -B
RUN ./mvnw clean package -DskipTests

FROM  eclipse-temurin:21-jre AS prod
COPY . /app
WORKDIR /app
COPY --from=builder /root/.m2/repository /root/.m2/repository
COPY --from=builder /app/target /app/target
RUN useradd -m appuser
RUN chown -R appuser:appuser /app
USER appuser
CMD ["java", "-jar", "target/studio1way-0.0.1-SNAPSHOT.jar"]
