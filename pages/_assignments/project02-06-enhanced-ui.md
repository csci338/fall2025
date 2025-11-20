---
title: "Enhanced Frontend"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---

Now that you have a working app, let's add the features that make it functional: displaying todos, creating new ones, and deleting them.

## 1. Build the READ Feature (Display Todos)

We'll create a component that fetches and displays todos from the backend.

### 1.1. Create the Todos Component

Create `ui/src/Todos.jsx`:

```javascript
import React, { useState, useEffect } from 'react';

export default function Todos({ API_URL }) {
    const [todoList, setTodoList] = useState([]);

    async function fetchTodos() {
        const response = await fetch(`${API_URL}/todos`);
        const data = await response.json();
        setTodoList(data);
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="todos-container">
            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id}>
                        <div>
                            {todo.completed ? (
                                <span>Completed</span>
                            ) : (
                                <span>In Progress</span>
                            )}{' '}
                            {todo.title}
                            <br />
                            {todo.description}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**What this does:**
- **useState** - Creates state to store the list of todos
- **fetchTodos()** - Makes a GET request to `/todos` endpoint
- **useEffect** - Runs `fetchTodos()` when component first loads
- **map()** - Loops through todos and creates HTML for each one
- **Conditional rendering** - Shows "Completed" or "In Progress"

**Key concepts:**
- **State** - `todoList` stores data that can change
- **useEffect** - Runs code when component mounts (empty array `[]` means "run once")
- **async/await** - Handles asynchronous operations (API calls)
- **fetch API** - Browser function to make HTTP requests

### 1.2. Add Todos to App

Update `ui/src/App.jsx`:

```javascript
import React from 'react';
import './globals.css';
import Todos from './Todos';  // Add this

const API_URL = 'http://localhost:8000';  // Add this

export default function App() {
    return (
        <>
            <header>
                <h1>TODO List</h1>
            </header>
            <main>
                <Todos API_URL={API_URL} />  {/* Add this */}
            </main>
        </>
    );
}
```

**What this does:**
- Imports the Todos component
- Defines the backend URL
- Passes `API_URL` as a prop to Todos

**Key concepts:**
- **Props** - Data passed from parent (App) to child (Todos)
- **Props are read-only** - Child can't change props directly

### 1.3. Add Styling for Todos

Add to `ui/src/globals.css`:

```css
.todos-container {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    border: dashed 3px hotpink;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    line-height: 1.4rem;
}

span {
    font-weight: bold;
    color: black;
    background-color: hotpink;
    padding: 2px 5px;
    border-radius: 5px;
}
```

**Understanding what just happened:**
- When the page loads, `useEffect` runs
- It calls `fetchTodos()` which makes a GET request
- The backend returns JSON data
- `setTodoList(data)` updates the state
- React re-renders, showing the todos

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your `Todos.jsx` component is created and imported in `App.jsx`. You'll test it after Docker is set up (see Docker Configuration section).

## 2. Build the CREATE Feature (Add New Todos)

Now we'll add a form to create new todos.

### 2.1. Create the CreateTodo Component

Create `ui/src/CreateTodo.jsx`:

```javascript
import React, { useState } from 'react';

export default function CreateTodo({ API_URL }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, completed: false }),
        });

        if (response.ok) {
            setTitle('');
            setDescription('');
        }
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create TODO</button>
        </form>
    );
}
```

**What this does:**
- **useState** - Tracks form input values (`title` and `description`)
- **handleSubmit()** - Handles form submission
  - `e.preventDefault()` - Stops page from refreshing
  - Makes POST request to create a new todo
  - Clears form if successful
- **Controlled inputs** - Input values are controlled by React state

**Key concepts:**
- **Controlled components** - Input value comes from state, not DOM
- **onChange** - Updates state when user types
- **onSubmit** - Handles form submission
- **JSON.stringify()** - Converts JavaScript object to JSON string

### 2.2. Add CreateTodo to App

Update `ui/src/App.jsx`:

```javascript
import React from 'react';
import './globals.css';
import Todos from './Todos';
import CreateTodo from './CreateTodo';  // Add this

const API_URL = 'http://localhost:8000';

