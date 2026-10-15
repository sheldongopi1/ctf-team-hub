# CTF Team Hub

Jira for CTFs. A side project I'm building for fun, to learn Angular, Spring Boot and cloud deployment by making something I'd use myself.

Every challenge in a CTF is a ticket on a board: open, in progress or solved, with its category, points and who is on it. The team score updates as tickets move to solved. Work in progress.

| Part | Stack |
|---|---|
| `backend/` | Java 25, Spring Boot 4 (REST API) |
| `frontend/` | Angular 22, TypeScript |

Planned:
- One board per CTF event, with start and end dates (imported from CTFtime).
- Claiming a ticket, so two people don't work on the same challenge.
- Notes and a writeup per ticket, kept after the competition.
- Team accounts.
- A CI/CD pipeline, and deployment to AWS and Kubernetes.

Inspired by [CTFNote](https://github.com/TFNS/CTFNote), the collaborative tool many CTF teams use. This is my own smaller take on the idea, written from scratch.

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
