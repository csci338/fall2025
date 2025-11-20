---
title: "Database"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
h_max: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---

## 1. Introduction

We are now going to start building our Docker containers. This project uses a **three-container architecture** where each service runs in its own isolated container:

1. **Database Container** - PostgreSQL database for storing application data
2. **Backend Container** - FastAPI server that handles API requests and communicates with the database
3. **Frontend Container** - React application that provides the user interface

**Why three containers?**
- **Separation of concerns** - Each service has its own environment and dependencies
- **Scalability** - You can scale each service independently
- **Isolation** - Problems in one container don't affect the others
- **Development** - Each service can be developed and tested independently

The containers communicate with each other through Docker's internal networking, which we'll configure in the `docker-compose.yaml` file.

**Architecture Diagram:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Laptop                              │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   Browser    │────────▶│  Frontend    │                  │
│  │              │  :5173  │  Container   │                  │
│  │ localhost    │◀────────│  (React)     │                  │
│  └──────────────┘         └──────┬───────┘                  │
│                                  │                          │
│                                  │ HTTP Requests            │
│                                  │ (localhost:8000)         │
│                                  ▼                          │
│                          ┌──────────────┐                   │
│                          │   Backend    │                   │
│                          │  Container   │                   │
│                          │  (FastAPI)   │                   │
│                          └──────┬───────┘                   │
│                                  │                          │
│                                  │ SQL Queries              │
│                                  │ (internal Docker network)│
│                                  ▼                          │
│                          ┌──────────────┐                   │
│                          │  Database    │                   │
│                          │  Container   │                   │
│                          │ (PostgreSQL) │                   │
│                          └──────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Port Mappings:
- Frontend:  localhost:5173  ←→  Container:5173
- Backend:   localhost:8000  ←→  Container:8000
- Database:  localhost:5433  ←→  Container:5432 (internal only)
```

**How it works:**
- Your **browser** connects to the frontend container on port 5173
- The **frontend** makes HTTP requests to the backend on port 8000
- The **backend** communicates with the database using Docker's internal network
- All three containers run simultaneously on your laptop via Docker

## 2. Create a New Branch

Before you begin, create a new Git branch for this work:

```bash
git checkout -b system-setup
```

**Why create a branch?**
- Keeps your work organized
- Allows you to experiment without affecting the main branch
- Makes it easier to review changes before merging

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify that you're on your new branch -- not main.

## 3. Create Database Dockerfile

Create `database/Dockerfile` with the following **exact** content:

```dockerfile
FROM postgres:15
ENV POSTGRES_PASSWORD=postgres
```

**Why this works:**
- Uses PostgreSQL 15 (stable version)
- Sets default password for development
- PostgreSQL will create databases as needed

## 4. Create .env File

Create a `.env` file at the root of your project with the following content:

```sh
# Local Docker DB connection string:
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/todo_db
```

**Why this matters:**
- The `.env` file stores environment variables for local development that are likely to change when you deploy your server to production.
- For now, our `.env` will only store our database connection string (top secret), but we can also add additional variables to this as needed (e.g., API keys, configurationg settings, etc.)
- This connection string points to the PostgreSQL database that will be running on Docker once you build your docker container.
- The format `postgresql+asyncpg://` is required for SQLAlchemy with asyncpg
- The `@db:5432` hostname refers to the database service name in `docker-compose.yaml`




{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> * Verify your `.env` file exists at the project root and contains the DATABASE_URL.
> * Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2025
> ├── .env            # new (and excluded from version control via .gitignore)
> ├── .git/
> ├── .gitignore
> ├── backend/
> │   └── models/
> ├── database/
> │   └── Dockerfile  # new
> ├── README.md
> └── ui/
>     └── src/
> ```

## 5. Push your new branch
Go ahead and push your new branch to GitHub. 

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify that your new branch is on GitHub.
> Don't worry about making a PR or merging anything yet. We'll address that later.

---

[← Back to Project 2 Instructions](project02)