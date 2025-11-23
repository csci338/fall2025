---
title: "Cloud Deployment"
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

{:.info}
> ## Video Walkthroughs
> 1. <a href="https://drive.google.com/file/d/1MmyV83eMFzVLnYDhGSQZn2ynRZYo1WYK/view?usp=drive_link" target="_blank">Introduction</a>
> 1. <a href="https://drive.google.com/file/d/1_X_hPsT97gRtj3-GskBUrNDQI6yxiVRY/view?usp=drive_link" target="_blank">Code Modifications + Production Dockerfile</a>
> 1. <a href="https://drive.google.com/file/d/17wGhOXOghkXdeTwlzqdi634zgL2vMoab/view?usp=drive_link" target="_blank">Railway Deployment</a>
> 1. <a href="https://drive.google.com/file/d/1U00tHLq0D8uR08dpS24OEzJdre0H5zTR/view?usp=drive_link" target="_blank">CI / CD in Action</a>

## 1. Update Frontend API Configuration

Before creating the production Dockerfile, you need to update your `App.jsx` file to use an environment variable for the API URL. This allows your app to work in both development (localhost) and production (Railway).

Open `ui/src/App.jsx` and update the API URL configuration at the top of the file:

```javascript
// Use environment variable for API URL, default to localhost for development
// In production (Railway), this will be empty string since frontend and backend are same origin
// Check if VITE_API_URL is explicitly set (even if empty string), otherwise use localhost
const API_URL =
    import.meta.env.VITE_API_URL !== undefined
        ? import.meta.env.VITE_API_URL      // address for production architecture
        : 'http://localhost:8000';          // address for local architecture
```

**What this does:**
- In **development**, `VITE_API_URL` is not set, so it defaults to `http://localhost:8000`
- In **production**, the Dockerfile will set `VITE_API_URL` to an empty string (since frontend and backend are served from the same origin)
- When `VITE_API_URL` is empty, your API calls will use relative URLs (e.g., `/api/todos` instead of `http://localhost:8000/api/todos`)

**Important:** Make sure you're using `API_URL` in all your `fetch()` calls throughout your React components. For example:

```javascript
fetch(`${API_URL}/api/todos`)
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on
> Verify that:
> - Your `App.jsx` (or wherever you define your API URL) uses the environment variable
> - All your `fetch()` calls use the `API_URL` constant instead of hardcoded URLs

## 2. Create a Production Dockerfile

Create `Dockerfile.prod` in the root directory:

```dockerfile
# Combined Production Dockerfile for Railway
# Builds both frontend and backend, serves them together

# Stage 1: Build Frontend
FROM node:20-slim as frontend-builder

WORKDIR /app/frontend

# Accept VITE_API_URL as build argument (defaults to empty string for production)
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

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
EXPOSE 8080

# Use PORT environment variable if set, otherwise default to 8080
ENV PORT=8080

# Change to backend directory and run server
WORKDIR /app/backend
CMD sh -c "uvicorn server:app --host 0.0.0.0 --port \${PORT:-8080}"
```

**What this Dockerfile does:**

This Dockerfile uses a **multi-stage build** to create a single container that runs both your frontend and backend together. Here's what happens in simple terms:

**Stage 1: Build the Frontend**
- Starts with a Node.js image
- Installs all the frontend dependencies (React, Vite, etc.)
- Builds your React app into static files (HTML, CSS, JavaScript)
- The built files are saved in a `dist` folder

**Stage 2: Prepare the Backend**
- Starts with a Python image
- Installs Poetry and all your Python dependencies (FastAPI, SQLAlchemy, etc.)
- Gets everything ready to run your backend

**Stage 3: Combine Everything**
- Takes the built frontend files from Stage 1 and copies them into the final container
- Takes the backend code and Python packages from Stage 2 and copies them into the final container
- Creates a non-root user for security
- Sets up the container to run your FastAPI server, which will serve both:
  - Your backend API (at `/api/*` endpoints)
  - Your frontend static files (at the root `/`)

**The result:** One container that has everything your app needs to run in production. When Railway starts this container, it runs your FastAPI server, which handles both API requests and serves your React frontend.

**Important Notes:**
- This is a multi-stage build that combines frontend and backend
- The frontend is built and served as static files by the backend
- Make sure your `server.py` has code to serve static files in production

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your production Dockerfile is in the root directory.




## 3. Sign up for Railway
- Go to https://railway.app
- Sign up with your GitHub account (recommended) or email
- Railway offers a free tier with $5/month credit

## 4. Create a new project
- Click "New Project" in the Railway dashboard
- Choose "Empty Project (the bottom option)

Within your new project, you will add two new containers (called services)

## 5. Create a PostgreSQL service
- From within your project, click the "Add a service" button
- Select "Database" → "Add PostgreSQL"
- Railway will automatically create a PostgreSQL database

Once the service has been built, click on the PostgreSQL service you just created. Then:
- Go to the "Variables" tab
- Find the `DATABASE_URL` variable (Railway creates this automatically)
- Copy the connection string and paste it somewhere safe:
    ```sh
    postgresql://postgres:password@hostname.railway.app:5432/railway
    ```
- Modify the connection string to work with asynchronous connections:
   - Railway's `DATABASE_URL` uses the format: `postgresql://...`
   - SQLAlchemy with asyncpg needs: `postgresql+asyncpg://...`
   - Replace `postgresql://` with `postgresql+asyncpg://` in your connection string

{:.info}
> #### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify you have:
> - A PostgreSQL database created in Railway
> - The `DATABASE_URL` connection string copied
> - The connection string modified to use `postgresql+asyncpg://`

## 6. Create a Web Service
Now that you've created your database container, you're ready to create your web server, which will host your Backend and your Frontend on the same box. To do this, you will add a second service to your project:

1. **Add your application service:**
   - In your Railway project dashboard, click "+ New"
   - Select "GitHub Repo" → choose your repository
   - You will also need to teach Railway how to deploy your web server by going to Settings → Deploy → Dockerfile Path: `Dockerfile.prod`

2. **Set environment variables:**
   - Go to the "Variables" tab in your application service
   - Add the `DATABASE_URL` variable:
     - Click "+ New Variable"
     - Name: `DATABASE_URL`
     - Value: Your modified connection string (with `postgresql+asyncpg://`)
     - Click "Add"
   - **Important:** Use the modified connection string (with `+asyncpg`) here

3. **Link the database:**
   - Railway can automatically link services
   - In your application service, go to the "Variables" tab
   - You should see a "Reference Variable" option
   - Reference the PostgreSQL service's `DATABASE_URL`
   - **But remember:** You still need to modify it to use `postgresql+asyncpg://`

4. **Deploy:**
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


## 7. Verify Deployment

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