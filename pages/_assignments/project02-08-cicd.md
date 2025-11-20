---
title: "Continuous Integration on GitHub"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---

## What is GitHub Actions?

**GitHub Actions** is a CI/CD (Continuous Integration/Continuous Deployment) platform built into GitHub. It allows you to automate tasks whenever you push code to your repository.

**What is CI/CD?**
- **CI (Continuous Integration)** - Automatically test and check your code when you push changes
- **CD (Continuous Deployment)** - Automatically deploy your application when tests pass

**Why use GitHub Actions?**
- **Catch errors early** - Find code quality issues before they become problems
- **Automated testing** - Run your linters and formatters automatically
- **Consistent checks** - Everyone's code is checked the same way
- **Professional workflow** - Industry standard for software development

**How it works:**
1. You push code to GitHub
2. GitHub Actions automatically runs your workflow
3. The workflow checks your code quality (linting, formatting)
4. You get immediate feedback on whether your code passes or fails

**For this project:**
We'll set up a workflow that automatically checks your code quality (formatting and linting) every time you push code. This ensures your code meets quality standards before it's merged.

## 1. Create GitHub Actions Workflow

### 1.1. Create Workflow Directory

Create the necessary directory structure:

```bash
mkdir -p .github/workflows
```

### 1.2. Create Workflow File

Create `.github/workflows/pr.yml` with the following content:

```yaml
name: Pull Request Check

on:
  push:
    branches:
      - "*"

jobs:
  backend-check:
    name: Backend Code Quality
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install poetry
        run: |
          pip install poetry

      - name: Install python dependencies (in pyproject.toml)
        run: |
          poetry install

      - name: Check code quality using black, isort, and flake8
        run: |
          echo 'Running flake8...'
          poetry run flake8

          echo 'Running isort...'
          poetry run isort . --check-only   # run the Python import sorter

          echo 'Running black...'
          poetry run black . --check        # runs the Python formatter

          echo '✨✨✨✨✨ Backend checks completed ✨✨✨✨✨'

  frontend-check:
    name: Frontend Code Quality
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./ui

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: ui/package-lock.json

      - name: Install npm dependencies
        run: |
          npm ci

      - name: Run format and lint checks
        run: |
          npm run check

      - name: Completed checks
        run: |
          echo '✨✨✨✨✨ Frontend checks completed ✨✨✨✨✨'
```

**What this does:**
- Runs automatically on every push to any branch
- Checks backend code quality (flake8, isort, black)
- Checks frontend code quality (Prettier, ESLint)
- Fails if code doesn't meet quality standards

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your `.github/workflows/pr.yml` file exists.

## 2. Commit and Push Your Workflow

Before testing, commit and push your workflow file to GitHub:

```bash
git add .github/
git commit -m "Add GitHub Actions workflow for code quality checks"
git push
```

**Why commit now?**
- GitHub Actions only runs on code that's been pushed to GitHub
- You need to push the workflow file itself before it can run
- This ensures the workflow is part of your repository

## 3. Test GitHub Actions

1. **Verify it runs:**

   - Go to your GitHub repository
   - Click on the "Actions" tab
   - You should see a workflow run in progress
   - Wait for it to complete (should show green checkmarks if everything passes)

3. **If it fails:**
   - Click on the failed workflow
   - Review the error messages
   - Fix the issues locally
   - Commit and push again

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your GitHub Actions workflow runs successfully on push.

## 4. Understanding Workflow Results

**Green checkmark (✓):** All checks passed! Your code meets quality standards.

**Red X (✗):** Some checks failed. Common reasons:
- Code formatting issues (run `black .` and `isort .` in backend)
- Linting errors (fix ESLint errors in frontend)
- Missing dependencies (verify `pyproject.toml` and `package.json`)

**How to fix failures:**
1. Read the error message in the Actions tab
2. Fix the issue locally
3. Test locally (run the same commands that failed)
4. Commit and push again

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Make sure you understand how to read and fix workflow results.
>
> **Backend**:
>
> ```bash
> # Run all checks (doesn't modify files)
> docker exec -it todo_backend bash scripts/check.sh
> 
> # Automatically fix formatting issues
> docker exec -it todo_backend bash scripts/fix.sh
> ```
>
> **Frontend**:
>
> ```bash
> # Check for linting and formatting issues
> docker exec -it todo_frontend npm run check
> 
> # Automatically fix linting and formatting issues
> docker exec -it todo_frontend npm run fix
> ```
> 
> Then, stage, commit, push and try again!

---

[← Back to Project 2 Instructions](project02)