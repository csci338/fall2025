---
title: "Backend"
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
## 1. Create Poetry Configuration

Create `backend/pyproject.toml` with the following **exact** dependencies:

```toml
[tool.poetry]
name = "final-project"
version = "0.1.0"
description = ""
authors = ["Your Name <you@example.com>"]
readme = "README.md"
package-mode = false

[tool.poetry.dependencies]
python = "^3.11"
sqlalchemy = {extras = ["asyncio"], version = "^2.0.29"}
asyncpg = "*"
fastapi = "*"
uvicorn = {extras = ["standard"], version = "*"}
pydantic = "^2.0"
python-dotenv = "*"
black = "^25.11.0"
isort = "^7.0.0"
flake8 = "^7.3.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

### Notes
* Copy these package versions exactly. Different versions may cause compatibility issues.
* **Important:** You don't need to install dependencies locally! The Docker container will install them automatically when you build it (in the final step).
* The `docker_compose.yaml` that you will be making will automatically run `poetry install` during the build process


## 2. Create the Database Models

Before we create our models, let's understand what `declarative_base` is:

**`declarative_base`** is a function from SQLAlchemy that creates a base class for your database models. Think of it as a "template" that all your model classes will inherit from.

**How it works:**
When you create a class that inherits from `Base` (the result of `declarative_base()`), SQLAlchemy automatically:
- Creates a database table based on your class definition
- Maps class attributes to table columns
- Provides methods to query and manipulate your data

Now let's create the model files:

Create `backend/models/__init__.py`:

```python
from .base import Base
from .todo import Todo

__all__ = ["Base", "Todo"]
```

Create `backend/models/base.py`:

```python
from sqlalchemy.ext.declarative import declarative_base

# Base is created from declarative_base()
Base = declarative_base()
```

Create `backend/models/todo.py`:

```python
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from .base import Base

# Your model inherits from Base
class Todo(Base):
    __tablename__ = "todos"  # This becomes the table name

    id = Column(Integer, primary_key=True, index=True)  # This becomes a column
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```



{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> * Verify your model files exist and match the code above.
> * Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2025
> ├── database/
> │   └── Dockerfile
> ├── backend/
> │   ├── models/
> │   │   ├── __init__.py  # new
> │   │   ├── base.py      # new
> │   │   └── todo.py      # new
> │   └── pyproject.toml
> ├── ui/
> │   └── src/
> └── .env
> ```


## 3. Create FastAPI Server

Within the `backend` directory, create a file called `server.py`. This file will be responsible for creating your REST API and communicating with your database models.

### 3.1. Add File Header and Imports
Begin by pasting in a docstring and all necessary imports into `server.py`:

```python
"""
Simple FastAPI Starter - TODO API
==================================

This is a minimal FastAPI example, designed for beginners.
It shows the basic structure of a REST API with database access.

HOW IT WORKS:
1. Client (your React app) makes a request to a URL (e.g., /todos)
2. FastAPI finds the function decorated with @app.get("/todos")
3. That function uses the database connection to query data
4. The function returns data, which FastAPI converts to JSON
5. The JSON is sent back to the client
"""

# Step 1: Import what we need
import os
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker

from models import Base, Todo
```

**What each import does:**
- `os` - Access environment variables
- `datetime` - Handle timestamps
- `List, Optional` - Type hints for function parameters
- `dotenv` - Load environment variables from .env file
- `FastAPI` - The web framework
- `Depends` - Dependency injection for database sessions
- `HTTPException` - Raise HTTP errors (404, etc.)
- `CORSMiddleware` - Allow frontend to make requests
- `FileResponse, StaticFiles` - Serve static files in production
- `BaseModel` - Pydantic models for request/response validation
- `AsyncSession, create_async_engine` - Async database connection
- `select` - SQLAlchemy query builder
- `sessionmaker` - Create database sessions
- `Base, Todo` - Your database models


### 3.2. Load Environment Variables

Below the import statements, add code to load the database URL from environment variables:

