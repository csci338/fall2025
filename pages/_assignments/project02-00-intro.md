---
title: "Introduction to the Project"
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

Congratulations! You've made it to the end of Software Engineering. For your final assignment, you'll build a complete full-stack web application from scratch.

## What You'll Build

Throughout this semester, you've worked with individual pieces of a full-stack system. Now it's time to put it all together and build a complete application that includes:

### Development Environment
- **Database Container** - PostgreSQL database running in Docker
- **Backend Container** - FastAPI server with REST API endpoints
- **Frontend Container** - React application with modern UI
- **Docker Compose** - Orchestrates all three containers locally

### Code Development
- **Backend Code** - FastAPI routes, database models, business logic
- **Frontend Code** - React components, API integration, user interface
- **Code Quality** - Formatting (Black, Prettier) and linting (flake8, ESLint)

### Continuous Integration
- **GitHub Actions** - Automated code quality checks on every push
- **Workflow Automation** - Catches issues before they reach production

### Production Deployment
- **Cloud Database** - PostgreSQL database hosted on Railway
- **Production Container** - Optimized Docker image for deployment
- **Live Application** - Your app accessible on the internet via Railway

## Architecture: Development vs. Production

### Development Architecture (Local)

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Laptop (Development)                │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   Browser    │────────▶│  Frontend    │                  │
│  │              │  :5173  │  Container   │                  │
│  │ localhost    │◀────────│  (React)     │                  │
│  └──────────────┘         └──────┬───────┘                  │
│                                  │                          │
│                                  │ HTTP Requests            │
│                                  │ (localhost:8000)         │
│                                  ▼                          │
│                          ┌──────────────┐                   │
│                          │   Backend    │                   │
│                          │  Container   │                   │
│                          │  (FastAPI)   │                   │
│                          └──────┬───────┘                   │
│                                 │                           │
│                                 │ SQL Queries               │
│                                 │ (Docker network)          │
│                                 ▼                           │
│                          ┌──────────────┐                   │
│                          │  Database    │                   │
│                          │  Container   │                   │
│                          │ (PostgreSQL) │                   │
│                          └──────────────┘                   │
│                                                             │
│  All containers managed by docker-compose.yaml              │
│  Code changes reflect immediately (hot reload)              │
└─────────────────────────────────────────────────────────────┘
```

**Key characteristics:**
- All services run on your laptop
- Docker Compose manages containers
- Hot reload for rapid development
- Local database with test data
- Development tools enabled (debugging, verbose logging)

### Production Architecture (Railway)

```
┌─────────────────────────────────────────────────────────────┐
│                      Internet Users                         │
│                                                             │
│  ┌──────────────┐                                           │
│  │   Browser    │                                           │
│  │              │                                           │
│  │  https://    │                                           │
│  │  your-app.   │                                           │
│  │  railway.app │                                           │
│  └──────┬───────┘                                           │
│         │                                                   │
│         │ HTTPS Requests                                    │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Railway Platform                        │   │
│  │                                                      │   │
│  │  ┌──────────────┐         ┌──────────────┐           │   │
│  │  │  Frontend    │────────▶│   Backend    │           │   │
│  │  │  Container   │  HTTP   │   Container  │           │   │
│  │  │  (React)     │◀────────│  (FastAPI)   │           │   │
│  │  └──────────────┘         └──────┬───────┘           │   │
│  │                                  │                   │   │
│  │                                  │ SQL Queries       │   │
│  │                                  │ (SSL connection)  │   │
│  │                                  ▼                   │   │
│  │                           ┌──────────────┐           │   │
│  │                           │   Railway    │           │   │
│  │                           │   PostgreSQL │           │   │
│  │                           │   Database   │           │   │
│  │                           │  (Managed)   │           │   │
│  │                           └──────────────┘           │   │
│  │                                                      │   │
│  │  Each service runs in its own isolated container     │   │
│  │  Database is managed by Railway (separate service)   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key characteristics:**
- Services run on Railway's cloud infrastructure
- Each service is independently scalable
- Database is a managed service (not a container)
- HTTPS encryption for all traffic
- Optimized for performance (no hot reload, production builds)
- Accessible from anywhere on the internet

## Project Overview

This project is divided into several sections, each building on the previous:

1. **Setup & Git** - Project structure, Git repository, GitHub connection
2. **Database** - PostgreSQL container configuration
3. **Backend** - FastAPI server with CRUD endpoints, models, and database connection
4. **Frontend** - React application with API integration
5. **Docker Configuration** - Development and production container setup
6. **Continuous Integration** - GitHub Actions for automated code quality checks
7. **Cloud Deployment** - Railway setup with production database and containers
8. **Working with Containers** - Commands for package management and database queries
9. **Enhancements** - Ideas for extending your application

## Learning Objectives

By completing this project, you will:

- **Understand full-stack architecture** - How frontend, backend, and database work together
- **Master containerization** - Docker and Docker Compose for development and production
- **Practice CI/CD** - Automated testing and code quality checks
- **Deploy to production** - Real-world cloud deployment on Railway
- **Write production-quality code** - Formatting, linting, and best practices
- **Build a portfolio project** - A complete application you can showcase

## Getting Started

This project builds incrementally. Follow each section in order, and don't skip ahead! Each section includes checkpoints to verify your progress before moving on.

**Ready to begin?** Start with the Setup & Git section to create your project structure.

---

[← Back to Project 2 Instructions](project02)
