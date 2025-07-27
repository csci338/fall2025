---
title: "Full Stack Application: Student Academic Management Tool"
layout: assignment-two-column
type: project
draft: 1
points: 20
abbreviation: Project 2
num: 2
h_max: 5
start_date: 2025-10-30
due_date: 2025-12-09
hide: true
---

<style>
    .info .highlight, .info .highlight pre, .info .highlight table {
        background: transparent !important;
        color: #242424 !important;
    }

    .info > ol > li,
    .info > ul > li {
        margin-bottom: 20px;
    }

    .info > ol > li > ul > li {
        margin-top: 0px !important;
    }

    .info code.highlighter-rouge {
        font-weight: bold;
        background: transparent;
    }

    .rubric td:first-child {
        min-width: 130px;
    }

    .roles th:first-child {
        min-width: 20px;
        width: 20px;
    }
    .roles th:nth-child(2) {
        max-width: 400px;
        width: 400px;
    }
    .deliverables th:nth-child(1), 
    .deliverables th:nth-child(4)  {
        max-width: 100px;
        width: 100px;
    }
</style>

{% include walkthrough-project02.html %}

{:.info}
> ## Learning Objectives
> * <a href="https://docs.google.com/presentation/d/1Z8XO6V68mKqFuXPMzrDp8melq0o-Pm8r/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true">Overview Slides</a>
> 
> This project is designed to give you practice working with real-world software engineering tools and practices including:
> 
> 1. **Version Control Workflows & DevOps**
     * Extending and contributing to an existing codebase.
     * Using version control workflows (branches, commits, merges, pull requests).
     * Working within the continous integration pipeline (linting, testing, GitHub Actions).
     * Debugging and troubleshooting deployment issues in a realistic environment.
     * "Everything as code" -- managing your dependencies, containers, continuous integration pipelines, and infrastructure configurations in declarative files (e.g., `package.json`, `pyproject.toml`, `Dockerfile`, `compose.yml`, GitHub workflow `.yml` files).
     * Deploying a full-stack app to a cloud platform (e.g., Render, Railway, or Fly.io).
> 
> 1. **Project Management & Communication**
    * Creating a shared project plan, assign tasks, and manage progress.
    * Communicating effectively with teammates during development.
    * Identifying meaningful new features that add value to a real-world academic planning tool.
    * Translating ideas into working, testable software components.
> 
> 1. **Programming**
    * Designing and implementing new backend routes using FastAPI.
    * Creating and using new SQLAlchemy models to represent domain concepts.
    * Building corresponding frontend screens with React and TypeScript.
    * Connecting frontend and backend using RESTful API conventions.
    * Writing tests

## Project Overview
The goal of this project is to extend a partially completed Academic Planning web application built with **React** (frontend), **FastAPI** (backend), and **PostgreSQL** (database) using **SQLAlchemy** (ORM).

This tool currently supports basic features like viewing available courses and adding them to a schedule. Your job is to enhance it by designing and implementing two new API routes, two new models, and two corresponding screens in the frontend. Your additions should provide real value to users—think creatively about what students, advisors, or faculty might need in a planning tool.

In addition to coding, this project emphasizes collaboration, version control workflow, and deployment. You’ll be expected to use Git to manage your work, open Pull Requests for review, and deploy your final project to a cloud platform.

You’ll work in small teams, planning features together, dividing work, resolving conflicts, and managing deadlines. Use your project management skills to create a plan and iterate toward a polished final product. 

## Roles and Responsibilities
There are many different roles that are necessary to make your project successful. Talk with your team around dividing up these roles. Multiple people can share a role; people can also rotate in and out of roles. You get to decide.

