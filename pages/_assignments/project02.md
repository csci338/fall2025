---
title: "Full Stack Application: Movie Recommendation System"
layout: assignment-two-column
type: project
draft: 1
points: 20
abbreviation: Project 2
num: 2
h_max: 5
start_date: 2025-11-15
due_date: 2025-12-05
---

# Set Up
## 1. Make a new repo
1. Create a new folder outside of your `class-exercises-2025` folder called `project02`. This folder will be a stand-alone repo, so make sure this folder isn't nested within another folder that is also under version control.
1. Initialize a new repo (review past labs if you forgot how to do this).
1. Create a `.gitignore` file that excludes `.venv`, `node_modules`, and `*.pyc`, along with any other files you don't want to check into version control.
1. Finally, create a new repo on GitHub and push your main branch to GitHub.

## 2. Set up your backend

### 2.1. Start with the Lab 8 starter code
1. Copy your solution from `lab08` into your `project02` folder. 
1. Rename it to `backend`
1. Delete the following files / directories from your `backend` directory (if they exist):
    * `__pycache__`
    * `.venv`
    * `poetry.lock`
    * `orm_samples.py`
    * `answers_orm.py`
    * `answers_sql.md`
1. Your directory structure should now look something like this:
    ```bash
        project02
        ├── .git
        ├── .gitignore
        └── backend
            ├── .gitignore    # it's OK if you have multiple .gitignore files
            ├── Dockerfile
            ├── compose.yaml
            ├── init.sh
            ├── models        # should have a bunch of python modules
            └── pyproject.toml
    ```

### 2.2. Add new dependencies
1. On the command line, navigate into your `backend` directory and add some new dependencies:
    ```
    poetry add "sqlalchemy[asyncio]^2.0.29"
    poetry add asyncpg
    poetry add fastapi
    poetry add "uvicorn[standard]"
    poetry add "pydantic^2.0"
    ```

### 2.3. Understanding FastAPI Basics

Before we write the code, let's understand what FastAPI does:

- **FastAPI** is a web framework that lets you create APIs (Application Programming Interfaces)
- An API is like a menu at a restaurant - it lists what you can order (endpoints) and what you'll get back (responses)
- When a user visits a URL like `http://127.0.0.1:8000/films`, FastAPI:
  1. Receives the request
  2. Calls the function associated with that URL
  3. The function queries the database
  4. Returns data as JSON (which your React frontend can read)

**Key Concepts You'll See:**
- **`@app.get("/films")`** - This is a "decorator" that tells FastAPI: "When someone visits /films, run this function"
- **`async def`** - These are asynchronous functions that can wait for database operations without blocking
- **`Depends(get_db)`** - This automatically gives each endpoint a database connection
- **Pydantic models** - These define what your API responses will look like (like a contract)

### 2.4. Add a Fast API Web Server
Within your `backend` folder, create a new file called `server.py` and paste the following code into it:

