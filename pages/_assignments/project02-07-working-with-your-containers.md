---
title: "Working with Your Containers"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---
When working with Docker containers, it can be confusing to know whether you should run a command on your **host computer** (your laptop) or inside a **Docker container**. This guide will help clarify when to use each.

## Your Host Computer

**Run commands on your host computer when:**
- You're **editing files** (code, configuration, etc.)
- You're **creating or deleting files**
- You're using **Git** (commits, pushes, branches)
- You're **viewing files** in your file explorer or editor

I recommend navigating to `project02-fall2025` on your terminal and typing `code .` to edit your code files on your laptop (host machine).

## Your Containers
**Run commands inside containers when:**
- You need to **install packages** (npm, poetry, pip)
- You're **running tools** that require the container's environment (linters, formatters, database clients)
- You're **executing code** that needs container-specific dependencies
- You're **querying the database** directly

**Why this matters:**
- Your host computer may not have Node.js, Python, or PostgreSQL installed
- Containers have isolated environments with all the dependencies pre-installed
- File changes on your host are automatically reflected in containers (via volume mounts)
- But package installations and tool execution must happen inside the container where those tools exist


### 1. Always install new packages on the correct container:

**Frontend (Node.js packages):**
```bash
# Install a new npm package (e.g., antd)
docker exec -it todo_frontend npm install antd

# Or if you've updated package.json, reinstall all dependencies
docker exec -it todo_frontend npm install
```

**Backend (Python packages):**
```bash
# Add a new package to pyproject.toml first, then install
docker exec -it todo_backend poetry add package-name

# Or if you've updated pyproject.toml, reinstall all dependencies
docker exec -it todo_backend poetry install
```

### 2. Always run the linters on the correct container:

**Frontend (ESLint and Prettier):**
```bash
# Check for linting and formatting issues
docker exec -it todo_frontend npm run check

# Automatically fix linting and formatting issues
docker exec -it todo_frontend npm run fix
```

**Backend (Black, isort, flake8):**
```bash
# Run all checks (doesn't modify files)
docker exec -it todo_backend bash scripts/check.sh

# Automatically fix formatting issues
docker exec -it todo_backend bash scripts/fix.sh
```

### 3. Query your database

**Connect to PostgreSQL:**
```bash
# Connect to the database container
docker exec -it todo_db psql -U postgres -d todo_db

# Once connected, you can run SQL queries:
# SELECT * FROM todos;
# \dt  (list all tables)
# \q   (quit)
```

**Run a single SQL query without entering interactive mode:**
```bash
docker exec -it todo_db psql -U postgres -d todo_db -c "SELECT * FROM todos;"
```

---

[← Back to Project 2 Instructions](project02)