<table class="roles">
  <thead>
    <tr>
      <th></th>
      <th>Role & Focus</th>
      <th>Responsibilities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td><strong>Project Manager</strong>: Communication, planning, coordination</td>
      <td>
        <ul>
          <li>Facilitate planning meetings and daily check-ins</li>
          <li>Coordinate task breakdown and assignments</li>
          <li>Maintain a task board (Trello, GitHub Projects, etc.)</li>
          <li>Keep team on schedule and within scope</li>
          <li>Communicate with the instructor if blockers arise</li>
          <li>Reviewing and signing off on pull requests</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>2.</th>
      <td><strong>Backend</strong>: FastAPI routes and application logic</td>
      <td>
        <ul>
          <li>Design and implement new API endpoints</li>
          <li>Coordinate with frontend and database on interfaces</li>
          <li>Write request/response schemas (Pydantic models)</li>
          <li>Implement business logic and validation</li>
          <li>Write unit tests for backend functions</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>3.</th>
      <td><strong>Database</strong>: SQLAlchemy models and PostgreSQL schema</td>
      <td>
        <ul>
          <li>Design and implement SQLAlchemy models and relationships</li>
          <li>Plan and apply database migrations</li>
          <li>Seed database with sample data</li>
          <li>Optimize queries</li>
          <li>Collaborate with backend on data models</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>4.</th>
      <td><strong>Frontend/UI</strong>: React components and user experience</td>
      <td>
        <ul>
          <li>Build new screens for added features</li>
          <li>Connect frontend to new API routes</li>
          <li>Ensure responsive, accessible UI</li>
          <li>Manage state effectively</li>
          <li>Reuse components where possible</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>5.</th>
      <td><strong>DevOps & Deployment</strong>: Infrastructure, deployment, CI/CD</td>
      <td>
        <ul>
          <li>Set up or maintain deployment (Render, Railway, Fly.io)</li>
          <li>Manage environment variables and secrets</li>
          <li>Write deployment documentation</li>
          <li>Troubleshoot cloud issues</li>
          <li>Optionally add CI/CD pipelines</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>6.</th>
      <td><strong>QA / Testing</strong>: Testing, bug tracking, polish</td>
      <td>
        <ul>
          <li>Write and run unit/integration/manual tests</li>
          <li>Track and report bugs</li>
          <li>Coordinate end-to-end testing</li>
          <li>Ensure a clean, professional user experience</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>7.</th>
      <td><strong>Documentation & Demo</strong>: Docs, polish, final presentation</td>
      <td>
        <ul>
          <li>Write setup and usage documentation (README.md)</li>
          <li>Create screenshots, gifs, or a demo video</li>
          <li>Help prepare final presentation</li>
          <li>Ensure codebase is organized for review/demo</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Starter Code
The starter code provided to you includes the following:

### Backend Starter Code
- Prebuilt FastAPI endpoints:
  - `POST /api/token` – Get a JWT token.
  - `GET /api/courses` – Retrieves all available courses and filters on select attributes (e.g., instructor, location, etc.).
  - `GET /api/schedule/me/` – Retrieves courses associated with the logged-in user's schedule (basic functionality, in need of enhancements).
- User authentication system (JWT-based login/logout).
- Prebuilt PostgreSQL database with the following SQLAlchemy models:
  - User
  - Course
  - Instructor
  - Location
  - Schedule

### Frontend Starter Code
- Starter React app with:
  - Login screen
  - Simple search form to retrieve courses matching a user's query preferences
  - A fake schedule with some dummy classes

### Declarative System Files
- Dockerfiles for both development and for cloud deployment
- Linter and formatter scripts
- A starter GitHub actions script for continuous integration

## Team Assignments
Your teams are listed below. Each member of your team has been assigned a task from the GitHub Issue Tracker. Some of you will be working on the same Python class, so make sure you only work on the tasks to which you were assigned:

{% expandable expanded="true" level=3 title="Team 1" %}
Please see your team's <a href="https://github.com/csci338/p02-team01-fall2025" target="_blank">repo</a> and <a href="https://github.com/csci338/p02-team01-fall2025/issues" target="_blank">issue tracker</a> for more information. Members of your team are:

| 1. | Anis | agolriz714 | Implement the `Course` class |
| 2. | Simon | sstout660 | Implement the `Courses` class |
| 3. | Ethan | EPC233 | Implement the `UserPreferences` class |
| 4. | Tristan | DaemonTokisaki | Implement the `CourseFilter` class |
| 5. | Ben | blynch87 | Implement the `UI` functions (`ui.py`) |
| 6. | Dawson | Dawsonmaz13 | Implement the `Schedule` class (except for `send_email`) |
| 7. | Vlad | vlkrvc | Implement the `send_email` method of the `Schedule` class |

{% endexpandable %}

{% expandable expanded="true" level=3 title="Team 2" %}
Please see your team's <a href="https://github.com/csci338/p02-team02-fall2025" target="_blank">repo</a> and <a href="https://github.com/csci338/p02-team02-fall2025/issues" target="_blank">issue tracker</a> for more information. Members of your team are:

