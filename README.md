# CTF Team Hub

A side project I'm building for fun, to learn Angular, Spring Boot and cloud deployment by making something I'd use myself. I like doing CTFs, so it's a hub for a CTF team: a board with every challenge, its category and points, who is on it, and the team score. Work in progress.

| Part | Stack |
|---|---|
| `backend/` | Java 25, Spring Boot 4 (REST API) |
| `frontend/` | Angular 22, TypeScript |

Planned:
- Team accounts, and claiming a challenge so two people don't work on the same one.
- Writeups per challenge, kept after the competition.
- Docker images, a CI/CD pipeline, and deployment to AWS and Kubernetes.

## Run locally

Needs Java 25, Node.js 24.15 or newer.

```sh
# API on http://localhost:8081
cd backend
./mvnw spring-boot:run

# Frontend on http://localhost:4200, forwards /api to the backend
cd frontend
npm install
npm start
```

The backend uses port 8081, so it can run next to other projects on 8080. Change it with the `PORT` environment variable.

## Run with Docker

One image holds both parts: Spring Boot serves the API and the built Angular app. It is a multi-stage build and runs as a non-root user.

```sh
docker build -t ctf-team-hub .
docker run --rm -p 8090:8080 ctf-team-hub   # open http://localhost:8090
```

## Tests

```sh
cd backend && ./mvnw test
cd frontend && npx ng test --watch=false
```
