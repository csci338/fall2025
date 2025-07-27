---
layout: assignment-two-column
title: AsyncIO + MVC
type: lab
abbreviation: Lab 7
draft: 1
points: 6
num: 7
start_date: 2025-10-30
due_date: 2025-11-06
---

## Set Up
Before you begin, get the latest code from <a href="https://github.com/csci338/class-exercises-fall2025" target="_blank">class-exercises-fall2025</a>. 
* If you are a Windows user, you will do this lab (and all subsequent work in this class) using the WSL terminal.

**On GitHub:**
* Sync the latest changes from the class version of `class-exercises-fall2025` to your copy of the repo on GitHub.

**On your local computer:**
* Make sure that all of your changes from the last lab are staged and committed.
* Checkout your main branch: `git checkout main`
* Pull down the latest changes: `git pull`
    * If you did it correctly, you will notice that a new `lab07` folder has been created.
* Create a new branch called lab07-b: `git checkout -b lab07-b`
* Verify that you're on your new branch: `git branch`

## Install the dependencies, run your webserver
Once you've created your `lab07-b` branch, open the `lab07` folder in your code editor, and navigate to the `lab07` folder on your terminal. We will not be using Docker -- just poetry. Please install the dependencies and run your app as follows:

```bash
poetry install
cd app
poetry run uvicorn server:app --reload
```

*Note that if port 8000 is already being used, you can always run your web server on a different port by using the `--port` flag:*

`poetry run uvicorn server:app --reload --host 0.0.0.0 --port 8001`

If you did this correctly you should see some output like this:

```
No dependencies to install or update
INFO:     Will watch for changes in these directories: ['/../csci338/fall2025/class-exercises-fall2025/lab07/app']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [27120] using StatReload
INFO:     Started server process [27124]
INFO:     Waiting for application startup.
INFO:     Application startup complete.

```

You are now ready to use your app.

