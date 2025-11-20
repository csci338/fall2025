---
title: "Enhancements"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---

Now that you have a working full-stack application, here are some ways you can enhance it! These suggestions will help you practice new skills and make your application more feature-rich.


## Required Enhancements

**Required Enhancements:** You must complete **two of the first three enhancements** (options 1, 2, or 3). These are required components of your project.If you choose option 1 (Replace the Existing Data Model), you are still required to complete one additional enhancement from options 2 or 3.

### 1. Replace the Existing Data Model and UI with Your Own

Replace the TODO application with a completely different domain. Examples include:
- **Favorite Songs** - Track songs, artists, albums, ratings, genres
- **Web Bookmarks** - Save and organize bookmarks with tags and categories
- **Course-Specific Todo Lists** - Separate todo lists for different courses (e.g., CSCI 338, MATH 101)
- **Recipe Collection** - Store recipes with ingredients, instructions, and cooking times
- **Personal Library** - Track books you've read or want to read with ratings and notes

This involves creating new database models, updating all CRUD endpoints, and redesigning the entire frontend UI to match your new domain.

**Skills practiced:**
- Complete system redesign
- Database schema design
- Full-stack application development
- UI/UX design for a specific domain
- Creative problem-solving

### 2. Add a New Model with CRUD Endpoints

Create a second database model (like Categories, Tags, Notes, or Users) and build complete CRUD endpoints for it. Then update your React frontend to interact with these new endpoints.

**Skills practiced:**
- Database modeling
- API endpoint creation
- Frontend-backend integration
- Component communication

### 3. Integrate a Design System

Replace your custom CSS with a professional design system. Popular options include:

- **Ant Design (antd)** - Comprehensive, enterprise-grade components
- **Material-UI (MUI)** - Google's Material Design for React
- **Chakra UI** - Simple, accessible, great developer experience
- **React Bootstrap** - Familiar Bootstrap styling for React
- **Mantine** - Modern, feature-rich component library

**Skills practiced:**
- Working with third-party libraries
- Component composition
- Design system patterns
- Professional UI/UX

## Optional Enhancements

**Extra Credit:** Each of the remaining enhancements (options 4-11) is worth **5 points of extra credit** toward your overall project grade. You can complete as many extra credit enhancements as you'd like.

### 4. Add Search and Filtering

Allow users to search todos by title or description, and filter by completion status, date created, or category.

**Skills practiced:**
- Frontend state management
- API query parameters
- Database queries with filters
- User experience design

### 5. Add Pagination

Instead of loading all todos at once, implement pagination to show 10-20 todos per page with "Next" and "Previous" buttons.

**Skills practiced:**
- Backend pagination logic
- Frontend pagination controls
- API design with limits and offsets
- Performance optimization

### 6. Add Sorting

Allow users to sort todos by different criteria: date created, title alphabetically, completion status, etc.

**Skills practiced:**
- Database ordering
- Frontend sorting controls
- Query parameter handling
- User interface design

### 7. Add Due Dates and Reminders

Add a `due_date` field to todos and display todos that are overdue or due soon. Optionally, add visual indicators (colors, badges) for urgency.

**Skills practiced:**
- Date handling in Python and JavaScript
- Database date fields
- Conditional rendering in React
- Data validation

### 8. Add Loading States and Error Handling

Improve user experience by showing loading spinners while data is fetching, and displaying user-friendly error messages when something goes wrong.

**Skills practiced:**
- React state management
- Error boundaries
- User experience design
- Async/await error handling

### 9. Add Data Export

Allow users to export their todos to CSV or JSON format for backup or use in other applications.

**Skills practiced:**
- File generation on the backend
- File downloads in the browser
- Data serialization
- API response formatting

### 10. Add Statistics Dashboard

Create a dashboard that shows statistics about todos: total count, completed vs. incomplete, todos created this week, etc.

**Skills practiced:**
- Database aggregation queries
- Data visualization
- Component design
- API endpoint design

### 11. Add Categories or Tags with Relationships

Create a Category or Tag model and establish a relationship with Todo (many-to-one or many-to-many). Allow users to assign categories to todos and filter by category.

**Skills practiced:**
- Database relationships (foreign keys)
- SQLAlchemy relationships
- Join queries
- Complex data modeling

## Getting Started

**Required:** Complete **two of the first three enhancements** (options 1, 2, or 3).

**Optional:** Complete any of the extra credit enhancements (options 4-11) for additional points. Start with the simplest one to build confidence, then tackle more complex features.

**Tips:**
- Work on one enhancement at a time
- Test thoroughly after each change
- Commit your work frequently
- Use your GitHub Actions workflow to catch issues early
- Don't be afraid to experiment and learn!

{:.info}
> ### <i class="fa-regular fa-circle-check"></i> Before you move on 
> Make sure you understand:
> - You must complete **two of the first three enhancements** (options 1, 2, or 3)
> - Each extra credit enhancement (options 4-11) is worth 3 points
> - Choose enhancements that interest you and will help you practice new skills

---

[← Back to Project 2 Instructions](project02)
