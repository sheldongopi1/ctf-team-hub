# One image with both parts: Spring Boot serves the API and the built Angular app.

# ---- Frontend: build the Angular app ----
FROM node:24-alpine AS frontend
WORKDIR /frontend
# package files first, so npm ci stays cached until the dependencies change
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npx ng build

# ---- Backend: build the jar, with the Angular build as static files ----
FROM maven:3.9-eclipse-temurin-25 AS backend
WORKDIR /backend
COPY backend/pom.xml ./
RUN mvn -q -B dependency:go-offline
COPY backend/src ./src
# Spring Boot serves everything in resources/static at the root (/)
COPY --from=frontend /frontend/dist/frontend/browser/ ./src/main/resources/static/
RUN mvn -q -B -DskipTests package

# ---- Run: only a JRE and the jar, as a normal user ----
FROM eclipse-temurin:25-jre
WORKDIR /app
RUN groupadd --gid 10001 app && useradd --uid 10001 --gid app --no-create-home --shell /usr/sbin/nologin app
COPY --from=backend /backend/target/ctf-team-hub-api-*.jar app.jar
USER app
# AWS App Runner (and most hosts) expect the app on 8080 inside the container
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
