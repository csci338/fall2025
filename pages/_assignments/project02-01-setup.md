---
title: "Setup & Git"
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


## 1. Create Project Structure

Create the following folder structure:

```sh
project02-fall2025
├── database/
├── backend/
│   └── models/
└── ui/
    └── src/
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your folder structure matches the above.

### 1.1. Initialize Git Repository
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

### 1.3. Set Up GitHub Repository

If you're using GitHub (recommended), set it up now so you can push your code as you work:

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Choose a repository name (e.g., `project02-fall2025`)
   - **Important:** Do NOT initialize with a README, .gitignore, or license
   - Click "Create repository"

2. **Connect your local repository to GitHub:**

```bash
# Make your initial commit first
git add .
git commit -m "Initial project setup with folder structure and .gitignore"

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

### 1.4. Git Workflow Basics

Throughout development, you should commit your code regularly. Use this workflow for regular commits:

#### Regular Commits

Commit after completing each major section:

```bash
git add .
git commit -m "Meaningful message"
git push
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Make sure you understand the Git workflow for committing and pushing code regularly throughout development.

