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

## 1. Create Database Dockerfile

Create `database/Dockerfile` with the following **exact** content:

```dockerfile
FROM postgres:15
ENV POSTGRES_PASSWORD=postgres
```

**Why this works:**
- Uses PostgreSQL 15 (stable version)
- Sets default password for development
- PostgreSQL will create databases as needed

## 2. Create .env File

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
> ├── database/
> │   └── Dockerfile  # new
> ├── backend/
> │   └── models/
> ├── ui/
> │   └── src/
> └── .env            # new (and excluded from version control via .gitignore)
> ```


