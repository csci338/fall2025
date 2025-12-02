---
title: "Backend + Frontend Extensions"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---

At this point, you should have a **working TODO application** with a single Todo model (SQLAlchemy), CRUD endpoints (FastAPI), and a basic React frontend. Your task is to enhance this application by completing:
* One required backend enhancement
* One required frontend enhancement

{:.info}
> ## Example
> Here is one example of how Sarah added a `Category` model (backend) and combined it with the `Mantine` React components (frontend) to create this App: 
> * Frontend: <a href="https://project02-fall2025-production-88d7.up.railway.app/" target="_blank">https://project02-fall2025-production-88d7.up.railway.app/</a>
> * Backend: <a href="https://project02-fall2025-production-88d7.up.railway.app/docs" target="_blank">https://project02-fall2025-production-88d7.up.railway.app/docs</a>.

You may also complete the extra credit (see the [extra credit section](#ec) below) to earn additional points.

{:#backend}
## 1. Required Backend Enhancement

You must choose **one** of the following two options:

### Option 1. Build Your Own Single-Model App

Replace the existing Todo model and all CRUD endpoints with a completely different single-model application. If you choose this option, you must:

1. Remove the Todo model and create a new model for your chosen domain
1. Update all CRUD endpoints to work with your new model
1. Update the frontend to match your new domain

{:.info}
> **Potential Ideas:**
>
> - **Favorite Music** - Track songs, artists, albums, etc.
> - **Web Bookmarks** - Save and organize bookmarks with tags and categories
> - **Recipe Collection** - Store recipes with ingredients, instructions, and cooking times
> - **Personal Library** - Track books you've read or want to read with ratings and notes


### Option 2. Extend the TODO App with a Second Model

Keep the existing Todo model and add a second database model with complete CRUD endpoints. If you choose this option, you must:

1. Create a new database model (e.g., Category, Tag, Note, User)
1. Establish a relationship between your new model and the Todo model (e.g., a Todo belongs to a Category, or a Todo has many Tags)
1. Create full CRUD endpoints for your new model (Create, Read, Update, Delete)
1. Update your frontend to interact with the new endpoints
1. Update your frontend to display and manage the relationship (e.g., show which category a todo belongs to, allow assigning categories to todos, allow user to display todos by user or by category)

{:.info}
> **Potential Ideas:**
>
> - **Categories** - Create a Category model, establish a many-to-one relationship (each Todo belongs to one Category), create CRUD endpoints for Categories, and update the UI to let users assign categories to todos
> - **Tags** - Create a Tag model, establish a many-to-many relationship (each Todo can have multiple Tags), create CRUD endpoints for Tags, and update the UI to let users add/remove tags from todos
> - **Notes** - Create a Note model, establish a one-to-one relationship (each Todo has one Note), create CRUD endpoints for Notes, and update the UI to display and edit notes
> - **Users** - Create a User model, establish a one-to-many relationship (each User has many todos), create CRUD endpoints for Users, and update the UI to support multiple users

{:#frontend}
## 2. Required Frontend Enhancement

In addition to your required backend enhancement, you must integrate widgets and components from **one or more** third-party component libraries into your React frontend. Specifically, you will complete the following 5 tasks:

1. **Install and configure** the component library in your React app (e.g., `npm install antd` or `npm install @mui/material`). You may need to wrap your app with the library's provider/theme component.
1. **Replace form components** - Use the library's form inputs, buttons, and form validation components instead of basic HTML form elements
1. **Replace list/display components** - Use the library's table, card, or list components to display your data (e.g., todos, categories, songs, etc.)
1. **Add interactive components** - Incorporate at least one advanced component from the library (e.g., modals/dialogs for creating/editing items, dropdowns/selects for filtering, notifications/alerts for user feedback, or icons from the library's icon set)
1. **Ensure consistency** - Your entire app should look cohesive and professional, using the library's design language consistently across all pages and components


{:.info}
> ### Popular component library options
> - **[Ant Design (antd)](https://ant.design/){:target="_blank"}** - Comprehensive, enterprise-grade components
> - **[Material-UI (MUI)](https://mui.com/){:target="_blank"}** - Google's Material Design for React
> - **[Chakra UI](https://chakra-ui.com/){:target="_blank"}** - Simple, accessible, great developer experience
> - **[React Bootstrap](https://react-bootstrap.github.io/){:target="_blank"}** - Familiar Bootstrap styling for React
> - **[Mantine](https://mantine.dev/){:target="_blank"}** - Modern, feature-rich component library
>
>
> ### Examples of what you might try
> - **Form replacement** - Replace your create/edit forms with the library's Form, Input, Button, and Select components (e.g., use Ant Design's `Form`, `Input`, `Button`, and `Select` components)
> - **List/table replacement** - Replace your todo list with the library's Table or Card components (e.g., use Material-UI's `Table` or Chakra UI's `Card` components to display items)
> - **Modal dialogs** - Use the library's Modal or Dialog component for creating/editing items instead of inline forms (e.g., use Ant Design's `Modal` or MUI's `Dialog`)
> - **Notifications** - Add success/error notifications when items are created, updated, or deleted (e.g., use Ant Design's `message` or MUI's `Snackbar`)
> - **Icons** - Replace any text-based buttons or labels with icons from the library's icon set (e.g., use Ant Design's `@ant-design/icons` or MUI's `@mui/icons-material`)


{:#ec.info}
## 3. Optional Enhancements

**Extra Credit:** Each of the enhancements listed below can earn your extra credit points, which will be applied to your Project 2 grade. You can complete as many extra credit enhancements as you'd like from the list below:

### 3.1. Add Search and Filtering (5pts)

Allow users to search todos by title or description, and filter by completion status, date created, or category.

**Skills practiced:**
- Frontend state management
- API query parameters
- Database queries with filters
- User experience design
{:.compact}

### 3.2. Add Pagination (5pts)

Instead of loading all todos at once, implement pagination to show 10-20 todos per page with "Next" and "Previous" buttons.

**Skills practiced:**
- Backend pagination logic
- Frontend pagination controls
- API design with limits and offsets
- Performance optimization
{:.compact}

### 3.3. Add Sorting (5pts)

Allow users to sort todos by different criteria: date created, title alphabetically, completion status, etc.

**Skills practiced:**
- Database ordering
- Frontend sorting controls
- Query parameter handling
- User interface design
{:.compact}

### 3.4. Add Due Dates and Reminders (5pts)

Add a `due_date` field to todos and display todos that are overdue or due soon. Optionally, add visual indicators (colors, badges) for urgency.

**Skills practiced:**
- Date handling in Python and JavaScript
- Database date fields
- Conditional rendering in React
- Data validation
{:.compact}

### 3.5. Add Loading States and Error Handling (5pts)

Improve user experience by showing loading spinners while data is fetching, and displaying user-friendly error messages when something goes wrong.

**Skills practiced:**
- React state management
- Error boundaries
- User experience design
- Async/await error handling
{:.compact}

### 3.6. Add Data Export (5pts)

Allow users to export their todos to CSV or JSON format for backup or use in other applications.

**Skills practiced:**
- File generation on the backend
- File downloads in the browser
- Data serialization
- API response formatting
{:.compact}

### 3.7. Add Statistics Dashboard (10pts)

Create a dashboard that shows statistics about todos: total count, completed vs. incomplete, todos created this week, etc.

**Skills practiced:**
- Database aggregation queries
- Data visualization
- Component design
- API endpoint design
{:.compact}

### 3.8. Add an Additional Model + CRUD endpoints (10pts)

Create a Category or Tag model and establish a relationship with Todo (many-to-one or many-to-many). Allow users to assign categories to todos and filter by category.

**Skills practiced:**
- Database relationships (foreign keys)
- SQLAlchemy relationships
- Join queries
- Complex data modeling
{:.compact}

### 3.9. Add UI elements to interact with the endpoints you created in 3.8. (10pts)

Create a Category or Tag model and establish a relationship with Todo (many-to-one or many-to-many). Allow users to assign categories to todos and filter by category.

**Skills practiced:**
- Database relationships (foreign keys)
- SQLAlchemy relationships
- Join queries
- Complex data modeling
{:.compact}

{:.info}
> ## <i class="fa-regular fa-circle-check"></i> 4. Before you move on 
> Make sure you have completed:
> 
> {:.checkbox-list}
> - The required [backend enhancements](#backend) (either option 1 or 2)
> - The required [frontend enhancements](#frontend)
>
> [Extra credit enhancements](#ec) (2.1-2.9) are optional but can earn you additional points (point values noted in the task).


[← Back to Project 2 Instructions](project02)