```python
# Step 2: Load environment variables from .env file
# Looks for .env file in current directory and parent directories
load_dotenv()

# Step 3: Connect to the database
# Get DATABASE_URL from environment variable, fallback to local development
# Format: postgresql+asyncpg://username:password@host:port/database_name
DATABASE_URL = os.getenv("DATABASE_URL")
```


### 3.3. Set Up Database Connection

Below the `DATABASE_URL`, create the database engine and session factory:

```python
# Create the database engine - this manages the connection pool
# Think of it as a "factory" that creates database connections
engine = create_async_engine(DATABASE_URL, echo=False)

# Create a session factory - this creates individual database sessions
# Each request will get its own session to query the database
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
```

**What this does:**
- `create_async_engine()` - Creates a connection pool to the database
- `sessionmaker()` - Creates a factory for database sessions
- `expire_on_commit=False` - Keeps objects accessible after commit


### 3.4. Create Database Session Dependency

Below `AsyncSessionLocal`, create a function that FastAPI will use to get database sessions:

```python
# Step 4: Create a function to get database sessions
# This is called a "dependency" - FastAPI will automatically call this
# for each request and pass the result to your endpoint functions
async def get_db():
    """
    Generator function that yields a database session.

    The 'yield' keyword is special - it:
    1. Creates a session when the function is called
    2. Gives it to your endpoint function
    3. Closes the session when the endpoint finishes

    This ensures database connections are properly cleaned up.
    """
    async with AsyncSessionLocal() as session:
        yield session  # Give the session to the endpoint
        # After the endpoint finishes, the session is automatically closed
```

**Why use `yield`:**
- Creates the session when the endpoint starts
- Gives it to your endpoint function
- Automatically closes it when the endpoint finishes
- Prevents database connection leaks



### 3.5. Create Pydantic Schemas

Below the `get_db()` function you just made, create some objects to define the structure of data for requests and responses:

```python
# Step 5: Define what our API requests and responses will look like
# These are called "Pydantic models" or "schemas"
# They define the structure of data that will be sent to and from the API


class TodoBase(BaseModel):
    """Base schema with common fields for todos"""

    title: str
    description: Optional[str] = None
    completed: bool = False


class TodoCreate(TodoBase):
    """Schema for creating a new todo"""

    pass


class TodoUpdate(BaseModel):
    """Schema for updating a todo - all fields optional"""

    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TodoResponse(TodoBase):
    """What a todo looks like when we send it back to the client"""

    id: int
    created_at: datetime
    updated_at: datetime

    # This tells Pydantic to automatically convert SQLAlchemy models
    # (like our Todo model) into this Pydantic model
    class Config:
        from_attributes = True
```

**What each schema does:**
- `TodoBase` - Common fields shared by todos
- `TodoCreate` - Data needed to create a todo (inherits from TodoBase)
- `TodoUpdate` - Data for updating (all fields optional)
- `TodoResponse` - What we send back (includes id and timestamps)

**Why schemas matter:**
- Validate incoming data automatically
- Document the API (FastAPI generates docs from these)
- Type safety - catch errors before they happen


### 3.6. Create FastAPI App

Below your Pydandic schemas, initialize the FastAPI application by creating a `FastAPI` instance:

```python
# Step 6: Create the FastAPI app
# This is the main application object - it handles all incoming requests
app = FastAPI(title="TODO API", description="A simple CRUD API for managing TODO items")
```
The `app` object is responsible for fielding HTTP requests and directing them to the associated functions; and also building a nice, convenient web tester for you to use.

### 3.7. Create Tables on Startup

Add code to create database tables when the app starts:

```python
# Step 7: Create database tables on startup
# This automatically creates all tables defined in your SQLAlchemy models
@app.on_event("startup")
async def create_tables():
    """
    Create all database tables on application startup.
    This uses SQLAlchemy to generate tables from your model definitions.
    Works for both Docker and Railway databases.

    Note: Docker Compose's depends_on: service_healthy ensures the database
    is ready before this code runs.
    """
    async with engine.begin() as conn:
        # Use run_sync to run the synchronous create_all method
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables created successfully")
```

