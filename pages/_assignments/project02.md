---
title: "Full Stack Application"
layout: assignment-two-column
type: project
draft: 1
points: 20
abbreviation: Project 2
num: 2
h_max: 2
start_date: 2025-11-15
due_date: 2025-12-05
---

This guide will walk you through building a complete full-stack application from scratch. Follow each section in order, and verify your work at each checkpoint.

## Table of Contents

1. [Project Setup & Git](project02-01-setup)
2. [Database](project02-02-database)
3. [Backend](project02-03-backend)
4. [Frontend](project02-04-frontend)
5. [Docker Configuration](project02-05-docker)
6. [CI/CD Pipeline](project02-06-cicd)
7. [Railway Deployment](project02-07-railway)

---

## Final Validation Checklist

Before submitting, verify:

{:.checkbox-list}
- All Dockerfiles exist and are in correct locations
- `pyproject.toml` has exact dependency versions listed
- `package.json` has exact dependency versions listed
- `docker-compose.yaml` exists and all services are defined
- `.gitignore` is in place
- Application runs with `docker-compose up`
- Frontend connects to backend API
- CRUD operations work (Create, Read, Update, Delete todos)
- Production Dockerfile builds successfully
- Git repository initialized and code committed
- GitHub Actions workflow file exists (`.github/workflows/pr.yml`)
- GitHub Actions workflow runs successfully (green checkmarks)

---

{:.info}
> ## Common Issues and Solutions
>
> ### Issue: "Command not found: poetry"
> **Solution:** Make sure you've run `poetry install` in the backend directory.
>
> ### Issue: "Module not found" errors
> **Solution:** Verify all dependencies are installed and versions match exactly.
>
> ### Issue: Database connection errors
> **Solution:** Check that the database service is healthy before the backend starts (healthcheck in docker-compose).
>
> ### Issue: Frontend can't connect to backend
> **Solution:** Verify `VITE_API_URL` environment variable is set correctly in docker-compose.
>
> ### Issue: Port already in use
> **Solution:** Change ports in docker-compose.yaml or stop other services using those ports.
>
> ### Issue: GitHub Actions fails
> **Solution:** 
> - Check the error message in the Actions tab
> - Run the same commands locally that failed in CI
> - Fix formatting: `poetry run black .` and `poetry run isort .` in backend
> - Fix linting: `npm run fix` in frontend
> - Commit and push again
>
> ### Issue: "Workflow file not found" in GitHub Actions
> **Solution:** Make sure `.github/workflows/pr.yml` exists and is committed to the repository.


## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vite Documentation](https://vitejs.dev/)


## Grading Criteria

Your project will be evaluated on:

1. **Correctness:** All CRUD operations work
2. **Code Quality:** Clean, readable code following best practices
3. **Docker Setup:** All containers build and run correctly
4. **Production Ready:** Production Dockerfile works
5. **Documentation:** Code is well-commented

Good luck!