| 1. | Ellie | KailaBtw | Implement the `Course` class |
| 2. | Nathan | nhouston125 | Implement the `Courses` class |
| 3. | Robin | RobinPhillips98 | Implement the `UserPreferences` class |
| 4. | Darby | dsims2888 | Implement the `CourseFilter` class |
| 5. | Matias | MHWunca | Implement the `UI` functions (`ui.py`) |
| 6. | Ryan | reneuherz064 | Implement the `Schedule` class (except for `send_email`) |

{% endexpandable %}

{% expandable expanded="true" level=3 title="Team 3" %}
Please see your team's <a href="https://github.com/csci338/p02-team03-fall2025" target="_blank">repo</a> and <a href="https://github.com/csci338/p02-team03-fall2025/issues" target="_blank">issue tracker</a> for more information. Members of your team are:

| 1. | Connor | PhoenixUltra | Implement the `Course` class |
| 2. | Olle | OlleSL | Implement the `Courses` class |"
| 3. | Nikko | NikkoCC | Implement the `UserPreferences` class |
| 4. | Henry | wshaw1 | Implement the `CourseFilter` class |
| 5. | Lucas | lucas-simmons | Implement the `UI` functions (`ui.py`) |
| 6. | Max | GiggleMonster | Implement the `Schedule` class (except for `send_email`) |

{% endexpandable %}

{% expandable expanded="true" level=3 title="Team 4" %}
Please see your team's <a href="https://github.com/csci338/p02-team04-fall2025" target="_blank">repo</a> and <a href="https://github.com/csci338/p02-team04-fall2025/issues" target="_blank">issue tracker</a> for more information. Members of your team are:

| 1. | Given | givensuman | Implement the `Course` class |
| 2. | Tyler | Swissssst | Implement the `Courses` class |
| 3. | Caleb | TerminalCalamitas | Implement the `UserPreferences` class |
| 4. | Bryan | bmartin19 | Implement the `CourseFilter` class |
| 5. | Chris | ChrisB220 | Implement the `UI` functions (`ui.py`) |

{% endexpandable %}

## Potential Project Ideas
Your team will extend a partially completed Academic Planning web application, but feel free to interpret this assignment broadly. Possible ideas include:

1. **Course Planner**. Enhancing the schedule UI by displaying a weekly calendar of their courses; allowing students to map out the remaining courses they're thinking of taking.
1. **Study Group Manager**. Matches students with peers based on shared courses and availability; could include a chat or note-taking feature; each course could have an area for taking notes, uploading screenshots, etc.
1. **Internship / REU Tracker**. Assists students in tracking job applications and networking contacts; helps plan how to incorporate course assignments/projects into a resume, LinkedIn, GitHub, or portfolio.
1. **Task / Assignment Tracker**. Users log assignments, deadlines, and progress for each course; could include email/text notifications.
1. **Work/Life Balance Support**. Helps students consider how coursework supports other life priorities.
1. **Some other idea of your choice...** Feel free to propose your own interpretation of this assignment. Creativity is encouraged.

## Deliverables

{:.deliverables}
| Week | Milestone | Due | Link |
|--|--|--|--|
| **Week 1** | Set up repo, install Docker dependencies, run the app locally, familiarize with code, submit project description (1-page plan, basic wireframe, API endpoint descriptions). | 4/14 | [Project 2a](project02a) |
| **Week 3** | Midpoint Deliverable: Working modifications to backend and frontend + Cloud deployment. | 4/25 | [Project 2b](project02b) |
| **Week 5** | Final presentations. | 5/6 | In class |
| | Final Submission – Complete project, presentation, and final GitHub push. | 5/6 | Project 2c |

## Grading Criteria (100 Points)

{:.rubric}
| Category | Points | Description |
|----------|--------|-------------|
| **Project Proposal** | 5 | 1-page plan, basic wireframe, API endpoint descriptions. |
| **Midpoint Deliverable** | 10 | At least 1 meanful feature is implemented per teammate. |
| **Backend Functionality** | 20 | API and database work correctly (CRUD operations) + Tests. |
| **Frontend Functionality** | 20 | React app interacts successfully with the API. |
| **Cloud Deployment** | 15 | The app was successfully deployed. |
| **UI/UX Design** | 10 | Simple but intuitive frontend. |
| **Code Quality** | 15 | Clean, modular, readable code with meaningful commits and tests. |
| **Final Presentation** | 5 | 5-minute demo with a clear feature explanation. |

{% include project02c.md %}