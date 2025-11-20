---
title: "Cloud Deployment"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---



## Production Dockerfile

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



## Create Railway Account and Project

1. **Sign up for Railway:**
   - Go to https://railway.app
   - Sign up with your GitHub account (recommended) or email
   - Railway offers a free tier with $5/month credit

2. **Create a new project:**
   - Click "New Project" in the Railway dashboard
   - Select "Deploy from GitHub repo"
   - Choose your `project02-fall2025` repository
   - Railway will create a new project for you

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify you have a Railway account and project connected to your GitHub repository.

## Create PostgreSQL Database

1. **Add a PostgreSQL service:**
   - In your Railway project dashboard, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically create a PostgreSQL database

2. **Get the database connection string:**
   - Click on the PostgreSQL service you just created
   - Go to the "Variables" tab
   - Find the `DATABASE_URL` variable (Railway creates this automatically)
   - Copy the connection string - it will look like:
     ```
     postgresql://postgres:password@hostname.railway.app:5432/railway
     ```
   - **Important:** Note that Railway uses `postgresql://` (not `postgresql+asyncpg://`). You'll need to modify this for SQLAlchemy.

3. **Convert the connection string for SQLAlchemy:**
   - Railway's `DATABASE_URL` uses the format: `postgresql://...`
   - SQLAlchemy with asyncpg needs: `postgresql+asyncpg://...`
   - Replace `postgresql://` with `postgresql+asyncpg://` in your connection string
   - Example:
     ```
     Original: postgresql://postgres:password@hostname.railway.app:5432/railway
     Modified: postgresql+asyncpg://postgres:password@hostname.railway.app:5432/railway
     ```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify you have:
> - A PostgreSQL database created in Railway
> - The `DATABASE_URL` connection string copied
> - The connection string modified to use `postgresql+asyncpg://`

## Deploy Your Application

1. **Add your application service:**
   - In your Railway project dashboard, click "+ New"
   - Select "GitHub Repo" → choose your repository
   - Railway will detect your `Dockerfile.prod` automatically

2. **Configure the service:**
   - Railway should automatically detect `Dockerfile.prod` in the root directory
   - If not, go to Settings → General → Root Directory (leave blank if Dockerfile is in root)
   - Go to Settings → Deploy → Dockerfile Path: `Dockerfile.prod`

3. **Set environment variables:**
   - Go to the "Variables" tab in your application service
   - Add the `DATABASE_URL` variable:
     - Click "+ New Variable"
     - Name: `DATABASE_URL`
     - Value: Your modified connection string (with `postgresql+asyncpg://`)
     - Click "Add"
   - **Important:** Use the modified connection string (with `+asyncpg`) here

4. **Link the database:**
   - Railway can automatically link services
   - In your application service, go to the "Variables" tab
   - You should see a "Reference Variable" option
   - Reference the PostgreSQL service's `DATABASE_URL`
   - **But remember:** You still need to modify it to use `postgresql+asyncpg://`

5. **Deploy:**
   - Railway will automatically deploy when you push to your main branch
   - Or click "Deploy" in the dashboard to trigger a manual deployment
   - Watch the build logs to see the deployment progress

6. **Get your application URL:**
   - Once deployed, Railway will provide a public URL
   - Go to Settings → Networking → Generate Domain
   - Your app will be available at: `https://your-app-name.up.railway.app`

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your application is:
> - Deployed on Railway
> - Connected to the PostgreSQL database
> - Accessible via a public URL
> - Test it by visiting your Railway URL

## Update Frontend API URL (If Needed)

If your frontend needs to connect to the deployed backend:

1. **Set the API URL:**
   - In your Railway application service, go to Variables
   - Add: `VITE_API_URL` = `https://your-app-name.up.railway.app`
   - Or update your frontend code to use the Railway URL instead of `localhost:8000`

2. **Rebuild and redeploy:**
   - Railway will automatically rebuild when you push changes
   - Or trigger a manual redeploy from the dashboard

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your full-stack application is:
> - Fully deployed and accessible online
> - Frontend connecting to the deployed backend
> - Database operations working correctly

## Verify Deployment

Test your deployed application:

1. **Visit your Railway URL:**
   - Open `https://your-app-name.up.railway.app` in your browser
   - Your application should load

2. **Test API endpoints:**
   - Visit `https://your-app-name.up.railway.app/docs` to see the FastAPI documentation
   - Test the `/todos` endpoint to verify database connectivity

3. **Test CRUD operations:**
   - Create a new todo
   - Read todos
   - Update a todo
   - Delete a todo
   - Verify all operations work correctly

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your deployed application:
> - Loads correctly in the browser
> - Has working API endpoints
> - Successfully performs all CRUD operations
> - Is accessible from any device with internet access

---

[← Back to Project 2 Instructions](project02)