**What this does:**
- Runs automatically when the server starts
- Creates all tables defined in your models
- Uses `Base.metadata.create_all` to generate SQL

{:.info}
> #### <i class="fa-solid fa-hands-clapping"></i> Why you should be clapping and cheering:
> The `create_tables()` function you just made is amazing! It actually autogenerates the SQL needed to create the tables in your database, based on how you defined the models above. 



### 3.8. Add CORS Middleware

By default, most web servers block requests that don't come from the same server, and can be tricky to understand if you're new to web development. What this code does is allow computers from anywhere in the world to access and interact with your server. That's what `allow_origins=["*"]` means (the "*" is a wildcard that basically says, "anyone can issue requests to me!").

```python
# Step 8: Add CORS middleware to allow frontend requests
# CORS (Cross-Origin Resource Sharing) is needed because your React app
# runs on a different port (5173) than your API (8000)
# Without this, browsers would block requests from your frontend
# Note: In production with combined deployment, CORS may not be needed
# but we keep it for development flexibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (in production, specify exact URLs)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
```

**Why CORS is needed:**
- Browsers block requests between different origins (ports, domains)
- Your frontend (port 5173) needs to call your backend (port 8000)
- CORS middleware tells the browser "this is allowed"


### 3.9. Create GET Endpoints

Add endpoints to read todos:

#### Get All Todos

```python
# Step 9: Create our API endpoints
# These are the URLs that clients can visit to interact with todos
# IMPORTANT: API routes must be defined BEFORE the SPA catch-all route


# READ: Get all todos
@app.get("/todos", response_model=List[TodoResponse])
async def get_all_todos(db: AsyncSession = Depends(get_db)):
    """
    Get all todos from the database.

    Returns: A list of all todos in the database
    """
    result = await db.execute(select(Todo))
    todos = result.scalars().all()
    return todos
```

**How it works:**
- `@app.get("/todos")` - Creates a GET endpoint at `/todos`
- `response_model=List[TodoResponse]` - Validates response format
- `db: AsyncSession = Depends(get_db)` - Injects database session
- `select(Todo)` - SQLAlchemy query to get all todos
- `result.scalars().all()` - Extract all results as a list

#### Get One Todo

```python
# READ: Get a single todo by ID
@app.get("/todos/{todo_id}", response_model=TodoResponse)
async def get_todo(todo_id: int, db: AsyncSession = Depends(get_db)):
    """
    Get a single todo by its ID.

    Returns: The todo if found, or a 404 error if not
    """
    result = await db.execute(select(Todo).where(Todo.id == todo_id))
    todo = result.scalar_one_or_none()

    if todo is None:
        raise HTTPException(status_code=404, detail=f"Todo with ID {todo_id} not found")

    return todo
```

**How it works:**
- `{todo_id}` - Path parameter (extracted from URL)
- `.where(Todo.id == todo_id)` - Filter by ID
- `scalar_one_or_none()` - Get one result or None
- `HTTPException` - Return 404 if not found


### 3.10. Create POST Endpoint

Add endpoint to create new todos:

```python
# Step 10: 
# CREATE: Create a new todo
@app.post("/todos", response_model=TodoResponse, status_code=201)
async def create_todo(todo: TodoCreate, db: AsyncSession = Depends(get_db)):
    """
    Create a new todo item.

    Returns: The created todo
    """
    # Create a new Todo object from the request data
    db_todo = Todo(
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
    )

    # Add it to the database session
    db.add(db_todo)
    # Commit the transaction to save it
    await db.commit()
    # Refresh to get the updated data (like the generated ID)
    await db.refresh(db_todo)

    return db_todo
```

**How it works:**
- `@app.post("/todos")` - Creates a POST endpoint
- `todo: TodoCreate` - FastAPI validates request body against this schema
- `db.add()` - Add to session (not yet saved)
- `await db.commit()` - Save to database
- `await db.refresh()` - Reload from database (gets generated ID)


