---
title: "CI/CD Pipeline"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---
## 6. CI/CD Pipeline

### Step 6.1: Create GitHub Actions Workflow

GitHub Actions will automatically check your code quality when you push changes. This helps catch issues early.

#### Step 6.1.1: Create Workflow Directory

Create the necessary directory structure:

```bash
mkdir -p .github/workflows
```

#### Step 6.1.2: Create Workflow File

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

### Step 6.2: Test GitHub Actions

1. **Commit and push the workflow:**

```bash
git add .github/
git commit -m "Add GitHub Actions workflow for code quality checks"
git push
```

2. **Verify it runs:**
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

### Step 6.3: Understanding Workflow Results

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

