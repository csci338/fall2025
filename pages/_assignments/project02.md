---
title: "Full Stack Application"
layout: assignment-two-column
type: project
draft: 0
points: 100
abbreviation: Project 2
num: 2
h_max: 3
start_date: 2025-11-15
due_date: 2025-12-05
---

This guide will walk you through building a complete full-stack application from scratch. Follow each section in order, and verify your work at each checkpoint.

<blockquote class="info">
{% expandable expanded="true" level=2 title="Collaboration & AI Policy"%}

**You may:**
- Discuss concepts, approaches, and debugging strategies with classmates
- Share links to documentation, tutorials, or Stack Overflow posts
- Help each other understand error messages or explain how technologies work
- Use AI tools (ChatGPT, GitHub Copilot, etc.) to help understand concepts, debug errors, or generate small code snippets

**You may NOT:**
- Share, copy, or view another student's code (including via screenshots, GitHub repos, or pair programming)
- Submit code written by someone else (including AI-generated code that you don't understand)
- Use AI tools to generate large portions of your application without understanding what the code does
- Post your code publicly or share it in a way that others can copy it

**Remember:** The goal is for you to learn and demonstrate your understanding. If you can't explain how your code works, you haven't learned it. All submitted code must be your own work, even if you received help understanding concepts or debugging issues.
{% endexpandable %}
</blockquote>

## Table of Contents

### Part 1. Build Your System
1. [Introduction](project02-00-intro)
1. [Project Setup & Git](project02-01-setup)
1. [Database](project02-02-database)
1. [Backend](project02-03-backend)
1. ["Starter" Frontend](project02-04-starter-ui)
1. [Build Your Containers with the Docker Compose File](project02-05-docker)

### Part 2. Get React to Communicate with FastAPI
1. [Implement Frontend <> Backend Communication](project02-06-enhanced-ui)
1. [Before Moving On: How to work with your containers](project02-07-working-with-your-containers)
1. [Add Continuous Integration on GitHub](project02-08-cicd)

### Part 3. Extending the App
1. [Backend + Frontend Extensions](project02-09-enhancements) (complete all required tasks)

### Part 4. Deployment
1. [Railway Deployment](project02-10-railway)


## What To Submit

### Before You Submit

Before submitting, verify you have completed all of the following:

**<span class="badge info">20 pts</span> Part 1: Build Your System**
- Project setup with Git repository 
- Database container created and configured
- Backend API with CRUD endpoints working
- Basic React frontend running
- Docker containers built and running locally
{:.checkbox-list}

**<span class="badge info">25 pts</span> Part 2: React ↔ FastAPI Communication**
- Frontend successfully communicates with backend API
- Can create, read, update, and delete items from the UI
- GitHub Actions CI/CD pipeline configured and passing
{:.checkbox-list}

**<span class="badge info">35 pts</span> Part 3: Required Enhancements**
- One required backend enhancement (Option 1 or Option 2)
- One required frontend enhancement (component library integration)
{:.checkbox-list}

**<span class="badge info">20 pts</span> Part 4: Deployment**
- Application deployed to Railway
- Production database configured
- Application accessible via public URL
{:.checkbox-list}

**Optional:** Complete any [extra credit enhancements](project02-09-enhancements#ec) for additional points.


### Submit
Once you have verified that your project is done, paste a link to your GitHub Repo and to your Railway deployment into the Moodle submission checkbox.