### 3.11. Create PATCH Endpoint

PATCH is is a way to update select data fields for an existing resource:

```python
# Step 11: 
# UPDATE: Update an existing todo (PATCH - partial update)
@app.patch("/todos/{todo_id}", response_model=TodoResponse)
async def patch_todo(
    todo_id: int, todo_update: TodoUpdate, db: AsyncSession = Depends(get_db)
):
    """
    Partially update an existing todo item (PATCH).
    Only the fields provided in the request will be updated.
    Returns: The updated todo, or a 404 error if not found
    """
    # Get the existing todo
    result = await db.execute(select(Todo).where(Todo.id == todo_id))
    db_todo = result.scalar_one_or_none()

    if db_todo is None:
        raise HTTPException(status_code=404, detail=f"Todo with ID {todo_id} not found")

    # Update only the fields that were provided
    update_data = todo_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)

    # Update the updated_at timestamp
    db_todo.updated_at = datetime.utcnow()

    # Commit the changes
    await db.commit()
    await db.refresh(db_todo)

    return db_todo
```

### 3.12. Create DELETE Endpoint

Add endpoint to delete todos:

```python
# DELETE: Delete a todo
@app.delete("/todos/{todo_id}", status_code=204)
async def delete_todo(todo_id: int, db: AsyncSession = Depends(get_db)):
    """
    Delete a todo item.

    Returns: 204 No Content if successful, or a 404 error if not found
    """
    # Get the existing todo
    result = await db.execute(select(Todo).where(Todo.id == todo_id))
    db_todo = result.scalar_one_or_none()

    if db_todo is None:
        raise HTTPException(status_code=404, detail=f"Todo with ID {todo_id} not found")

    # Delete it from the database
    await db.delete(db_todo)
    await db.commit()

    return None
```

**How it works:**
- `status_code=204` - No Content (standard for successful DELETE)
- `db.delete()` - Mark for deletion
- `db.commit()` - Actually delete from database
- Returns `None` (FastAPI converts to 204 response)


### 3.13. Add Production Static File Serving

Add code to serve the frontend in production:

```python
# Step 8: Serve static files (frontend) in production
# This must come AFTER all API routes so API routes are matched first
# Check if static directory exists (production build)
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    # Mount static files (CSS, JS, images, etc.)
    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(static_dir, "assets")),
        name="assets",
    )

    # Serve index.html for all non-API routes (SPA routing)
    # This catch-all route must be last so API routes take precedence
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """
        Serve the React app for all non-API routes.
        This allows React Router to handle client-side routing.
        """
        index_path = os.path.join(static_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        raise HTTPException(status_code=404, detail="Frontend not found")
```

**Why this matters:**
- In production, frontend is built and served as static files
- API routes must come first (so `/todos` works)
- Catch-all route serves `index.html` for React Router
- Only runs if `static/` directory exists (production mode)


### 3.14. Add Main Block

Add code to run the server directly:

```python
# Step 9: Run the server
# This code only runs if you execute the file directly (not if imported)
if __name__ == "__main__":
    import uvicorn

    # uvicorn is the web server that runs FastAPI
    # --reload means it will restart when you change the code
    uvicorn.run(app, host="0.0.0.0", port=8000)


# Note: The server will be run in Docker (see Docker Configuration section)
# If you have Poetry installed locally, you can also run:
# poetry run uvicorn server:app --reload
```


## 4. Create Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
# Use Python 3.11 as the base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install poetry

# Configure Poetry to not create virtual environments (we're in Docker)
RUN poetry config virtualenvs.create false

# Copy dependency files
COPY pyproject.toml poetry.lock* ./

# Install dependencies
RUN poetry install --no-interaction --no-ansi

# Copy application code
COPY . .

# Expose the port FastAPI runs on
EXPOSE 8000