export default function App() {
    return (
        <>
            <header>
                <h1>TODO List</h1>
            </header>
            <main>
                <Todos API_URL={API_URL} />
                <CreateTodo API_URL={API_URL} />  {/* Add this */}
            </main>
        </>
    );
}
```

### 2.3. Add Form Styling

Add to `ui/src/globals.css`:

```css
.form-container {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-container input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.form-container button {
    padding: 10px 20px;
    background-color: hotpink;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}

.form-container button:hover {
    background-color: #ff69b4;
}
```

**Understanding what just happened:**
- User fills out form and clicks submit
- `handleSubmit` makes a POST request
- Backend creates the todo in the database
- But the Todos component doesn't know to refresh!

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your `CreateTodo.jsx` component is created and imported in `App.jsx`. Note: The new todo won't appear in the list yet - we'll fix this in the next section.

## 3. Connect Components Together (Component Communication)

This is the key part! We need to make the Todos component refresh when a new todo is created. This teaches you how React components communicate.

### 3.1. Understanding the Problem

Right now:
- `App` renders `Todos` and `CreateTodo` side by side
- They don't know about each other
- When `CreateTodo` creates a todo, `Todos` doesn't know to refresh

**Solution:** Use "state lifting" - manage shared state in the parent (`App`)

### 3.2. Add Refresh Mechanism to App

Update `ui/src/App.jsx`:

```javascript
import React, { useState } from 'react';  // Add useState
import './globals.css';
import Todos from './Todos';
import CreateTodo from './CreateTodo';

const API_URL = 'http://localhost:8000';

export default function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);  // Add this

    function refreshTodos() {  // Add this function
        setRefreshTrigger((prev) => prev + 1);
    }

    return (
        <>
            <header>
                <h1>TODO List</h1>
            </header>
            <main>
                <Todos API_URL={API_URL} refreshTrigger={refreshTrigger} />  {/* Add prop */}
                <CreateTodo API_URL={API_URL} onTodoCreated={refreshTodos} />  {/* Add prop */}
            </main>
        </>
    );
}
```

**What this does:**
- **refreshTrigger** - A number that changes when we want to refresh
- **refreshTodos()** - Function that increments the trigger
- Passes `refreshTrigger` to Todos (so it knows when to refresh)
- Passes `onTodoCreated` to CreateTodo (callback to call after creating)

**Key concepts:**
- **State in parent** - App manages the refresh trigger
- **Callback props** - Passing functions as props
- **State changes trigger re-renders** - When `refreshTrigger` changes, Todos re-renders

### 3.3. Update Todos to Watch for Refresh

Update `ui/src/Todos.jsx`:

```javascript
import React, { useState, useEffect } from 'react';