### Test out your app
* In your browser, navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000) (or whichever port you're using)
* Note that it gives you an error, telling you that `place_name` is required. This means that the endpoint of your server needs a value for the `place_name` argument in order to know which place to get information from. Try your query again with the required data:
* [http://127.0.0.1:8000?place_name=Asheville](http://127.0.0.1:8000?place_name=Asheville)
* Try using different values for the `place_name` argument to see what happens.

{:.info}
> ### Questions to ask yourself
> * Where is this data coming from?
> * Is there a way to make this interface more user-friendly and engaging?
> * How is AsyncIO being used here, and what advantages are there to using it?

## Introduction to MVC
Lab 7 implements a MVC architecture (Model, View, Controller) architecture using a few different Python libararies including:
1. [FastAPI](https://fastapi.tiangolo.com/),
2. AsyncIO, and 
3. [Jinja](https://jinja.palletsprojects.com/en/stable/templates/) (a templating engine)

MVC is a design pattern that separates an application into three interconnected components:
- **Model**: Manages the data and logic (e.g., fetching weather data, restaurant data, cat facts, etc.).
- **View**: Handles the presentation layer (e.g., HTML templates).
- **Controller**: Orchestrates the flow of data between the Model and View (e.g., FastAPI routes).

This separation makes the code easier to manage and scale. Let's walk through the code to understand how these components work together.


### Models - Organizing and Fetching Data
Start by opening the `models.py`. This file handles data fetching. Each function retrieves information from various APIs, by using a helper function that makes asynchronous network requests:

```py
# async helper function:
async def fetch_data_from_server(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            try:
                return await response.json()
            except:
                response = await response.text()
                return {
                    "message": (
                        f"Error decoding JSON data. Here was the response: `{response}`"
                    )
                }
```

Let's break this function down, because it's at the heart of this app:


#### 1. Asynchronous function definition
`async def fetch_data_from_server(url):`

An *asynchronous function definition* (declared with async def) can perform non-blocking I/O operations, like making HTTP requests without blocking the rest of the program.

#### 2. Aiohttp Client Session
`async with aiohttp.ClientSession() as session:`

* `aiohttp` is an asynchronous HTTP client for Python.
* `ClientSession()` creates a session object that manages and persists settings like headers and cookies across requests.
* `async with` ensures the session is properly closed after use, even if an error occurs.

#### 3. Sending a GET Request:

`async with session.get(url) as response:`

* `session.get(url)` sends an asynchronous GET request to the provided url.
* `async with` ensures the response object is properly closed once the block ends.


#### 4. Handling the Response:

`return await response.json()`

* `await` makes the coroutine pause execution here until the JSON is fetched and parsed.
* `await response.json()` tries to parse the response body as JSON once it has been transmitted.

#### 5. Error Handling:

```
except:
    response = await response.text()
    return {
        "message": (
            f"Error decoding JSON data. Here was the response: `{response}`"
        )
    }
```
Network requests often fail for a variety of reasons. If JSON decoding fails (meaning that there's a problem with the message), the except block handles the error.
* `await response.text()` retrieves the raw response body as a string.
* It then returns a dictionary with an error message and the raw response content, which can help diagnose the issue.

### Example Model:
Let's take a look at the `get_yelp_data` function...
```python
async def get_yelp_data(place):
    url = f"{ENDPOINT_YELP}?location={place}&limit=20"
    print(url)
    places = await fetch_data_from_server(url)
    try:
        return random.choice(places)
    except:
        return places
```

Using the `fetch_data_from_server` helper function, this function's job is to first query for the first 20 businesses associated with the place that is passed in as an argument, and then it returns one of those businesses at random.

{:.info}
> ### 1. Model Task
> 1. Add a new function `get_dog_image()` that retrieves a random dog image from the "https://dog.ceo/api/breeds/image/random" API.


### Controller - Managing Requests
The `server.py` file acts as the controller. It receives HTTP requests, fetches data using model functions, and returns a response.

#### Example:
```python
@app.get("/")
async def home(request: Request, place_name: str = Query(None)):
    if place_name is None:
        return "The `place_name` query parameter is required."

    start = time.time()
    # we're making these I/O-bound function invocations asynchronous:
    weather_data, yelp_data, wikipedia_data, cat_fact, joke = await asyncio.gather(
        models.get_weather(place_name),
        models.get_yelp_data(place_name),
        models.get_wikipedia(place_name),
        models.get_cat_fact(),
        models.get_joke(),
    )
    end = time.time()

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "time_taken": f"{end - start:.2f} seconds",
            "place_name": place_name,
            "weather": weather_data,
            "cat_fact": cat_fact["fact"],
            "joke": joke,
            "yelp_data": yelp_data,
            "wikipedia_data": wikipedia_data,
        },
    )
```

This function listens for GET requests on the `/` route. The user is required to provide a `place_name` argument. The function then invokes multiple model functions asynchronously using the `await asyncio.gather()` function. Once all coroutines resolve (after responses are received from the various servers), the data are passed into a templating function (rendered in the view)

{:.info}
> ### 2. Controller Task
1. Modify both the `/` and the `/api` endpoints so that data from the `get_dog_image()` function is output (name the key `dog_data`).
2. Visit `http://localhost:8000/api` to verify the result.

---

### View - Displaying Data
The `index.html` file inside the `templates/` directory presents data to the user. This template is a combination of "vanilla" HTML and python expressions (surrounded by double curly braces. Note that only keys that were passed into the template are available to the template.

#### Example:
```html
 <p>Cat Fact: {{ cat_fact }}</p>
```

{:.info}
> ### 3. View Task
1. Add a new `<img src="??????" />` element to display a photo of your dog (stored in the `dog_data` key) in `index.html`. Use the double curly braces to output the correct value from the data.


## Extra Tasks
* Try displaying the data from Wikipedia in a nicer format using HTML (e.g., if there's a photo of the city, show it).
* Try displaying the data from Yelp in a nicer format using HTML (e.g., if there's a photo of the city, show it).

### Useful documentation
* [FastAPI](https://fastapi.tiangolo.com/)
* [Jinja templates](https://jinja.palletsprojects.com/en/stable/templates/)



## What to Submit
Verify that you have completed the three tasks described above:
1. Model Task
1. Controller Task
1. View Task

When you're done, commit and push your lab07-b branch to GitHub and make a pull request. Please ensure that the destination (left-hand side) is pointing to the main branch of your repo and the source (right-hand side) is pointing to the lab06 branch of your repo. Then, please paste a link to your PR in the Moodle.