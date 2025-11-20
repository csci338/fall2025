---
title: "Setup & Git"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
h_max: 3
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---


## 1. Create Project Structure

Create the following folder structure:

```sh
project02-fall2025
├── backend/
│   └── models/
├── database/
└── ui/
    └── src/
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your folder structure matches the above.

## 2. Initialize Git Repository
Initialize a git repo at the root of your `project02-fall2025` folder:

```bash
git init
```

Create a `.gitignore` file in the root directory with the following content:

```sh
# Python
__pycache__/

.Python
.env
.venv
venv/
ENV/
env/

# Node
node_modules/
dist/
build/


# OS
.DS_Store
Thumbs.db

# Docker
*.log
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your `.gitignore` file exists and contains the above patterns.

## 3. Create README.md

Create a `README.md` file in the root directory with basic project information:

```markdown
# Project 2: Full-Stack TODO Application

A full-stack web application built with FastAPI (backend), React (frontend), and PostgreSQL (database).

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, PostgreSQL
- **Frontend:** React, Vite
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Project Structure


project02-fall2025/
├── backend/      # FastAPI application
├── database/     # Database Dockerfile
└── ui/           # React application


## Getting Started

### Prerequisites

- Docker Desktop installed and running

### Running the Application

1. Clone this repository
2. Create a `.env` file in the root directory (see project documentation) with your database connection string.
3. Run `docker-compose up -d` to start all services
4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development

See the project documentation for detailed setup and development instructions.
```

**What this does:**
- Provides an overview of your project
- Documents the tech stack
- Shows the project structure
- Includes basic getting started instructions
- Makes your repository more professional and easier to understand

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> * Verify your `README.md` file exists in the root directory with the basic content above.
> * Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2025
> ├── .git/
> ├── .gitignore    # new
> ├── backend/
> │   └── models/
> ├── database/
> ├── README.md      # new
> └── ui/
>     └── src/
> ```

## 4. Set Up GitHub Repository

If you're using GitHub (recommended), set it up now so you can push your code as you work:

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Choose a repository name (e.g., `project02-fall2025`)
   - Make it private and add `svanwart` as a collaborator
   - Click "Create repository"

2. **Connect your local repository to GitHub:**

```bash
# Make your initial commit first
git add .
git commit -m "Initial project setup with folder structure, .gitignore, and README"

# Connect to GitHub using SSH (replace with your actual repository URL)
# On GitHub, click the green "Code" button and copy the SSH URL (starts with git@github.com)
git remote add origin git@github.com:yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

**Note:** Make sure you have SSH keys set up with GitHub. If you haven't done this yet, follow the instructions from Lab 2 to set up SSH key authentication.

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your local repository is connected to GitHub and your initial commit is pushed.

## 5. Git Workflow Basics

Throughout development, you should commit your code regularly. Use this workflow for regular commits:

```bash
git status   # what has changed?
git add .
git commit -m "Meaningful message"
git push
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Make sure you understand the Git workflow for committing and pushing code regularly throughout development.

---

[← Back to Project 2 Instructions](project02)