export default function Todos({ API_URL, refreshTrigger }) {  // Add refreshTrigger prop
    const [todoList, setTodoList] = useState([]);

    async function fetchTodos() {
        const response = await fetch(`${API_URL}/todos`);
        const data = await response.json();
        setTodoList(data);
    }

    useEffect(() => {
        fetchTodos();
    }, [refreshTrigger]);  // Add refreshTrigger to dependencies

    return (
        <div className="todos-container">
            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id}>
                        <div>
                            {todo.completed ? (
                                <span>Completed</span>
                            ) : (
                                <span>In Progress</span>
                            )}{' '}
                            {todo.title}
                            <br />
                            {todo.description}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**What this does:**
- Adds `refreshTrigger` to `useEffect` dependencies
- When `refreshTrigger` changes, `useEffect` runs again
- This calls `fetchTodos()` to get the latest data

**Key concepts:**
- **useEffect dependencies** - Array tells React when to re-run the effect
- When `refreshTrigger` changes → `useEffect` runs → `fetchTodos()` called → list updates

### 3.4. Update CreateTodo to Call Callback

Update `ui/src/CreateTodo.jsx`:

```javascript
import React, { useState } from 'react';

export default function CreateTodo({ API_URL, onTodoCreated }) {  // Add onTodoCreated prop
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, completed: false }),
        });

        if (response.ok && onTodoCreated) {  // Add check for callback
            onTodoCreated();  // Call the callback!
            setTitle('');
            setDescription('');
        }
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create TODO</button>
            <div className="side-note">
                The todo list will automatically update after creating a new todo!
            </div>
        </form>
    );
}
```

**What this does:**
- Receives `onTodoCreated` callback as a prop
- Calls it after successfully creating a todo
- This triggers the refresh in the parent (App)

**Understanding the complete flow:**
1. User creates todo → `handleSubmit` runs
2. POST request succeeds → `onTodoCreated()` called
3. This calls `refreshTodos()` in App
4. `refreshTrigger` increments → Todos' `useEffect` runs
5. `fetchTodos()` called → New list fetched → UI updates!

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your component communication is set up correctly. After Docker is running, new todos should automatically appear in the list when created!

## 4. Add DELETE Feature

Now we'll add the ability to delete todos.

### 4.1. Add Delete Function to Todos

Update `ui/src/Todos.jsx`:

```javascript
import React, { useState, useEffect } from 'react';

export default function Todos({ API_URL, refreshTrigger }) {
    const [todoList, setTodoList] = useState([]);

    async function fetchTodos() {
        const response = await fetch(`${API_URL}/todos`);
        const data = await response.json();
        setTodoList(data);
    }

    useEffect(() => {
        fetchTodos();
    }, [refreshTrigger]);

    // Add this function
    async function deleteTodo(todoId) {
        await fetch(`${API_URL}/todos/${todoId}`, {
            method: 'DELETE',
        });
        // Refresh the list to show the todo is gone
        fetchTodos();
    }

    return (
        <div className="todos-container">
            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id}>
                        <div>
                            {todo.completed ? (
                                <span>Completed</span>
                            ) : (
                                <span>In Progress</span>
                            )}{' '}
                            {todo.title}
                            <br />
                            {todo.description}
                        </div>
                        {/* Add delete button */}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**What this does:**
- **deleteTodo()** - Makes DELETE request to remove a todo
- **onClick handler** - Calls `deleteTodo` when button is clicked
- **fetchTodos()** - Refreshes the list after deletion

**Key concepts:**
- **Event handlers** - `onClick={() => deleteTodo(todo.id)}`
- **Arrow functions** - `() =>` creates a function that calls `deleteTodo`
- **DELETE method** - HTTP method for removing resources

### 4.2. Add Button Styling

Add to `ui/src/globals.css`:

```css
button {
    padding: 5px 10px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #cc0000;
}

.side-note {
    font-size: 12px;
    color: #666;
    font-style: italic;
    margin-top: 10px;
}
```

**Understanding what just happened:**
- User clicks Delete button
- `deleteTodo(todo.id)` is called
- DELETE request sent to backend
- Backend removes todo from database
- `fetchTodos()` refreshes the list
- Todo no longer appears

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your delete functionality is implemented. After Docker is running, clicking Delete should remove todos from the list.

## 5. Final Testing (After Docker Container Is Built)

**Note:** These tests should be run after Docker is set up (see Docker Configuration section). The frontend and backend will be running in Docker containers.

Test all functionality:

1. **READ:** Todos should load automatically when page opens
2. **CREATE:** Fill out form, click "Create TODO", verify it appears automatically
3. **DELETE:** Click "Delete" on a todo, verify it disappears

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> * Verify all CRUD operations work correctly.
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
> │   ├── server.py
> │   ├── Dockerfile
> │   └── pyproject.toml
> ├── ui/
> │   ├── src/
> │   │   ├── main.jsx
> │   │   ├── App.jsx          # updated
> │   │   ├── Todos.jsx        # new
> │   │   ├── CreateTodo.jsx   # new
> │   │   └── globals.css      # updated
> │   ├── index.html
> │   ├── package.json
> │   ├── vite.config.js
> │   └── Dockerfile
> └── .env
> ```

## 6. Summary
How It All Works Together:

### The Complete Flow

1. **Page Loads:**
   - `main.jsx` renders `App`
   - `App` renders `Todos` and `CreateTodo`
   - `Todos`' `useEffect` runs → `fetchTodos()` → GET request → todos displayed

2. **User Creates Todo:**
   - User fills form → clicks "Create TODO"
   - `CreateTodo`'s `handleSubmit` runs → POST request → todo created
   - `onTodoCreated()` called → `App`'s `refreshTodos()` runs
   - `refreshTrigger` increments → `Todos`' `useEffect` runs → `fetchTodos()` → list updates

3. **User Deletes Todo:**
   - User clicks "Delete" → `deleteTodo()` runs → DELETE request → todo removed
   - `fetchTodos()` called → list refreshes → todo gone

### Component Communication Pattern

**Key Pattern:**
- **State lifting** - Shared state lives in parent (App)
- **Props down** - Data flows from parent to children
- **Callbacks up** - Events flow from children to parent via callbacks

### Key React Concepts Learned

#### Hooks
- **useState** - Manage component state
- **useEffect** - Handle side effects (API calls, subscriptions)

#### Component Communication
- **Props** - Pass data from parent to child
- **Callbacks** - Pass functions to trigger parent updates
- **State lifting** - Managing shared state in parent component

#### Event Handling
- **onClick** - Handle button clicks
- **onChange** - Handle input changes
- **onSubmit** - Handle form submission

#### Data Fetching
- **fetch API** - Make HTTP requests
- **async/await** - Handle asynchronous operations
- **JSON** - Parse and stringify data

#### Conditional Rendering
- **Ternary operator** - `{condition ? true : false}`
- **Logical AND** - `{condition && <Component />}`

## 7. Commit and Push
Go ahead and commit / push your changes to git / GitHub. 

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify that all your new code is on GitHub.

---

[← Back to Project 2 Instructions](project02)