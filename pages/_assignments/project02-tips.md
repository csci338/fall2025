---
title: "Tips"
layout: assignment-two-column
type: partial
draft: 0
abbreviation: "Project 2"
num: 2
parent: project02
start_date: 2025-11-15
due_date: 2025-12-05
---

## Common Issues and Solutions

### Issue: "Command not found: poetry"
**Solution:** Make sure you've run `poetry install` in the backend directory.

### Issue: "Module not found" errors
**Solution:** Verify all dependencies are installed and versions match exactly.

### Issue: Database connection errors
**Solution:** Check that the database service is healthy before the backend starts (healthcheck in docker-compose).

### Issue: Frontend can't connect to backend
**Solution:** Verify `VITE_API_URL` environment variable is set correctly in docker-compose.

### Issue: Port already in use
**Solution:** Change ports in docker-compose.yaml or stop other services using those ports.

### Issue: GitHub Actions fails
**Solution:** 
- Check the error message in the Actions tab
- Run the same commands locally that failed in CI
- Fix formatting: `poetry run black .` and `poetry run isort .` in backend
- Fix linting: `npm run fix` in frontend
- Commit and push again

### Issue: "Workflow file not found" in GitHub Actions
**Solution:** Make sure `.github/workflows/pr.yml` exists and is committed to the repository.


## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vite Documentation](https://vitejs.dev/)
