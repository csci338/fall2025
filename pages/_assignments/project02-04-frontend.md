---
title: "Frontend"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---
## 4. Frontend

### Step 4.1: Create package.json

Create `ui/package.json` with the following **exact** dependencies:

```json
{
  "name": "ui",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint:check": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format:check": "prettier --check \"src/**/*.{js,jsx,json,css}\"",
    "format:fix": "prettier --write \"src/**/*.{js,jsx,json,css}\"",
    "check": "npm run format:check && npm run lint:check",
    "fix": "npm run format:fix && npm run lint:fix"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "vite": "^7.2.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.0.0",
    "eslint": "^8.57.1",
    "eslint-plugin-mocha": "^10.2.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "globals": "^15.0.0",
    "prettier": "^3.3.0"
  }
}
```

**Important:** Copy these versions exactly.

### Step 4.2: Do Not Install Dependencies Locally

**Important:** You don't need to install dependencies locally! The Docker container will install them automatically when you build it.

Dependencies will be installed automatically when:
- Docker builds your frontend container (see the Docker Configuration section)
- The container runs `npm install` during the build process

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your `package.json` file exists and contains all the required dependencies listed above.

### Step 4.3: Create Vite Configuration

Create `ui/vite.config.js`:

```javascript
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0", // Allow external connections
        port: 5173,
        strictPort: true, // Fail if port is already in use
        watch: {
            usePolling: true, // Required for Docker file watching
            interval: 1000, // Poll every second
        },
        hmr: {
            clientPort: 5173, // Port the browser connects to (mapped port from docker-compose)
        },
    },
    // Production build settings
    build: {
        outDir: "dist",
        sourcemap: false,
        minify: "esbuild",
    },
    // Environment variables - Vite requires VITE_ prefix
    envPrefix: "VITE_",
});
```

### Step 4.4: Create HTML Entry Point

Create `ui/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TODO App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Step 4.5: Create React Application

Create `ui/src/main.jsx`:

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Create `ui/src/App.jsx` - This is where you'll build your main application component. It should:
- Fetch todos from the API
- Display a list of todos
- Allow creating new todos
- Allow updating/deleting todos

Create `ui/src/Todos.jsx` - Component to display the list of todos

Create `ui/src/CreateTodo.jsx` - Component to create new todos

Create `ui/src/globals.css` - Your application styles

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Verify your React component files are created. You'll test the app after Docker is set up (see Docker Configuration section).

### Step 4.6: Create Frontend Dockerfile

Create `ui/Dockerfile`:

```dockerfile
# Use Node.js 20 as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Default command (can be overridden in docker-compose.yaml)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> * Verify your `Dockerfile` exists in the `ui/` directory.
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
> │   │   ├── main.jsx      # new
> │   │   ├── App.jsx       # new
> │   │   ├── Todos.jsx     # new
> │   │   ├── CreateTodo.jsx # new
> │   │   └── globals.css   # new
> │   ├── index.html        # new
> │   ├── package.json      # new
> │   ├── vite.config.js    # new
> │   └── Dockerfile        # new
> └── .env
> ```

