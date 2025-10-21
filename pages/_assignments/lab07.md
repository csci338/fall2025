---
layout: assignment-two-column
title: AsyncIO + MVC
type: lab
abbreviation: Lab 7
draft: 0
points: 6
num: 7
start_date: 2025-10-21
due_date: 2025-10-28
---

{:.info}
> <a href="https://docs.google.com/presentation/d/1Phlll9bNNabM4nyGMQGWq4sEAW8w4Ncq/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true" target="_blank">Slides for today's Lab</a>

## Set Up
Get the latest code from `https://github.com/<your_github_handle>/class-exercises-fall2025` by syncing changes to your GitHub repo (click the "Sync Fork" button).

Then, on your local machine, make sure that all previous work is committed. Then:

```bash
git checkout main
git pull
git checkout -b lab07-b
```

## Run the Application
```bash
poetry install
cd app
poetry run uvicorn server:app --reload
```

Visit [http://127.0.0.1:8000?place_name=Asheville](http://127.0.0.1:8000?place_name=Asheville) to test the app.

## MVC Architecture
This lab uses **MVC (Model-View-Controller)** pattern with FastAPI, AsyncIO, and Jinja templates:

- **Model** (`models.py`): Fetches data from APIs asynchronously
- **View** (`templates/index.html`): Displays data using HTML templates  
- **Controller** (`server.py`): Handles HTTP requests and coordinates data flow

The app uses `asyncio.gather()` to fetch multiple API responses concurrently, making it much faster than sequential requests.

## Tasks

### 1. Model Task
Add a `get_dog_image()` function in `models.py` that fetches from "https://dog.ceo/api/breeds/image/random"

### 2. Controller Task  
Modify both `/` and `/api` endpoints in `server.py` to include `dog_data` from your new function

### 3. View Task
Add an `<img>` element in `templates/index.html` to display the dog image. Use the double curly braces to output the correct value from the data.


## Extra Tasks
* Format Wikipedia and Yelp data more nicely in the HTML template
* Add images from the APIs to make the display more engaging

## Submission
Complete all three tasks, then:
1. Commit and push your `lab07-b` branch
2. Create a pull request to `main` 
3. Submit the PR link in Moodle

**Resources:** 
* [FastAPI](https://fastapi.tiangolo.com/)
* [Jinja Templates](https://jinja.palletsprojects.com/en/stable/templates/)
