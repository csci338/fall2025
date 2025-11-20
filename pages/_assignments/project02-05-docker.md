---
title: "Docker Configuration"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---
## 5. Docker Configuration

This section covers both development and production Docker configurations.

### Step 5.1: Create docker-compose.yaml

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

### Step 5.2: Create .env File (Optional)

Create `.env` in the root directory (optional, for local development):

```env
# Optional: Override DATABASE_URL to use external database
# DATABASE_URL=postgresql+asyncpg://user:password@host:port/database
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Test your Docker setup:
>
> ```bash
> docker-compose up --build
> ```

You should be able to access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Step 5.3: Create Production Dockerfile

Create `Dockerfile.prod` in the root directory:

```dockerfile
# Combined Production Dockerfile for Railway
# Builds both frontend and backend, serves them together

# Stage 1: Build Frontend
FROM node:20-slim as frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY ui/package.json ./

# Install dependencies
RUN npm install --production=false && \
    npm install @rollup/rollup-linux-x64-gnu --save-optional || true

# Copy frontend source code
COPY ui/ ./

# Build the React app
RUN npm run build

# Stage 2: Build Backend Dependencies
FROM python:3.11-slim as backend-builder

WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry

# Configure Poetry
RUN poetry config virtualenvs.create false

# Copy backend dependency files
COPY backend/pyproject.toml backend/poetry.lock* ./

# Install dependencies (production only)
RUN poetry install --no-interaction --no-ansi --only=main --no-root

# Stage 3: Final Runtime Image
FROM python:3.11-slim

WORKDIR /app

# Copy installed Python packages and binaries from builder
COPY --from=backend-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend-builder /usr/local/bin /usr/local/bin

# Copy backend application code
COPY backend/ ./backend/

# Copy built frontend from frontend-builder to /app/static
COPY --from=frontend-builder /app/frontend/dist ./static

# Create non-root user for security
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app

USER appuser

# Expose port (Railway sets PORT automatically)
EXPOSE 8000

# Use PORT environment variable if set, otherwise default to 8000
ENV PORT=8000

# Change to backend directory and run server
WORKDIR /app/backend
CMD sh -c "uvicorn server:app --host 0.0.0.0 --port \${PORT:-8000}"
```

**Important Notes:**
- This is a multi-stage build that combines frontend and backend
- The frontend is built and served as static files by the backend
- Make sure your `server.py` has code to serve static files in production

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your production Dockerfile is in the root directory.