```py
"""
Simple FastAPI Starter - Film API
==================================

This is a minimal FastAPI example perfect for beginners.
It shows the basic structure of a REST API with database access.

HOW IT WORKS:
1. Client (your React app) makes a request to a URL (e.g., /films)
2. FastAPI finds the function decorated with @app.get("/films")
3. That function uses the database connection to query data
4. The function returns data, which FastAPI converts to JSON
5. The JSON is sent back to the client
"""

# Step 1: Import what we need
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from typing import List, Optional
from pydantic import BaseModel

from models import Film

# Step 2: Connect to the database
# This string tells SQLAlchemy where to find your database
# Format: postgresql+asyncpg://username:password@host:port/database_name
DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5433/dvdrental"

# Create the database engine - this manages the connection pool
# Think of it as a "factory" that creates database connections
engine = create_async_engine(DATABASE_URL, echo=False)

# Create a session factory - this creates individual database sessions
# Each request will get its own session to query the database
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Step 3: Create a function to get database sessions
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

# Step 4: Define what our API responses will look like
# This is called a "Pydantic model" or "schema"
# It defines the structure of data that will be sent back to clients
class FilmResponse(BaseModel):
    """
    What a film looks like when we send it back to the client.
    
    This is like a contract - it guarantees that any FilmResponse
    will have these exact fields with these types.
    """
    film_id: int
    title: str
    description: Optional[str]  # Optional means it can be None
    release_year: Optional[int]
    rental_rate: float
    
    # This tells Pydantic to automatically convert SQLAlchemy models
    # (like our Film model) into this Pydantic model
    class Config:
        from_attributes = True

# Step 5: Create the FastAPI app
# This is the main application object - it handles all incoming requests
app = FastAPI(
    title="Film API",
    description="A simple API to get film information"
)

# Add CORS middleware to allow frontend requests
# CORS (Cross-Origin Resource Sharing) is needed because your React app
# runs on a different port (5173) than your API (8000)
# Without this, browsers would block requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (in production, specify exact URLs)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Step 6: Create our API endpoints
# These are the URLs that clients can visit to get data

@app.get("/")
async def root():
    """
    Welcome endpoint - the simplest possible endpoint.
    
    When someone visits http://127.0.0.1:8000/, this function runs.
    """
    return {"message": "Welcome to the Film API! Try /films"}

@app.get("/films", response_model=List[FilmResponse])
async def get_all_films(db: AsyncSession = Depends(get_db)):
    """
    Get all films from the database.
    
    - The @app.get("/films") decorator means: "When someone visits /films, run this function"
    - response_model tells FastAPI what shape the response will be
    - db: AsyncSession = Depends(get_db) automatically gives us a database connection
    - async def means this function can wait for database operations
    
    Returns: A list of all films in the database
    """
    # Query the database - select(Film) means "get all Film records"
    result = await db.execute(select(Film))
    
    # Get all the films from the result
    # scalars() extracts the Film objects from the result
    # all() gets all of them as a list
    films = result.scalars().all()
    
    # Return them - FastAPI automatically converts to JSON
    return films

@app.get("/films/{film_id}", response_model=FilmResponse)
async def get_one_film(film_id: int, db: AsyncSession = Depends(get_db)):
    """
    Get a single film by its ID.
    
    - The {film_id} in the path is a "path parameter"
    - FastAPI automatically extracts it from the URL and passes it as an argument
    - Example: Visiting /films/5 sets film_id = 5
    
    Returns: The film if found, or a 404 error if not
    """
    # Query for the specific film
    # .where() filters the results to only films with matching film_id
    result = await db.execute(
        select(Film).where(Film.film_id == film_id)
    )
    
    # Get the film (or None if not found)
    # scalar_one_or_none() gets one result, or None if nothing matches
    film = result.scalar_one_or_none()
    
    # If not found, return a 404 error
    # HTTPException is FastAPI's way of returning error responses
    if film is None:
        raise HTTPException(
            status_code=404,  # HTTP status code for "Not Found"
            detail=f"Film with ID {film_id} not found"
        )
    
    # Return the film - FastAPI converts it to JSON automatically
    return film

# Step 7: Run the server
# This code only runs if you execute the file directly (not if imported)
if __name__ == "__main__":
    import uvicorn
    # uvicorn is the web server that runs FastAPI
    # --reload means it will restart when you change the code
    uvicorn.run(app, host="0.0.0.0", port=8000)

```
### 2.5. Test
1. Before building a new database container, go ahead and delete your old database container (`lab08`), which is using the same port (5433).
    * Alternatively, you could update your `compose.yaml` to map your database to a new port (e.g., 5434) if you want to keep your lab08 container.
1. On the command line, from within your `backend folder`, create a new Docker container that will house your database:
    ```bash
    docker compose up -d
    ```
1. Start your web server as follows:
    ```bash
    poetry run uvicorn server:app --reload
    ```
1. Test it by navigating to <a href="http://127.0.0.1:8000/docs" target="_blank">http://127.0.0.1:8000/docs</a>, which is the Fast API endpoint tester. It should look something like this:
    <img class="large frame" src="/fall2025/assets/images/projects/p02_ss1.png" />
1. Scroll to the `/films` endpoint by clicking the "Try it out" button, and then clicking the blue "Execute" button. Scroll down. If you see something like the screenshot below, you did it correctly (note the array of objects representing various films):
    <img class="large frame" src="/fall2025/assets/images/projects/p02_ss2.png" />

