---
title: "Docker Compose File + Build Your Containers"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---

## What is Docker Compose?

**Docker Compose** is a tool that lets you define and run multiple Docker containers together with a single configuration file. Instead of running each container separately with `docker run`, you can use `docker-compose up` to start all your services at once.

**Why use Docker Compose?**

{:.compact}
- **Orchestration** - Manages multiple containers (database, backend, frontend) as one application
- **Networking** - Automatically creates a network so containers can communicate
- **Dependencies** - Ensures services start in the correct order (e.g., database before backend)
- **Volume Management** - Handles data persistence and file mounting
- **Environment Variables** - Centralized configuration for all services

**Important: Docker Compose is for Development Only**
Docker Compose is **not used in production** environments. In production, each service typically runs in its own container on separate machines or cloud instances. The `docker-compose.yaml` file you create here is **only for local development** to make it easy to run your entire stack with one command

## Create docker-compose.yaml

Create `docker-compose.yaml` in the root directory:

```yaml
version: '3.8'

services:
  # PostgreSQL Database Service
  db:
    build:
      context: ./database
      dockerfile: Dockerfile
    container_name: todo_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: todo_db
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d todo_db"]
      interval: 2s
      timeout: 3s
      retries: 10
      start_period: 10s

  # FastAPI Backend Service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: todo_backend
    environment:
      DATABASE_URL: ${DATABASE_URL:-postgresql+asyncpg://postgres:postgres@db:5432/todo_db}
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./backend:/app
    command: poetry run uvicorn server:app --host 0.0.0.0 --port 8000 --reload

  # React Frontend Service
  frontend:
    build:
      context: ./ui
      dockerfile: Dockerfile
    container_name: todo_frontend
    ports:
      - "5173:5173"
    volumes:
      - ./ui:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000
    depends_on:
      - backend
    command: npm run dev -- --host 0.0.0.0

volumes:
  postgres_data:
```

## Build and Start Your Containers

Now that you've created your `docker-compose.yaml` file, you can build and start all your containers in detached mode (so that your Terminal isn't tied up):

Make sure that Docker Desktop is running. Then, issue the following command:

```bash
# From the root of your project (where docker-compose.yaml is located)
docker-compose up -d
```

**What you should see:**


- Database container starting and becoming healthy
- Backend container starting and connecting to the database
- Frontend container starting and running Vite dev server
- All services running and accessible:
  - Frontend: <a href="http://localhost:5173" target="_blank">http://localhost:5173</a>
  - Backend API: <a href="http://localhost:8000" target="_blank">http://localhost:8000</a>
  - Backend Docs: <a href="http://localhost:8000/docs" target="_blank">http://localhost:8000/docs</a>

### Verify your backend endpoints
Test all endpoints from the command line:

```bash
# Make sure Docker is running (docker-compose up)
# The server should already be running at http://localhost:8000

# Test GET all
curl http://localhost:8000/todos

# Test POST
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test todo"}'

# Test GET one (use ID from POST response)
curl http://localhost:8000/todos/1

# Test PATCH
curl -X PATCH http://localhost:8000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated", "completed": true}'

# Test DELETE
curl -X DELETE http://localhost:8000/todos/1

# View API documentation
# Open http://localhost:8000/docs in your browser
```


{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify that all three containers are running:
> - Check that you can access http://localhost:5173 (frontend)
> - Check that you can access http://localhost:8000/docs (backend API documentation)
> - Verify your containers are running with: `docker ps`


## Commit and Push
Go ahead and commit / push your changes to git / GitHub. 

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify that all your new code is on GitHub.

---

[← Back to Project 2 Instructions](project02)