# Default command (can be overridden in docker-compose.yaml)
CMD ["poetry", "run", "uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> * Verify your `server.py` and `Dockerfile` exist in the `backend/` directory.
> * Also verify that your file structure looks like the one below:
>
> ```sh
> project02-fall2025
> ├── database/
> │   └── Dockerfile
> ├── backend/
> │   ├── models/
> │   │   ├── __init__.py
> │   │   ├── base.py
> │   │   └── todo.py
> │   ├── server.py      # new
> │   ├── Dockerfile    # new
> │   └── pyproject.toml
> ├── ui/
> │   └── src/
> └── .env
> ```

## 5. Configuring Linters and Formatters

Linters and formatters help maintain code quality and consistency. This section shows you how to configure them for both backend and frontend.

The backend uses three tools:
- **Black** - Code formatter
- **isort** - Import sorter
- **flake8** - Linter

### 5.1. Configure Black and isort in pyproject.toml

Add these sections to your `backend/pyproject.toml` file (add them after the `[build-system]` section):

```toml
[tool.black]
line-length = 88
target-version = ['py39', 'py310', 'py311']
include = '\.pyi?$'
extend-exclude = '''
/(
  # directories
  \.eggs
  | \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | _build
  | buck-out
  | build
  | dist
  | __pycache__
)/
'''

[tool.isort]
profile = "black"
line_length = 88
multi_line_output = 3
include_trailing_comma = true
force_grid_wrap = 0
use_parentheses = true
ensure_newline_before_comments = true
skip_glob = ["*/__pycache__/*", "*/migrations/*"]
```

**What this does:**
- `[tool.black]` - Configures Black formatter (88 char line length, Python 3.9+)
- `[tool.isort]` - Configures isort to work with Black's style

### 5.2. Configure flake8

Create `backend/.flake8` with the following content:

```ini
[flake8]
# Black allows for 88 chars per line. Let's make flake8 do that too!
max-line-length = 88

# some flake8 errors to ignore (b/c Black says they're OK):
ignore = W291, W293, W503 

exclude =
    .venv
```

**What this does:**
- Sets line length to 88 (matches Black)
- Ignores whitespace errors that Black handles
- Excludes virtual environment from linting

### 5.3. Create Helper Scripts
To make running linters easier, create a new directory within `backend` called `scripts`. Within `scripts`:


**Create `backend/scripts/check.sh`:**
```bash
#!/bin/bash

echo 'Running flake8...'
poetry run flake8

echo 'Running isort...'
poetry run isort . --check-only   # run the Python import sorter

echo 'Running black...'
poetry run black . --check        # runs the Python formatter

echo '✨✨✨✨✨ Completed checks ✨✨✨✨✨'
```

**Create `backend/scripts/fix.sh`:**
```bash
#!/bin/bash
# Running this file will modify all unformatted python files in this project.
# Run from project root directory: $ bash backend/scripts/fix.sh

poetry run isort .      # run the Python import sorter
poetry run black .      # runs the Python formatter
```

**Using the scripts:**

On the Docker backend container, run:

```bash
# Check code quality (doesn't modify files)
bash scripts/check.sh

# Fix formatting issues (modifies files)
bash scripts/fix.sh
```

**What each script does:**
- `check.sh` - Runs all checks (flake8, isort, black) without modifying files
- `fix.sh` - Automatically fixes formatting issues (isort and black)


## 6. Final Testing (After Docker Container Is Built)

**Note:** These tests should be run after Docker is set up (see Docker Configuration section). The server will be running in a Docker container.

Test all endpoints:

```bash
# Make sure Docker is running (docker-compose up)
# The server should already be running at http://localhost:8000

# Test GET all
curl http://localhost:8000/todos

# Test POST
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test todo"}'

# Test GET one (use ID from POST response)
curl http://localhost:8000/todos/1

# Test PATCH
curl -X PATCH http://localhost:8000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated", "completed": true}'

# Test DELETE
curl -X DELETE http://localhost:8000/todos/1

# View API documentation
# Open http://localhost:8000/docs in your browser
```