{:.info}
> ### What just happened?
>
> You just created your first FastAPI web server! Here's what each part does:
>
> **The Request Flow:**
> 1. A client (like your React app) sends a request to `http://127.0.0.1:8000/films`
> 2. FastAPI receives the request and looks for a function decorated with `@app.get("/films")`
> 3. FastAPI automatically calls `get_db()` to get a database connection
> 4. Your `get_all_films()` function runs, queries the database, and returns the films
> 5. FastAPI automatically converts the Python objects to JSON and sends them back
>
> **Key Concepts:**
> - **Decorators** (`@app.get`) - These "register" your functions with FastAPI so it knows which URL triggers which function
> - **Dependencies** (`Depends(get_db)`) - FastAPI automatically calls `get_db()` before your endpoint runs, giving you a database connection
> - **Async/Await** - `async def` and `await` let your code wait for database operations without blocking other requests
> - **Pydantic Models** - These define the shape of your responses and automatically convert SQLAlchemy models to JSON
> - **CORS Middleware** - Allows your React frontend (running on port 5173) to make requests to your API (running on port 8000)
>
> **Why `yield` instead of `return`?**
> The `yield` keyword in `get_db()` creates a generator. This lets FastAPI:
> - Create the database session when your endpoint starts
> - Use the session during your endpoint
> - Automatically close the session when your endpoint finishes (even if there's an error)
>
> This ensures database connections are always properly cleaned up!

## 3. Set up your frontend (React)
### 3.1. Create the UI skeleton
1. Create a new folder directly underneath `project02` called `frontend`. 
1. Inside of `frontend`, we're going to follow the exact same steps as we did in Lab 9:
    1. Create the following blank files:
        - `index.html`
        - `styles.css`
    1. Inside of your `index.html` file, paste the following code:

        ```html
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Film UI</title>
            <link rel="stylesheet" href="./styles.css">
        </head>

        <body>
            <h1>Film UI</h1>
            <p>Here is some text!</p>
        </body>

        </html>
        ```
    1. Inside of your `styles.css` file, paste the following code:

        ```css
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: navy;
            color: white;
        }
        ```
1. When you’re done, preview your HTML page in the browser. If you did it correctly, you should see your HTML, and the background should be navy blue (just like in Lab 9).

### 3.2. Convert your frontend to a React project
Follow steps #3 and #4 (from Lab 9) to convert your front-end to a react project. When you're done, your directory structure should look like this:

```bash
project02
├── .git
├── .gitignore
├── backend
│   ├── .gitignore
│   ├── Dockerfile
│   ├── compose.yaml
│   ├── init.sh
│   ├── models
│   ├── poetry.lock
│   ├── pyproject.toml
│   └── server.py
└── frontend
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── App.jsx
    │   └── main.jsx
    └── styles.css
```

Then, make sure your frontend runs by running `npm run dev` **from within your `frontend` directory**. If it worked correctly, you should see this screen when you access <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a>:

<img class="small frame" src="/fall2025/assets/images/projects/p02_ss3.png" />

### 3.3. Create a React component to query the films table
Within `frontend/src`, create a new component called `Films.jsx` and paste the following code into this component:

```jsx
import React, { useState, useEffect } from "react";

export default function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      const response = await fetch("http://127.0.0.1:8000/films");

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        setFilms([]);
      }

      const filmData = await response.json();
      setFilms(filmData);
    }
    fetchFilms();
  }, []);

  function displayFilm(filmObj) {
    return (
      <div key={filmObj.film_id}>
        <strong>{filmObj.title}</strong> ({filmObj.release_year})
        {filmObj.description && <p>{filmObj.description}</p>}
      </div>
    );
  }

  // Return the JSX:
  if (films.length === 0) {
    return <div>No films found.</div>;
  }
  return (
    <section>
      <h2>Films</h2>
      {films.map((film) => displayFilm(film))}
    </section>
  );
}
```

Now, figure out how to utilize this component within `App.jsx` based on what you learned in Labs 9 and 10. If you figured it out, you should have a screen that looks something like this:

<img class="medium frame" src="/fall2025/assets/images/projects/p02_ss4.png" />

{:.info}
> ### What just happened?
>
> You just connected your React frontend to your FastAPI backend! Here's how it works:
>
> **The Full-Stack Flow:**
> 1. **User visits your React app** at `http://localhost:5173/`
> 2. **React component mounts** - The `Films` component renders
> 3. **`useEffect` runs** - When the component first loads, it triggers the `fetchFilms()` function
> 4. **HTTP Request** - `fetch("http://127.0.0.1:8000/films")` sends a GET request to your FastAPI server
> 5. **FastAPI processes** - Your `/films` endpoint queries the database and returns JSON
> 6. **React receives data** - The response is converted to JavaScript objects
> 7. **State updates** - `setFilms(filmData)` updates the component's state
> 8. **UI re-renders** - React automatically re-renders to show the new data
>
> **Key Concepts:**
> - **`useEffect`** - Runs code when the component first loads (or when dependencies change)
> - **`useState`** - Stores the films data and triggers a re-render when updated
> - **`fetch()`** - JavaScript's built-in function for making HTTP requests
> - **`async/await`** - Lets your code wait for the HTTP request to complete
> - **`.map()`** - Transforms the array of films into React components
>
> **Why two servers?**
> - **Frontend (port 5173)** - Serves your React app to the browser
> - **Backend (port 8000)** - Handles database queries and business logic
> - This separation allows you to build mobile apps, other frontends, or share your API with others!

Congratulations! You've are well on your way to making a fabulous full-stack application. Now, your job is to enhance this application to meet the requirements. Please read on...

## Your Tasks
