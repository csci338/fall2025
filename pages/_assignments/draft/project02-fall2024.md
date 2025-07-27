---
title: "Full Stack Application"
layout: assignment-two-column
type: project
draft: 1
points: 20
abbreviation: Project 2
num: 2
h_max: 5
start_date: 2025-04-03
due_date: 2025-05-05
---

<style>
    .info .highlight, .info .highlight pre, .info .highlight table {
        background: transparent !important;
        color: #242424 !important;
    }

    .info ol li, .info > ul > li {
        margin-bottom: 20px;
    }

    .info ol, .info > ul {
        margin-top: 20px !important;
    }

    .info code.highlighter-rouge {
        font-weight: bold;
        background: transparent;
    }
</style>

{:.info}
> ## Project 2 / Exam Ground Rules
> For this project / exam, you can use any resource that you want with the exception of talking to your classmates. This assessment is meant to be done individually.
> * You may use Google / ChatGPT / other AI tools to help you understand the various libraries, dependencies, and techniques utilized in the project.
> * The short-answer questions should be expressed in your own words (versus copied from ChatGPT / the Internet). Think of these as potential interview questions that you should be able to answer.
> * You can ask Sarah questions during office hours or via email.
>     * Open office hours Mo-Th (12/9-12/12) from 2-3PM
>     * You can also <a href="https://calendar.app.google/iVbktstRnkS5uNTz9" target="_blank">schedule an appointment</a>

For Project 2 / the final exam (I've combined the two), you will complete a series of coding tasks and answer some questions in a copy of <a href="https://docs.google.com/document/d/1nySPayDV4pUvUcwM9eT465TjSKPSiV9r1KBqmWkEHRs/edit?usp=sharing" target="_blank">this Google Doc</a>. This activity is meant to give you exposure to making a "full stack" system and to integrate everything you've learned in this class into a single project.

## Installation & Set-Up
Make a a copy of <a href="https://docs.google.com/document/d/1nySPayDV4pUvUcwM9eT465TjSKPSiV9r1KBqmWkEHRs/edit?usp=sharing" target="_blank">this Google Doc</a> and write you name on it. Then:

### Pull down the starter files from GitHub
1. Get the latest code from <a href="https://github.com/csci338/class-exercises-fall2025" target="_blank">class-exercises-fall2025</a>. 

    * **On GitHub:** Sync the latest changes from the class version of `class-exercises-fall2025` to your copy of the repo on GitHub.
    * **On your local computer:**
        * Make sure that all of your changes from the last lab are staged and committed.
        * Checkout your main branch: `git checkout main`
        * Pull down the latest changes: `git pull`
            * If you did it correctly, you will notice that a new `project02` folder has been created.
        * Create a new branch called **project02**: `git checkout -b project02`
        * Verify that you're on your new branch: `git branch`


### Build your Docker Containers and Node.js Instance
1. After making sure that Docker is running, issue the following command from your command line: 
    
    ```
    docker compose up
    ```

    Be patient -- this script can take a while to configure the containers after the images have been built.

1. Verify that your backend container is running by navigating to <a href="http://localhost:8000/docs" target="_blank">http://localhost:8000/docs</a>. If you see an API Endpoint tester, you built your backend successfully.

1. You will run the frontend of your app on **your host computer** (not on Docker). You will configure your front-end as follows:

    1. Open your entire `project02-fall2025` in VS Code
    1. Navigate to your `ui` directory on the terminal
    1. Install the Node dependencies as follows:

        ```
        npm install
        ```

    1. Run your node server as follows:

        ```
        npm run dev
        ```

    1. Verify that your React service is running by navigating to <a href="http://localhost:5173" target="_blank">http://localhost:5173</a>. If you see a "Schedule Planner" interface, you have configured your frontend successfully.


## Understanding the Architecture of the system
You have created a system architecture that utilizes functionality from three different servers:
1. A database server (in Docker), which is accessible on your local computer via port **5433**
1. A web server for serving dynamic queries (in Docker), which is accessible on your local computer via port **8000**.
1. A web server for serving static HTML / CSS / JavaScript files (generated using React), which is accessible on your local computer via port **5173**.

Because the Python web server and the React server are using the HTTP protocol, you can access both of these services through your web browser (which understands how to interpret HTTP messages). On the other hand, your database server needs to be accessed using a client that understands PostgreSQL messages (e.g., `psql` command line tool, DBeaver, PG Admin 4).

## Your Tasks
This project / exam is divided into 5 sections:
1. Database tasks
1. SQLAlchemy / ORM tasks
1. FastAPI tasks
1. React tasks
1. Course synthesis questions (as this project is also your final exam)

Please complete all of the tasks for each section (as directed in the blue boxes). Before you submit, please double-check the checklist at the bottom of this page to ensure that you have completed all of the required tasks.

### 1. Querying the database using SQL (Docker DB container)
You can interact with your database on the command line by typing:

```bash
docker exec -it project02-db-1 bash
```

Then, once you're on the command line, connect to the database server, connect to the database you want to query, and issue some SQL queries:

```
psql -U postgres        # connects to the database
\l                      # lists the databases
\c schedulerdb          # connects to the schedulerdb database
\dt                     # lists all of the tables in the schedulerdb
```

{:.info}
> #### SQL Tasks
>  Complete the following SQL exercises and paste your answers into your Google Doc (linked to above):
> 
> 1. Write a query that outputs all rows and columns from the `users` table.
> 1. Write a query that outputs the `crn` and `title` of the courses in the `courses` table that are in the `CSCI` department.
> 1. Write a query that outputs a ***distinct*** list of all of the department codes in the `courses` table ordered alphabetically. Your output should look something like this:
> 
    ```
    department 
    ------------
    ACCT
    AFST
    AM
    AMS
    ANTH
    ...
    ```
> 
> 1. Write a query that outputs the course `crn` and `title` (from the courses table) and the `username` (from the schedule table). You will need to query 4 tables: schedule_courses, schedules users, and courses tables.  Your output should look something like this:
>
>    ```
                           title                       |  crn  | username 
    ---------------------------------------------------+-------+----------
    Academic Writing and Critical Inquiry              | 11127 | ablazer1
    Applied Music I: TBA                               | 10194 | ablazer1
    Critical Persp Contemporaneity                     | 10893 | ablazer1
    Special Topics: Advanced Topics in Ceramics: Wheel | 11017 | ablazer1
    Undergrad Research in IST                          | 11040 | ablazer1
    Advanced Creative Writing Workshop: Hybrid forms - | 10648 | aindelic
    Inquiry-Based Science, Physical Activity, and Heal | 10546 | aindelic
    Spanish for Advanced Beginners                     | 11075 | aindelic
    ...
    ```

### 2. Querying with SQLAlchemy & Python (Docker Server container)
In practice, data APIs rarely issue SQL commands directly. Rather, they use some kind of "object relational mapping" library, or ORM. Project 2 uses a library called SQL Alchemy (which you learned about in Lab 9). Let's get some additional practice using SQLAlchemy by connecting to our web server container and issuing some SQL Alchemy commands:


1. Connect to your docker container:

    ```bash
    docker exec -it project02-server-1 bash
    ```

1. Activate the poetry shell so that you can work with the ORM models and database using the existing python code that has already been set up for you:

    ```bash
    poetry shell
    ```

1. Open your `project02-fall2025` directory in VS Code and navigate to `backend/sample_orm_queries.py`. Then, run `sample_orm_queries.py` on your poetry shell (from the Docker container) to make sure that everything is working:

    ```
    python sample_orm_queries.py
    ```

    If it worked, you should see some courses outputting to the screen.

1. Now that you've run `sample_orm_queries.py`, let's take a look at some of the functions in this file, starting with the `show_courses` function (shown below):

    ```py
    import Course from models

    async def show_courses(db: AsyncSessionLocal):
        # create query:
        query = select(Course).order_by(Course.department)

        # execute the query:
        result = await db.execute(query)

        # convert the query results to a list:
        courses = result.scalars().all()

        # iterate through the list of Course objects and manipulate
        # as you would any other Python list of objects...
        for course in courses:
            print(f"{course.crn} ({course.department}) - {course.title}")
    ```

    The "job" of this function is to query the `courses` table and to convert each record into a `Course` object (which is much easier to work with in Python that raw SQL results). Please look at this function carefully and make sure you understand it.

1. Now let's look at how the `Course` model is defined in `backend/models.py` (around line 40). I've pasted it below for your convenience:

    ```py
    class Course(Base):
        __tablename__ = "courses"
        crn = Column(Integer, primary_key=True)
        code = Column(String, nullable=False)
        department = Column(String, nullable=False)
        title = Column(String, nullable=False)
        hours = Column(Integer, nullable=True)
        days = Column(String, nullable=True)
        start_time = Column(DateTime(timezone=True), nullable=True)
        end_time = Column(DateTime(timezone=True), nullable=True)
        enrollment_current = Column(Integer, nullable=False)
        enrollment_max = Column(Integer, nullable=False)
        waitlist_max = Column(Integer, nullable=False)
        waitlist_available = Column(Integer, nullable=False)
        term_part = Column(String, nullable=False)
        start_date = Column(DateTime(timezone=True), nullable=True)
        end_date = Column(DateTime(timezone=True), nullable=True)
        instructional_method = Column(String, nullable=False)
        async_class = Column(Boolean, nullable=False)
        diversity_intensive = Column(Boolean, default=False)
        diversity_intensive_r = Column(Boolean, default=False)
        distance_learning = Column(Boolean, default=False)
        first_year_seminar = Column(Boolean, default=False)
        graduate = Column(Boolean, default=False)
        honors = Column(Boolean, default=False)
        arts = Column(Boolean, default=False)
        service_learning = Column(Boolean, default=False)
        open = Column(Boolean, default=False)

        # Relationships
        instructors = relationship(
            "Instructor", secondary="course_instructors", back_populates="courses"
        )
        schedules = relationship(
            "Schedule", secondary="schedule_courses", back_populates="courses"
        )

        location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
        location = relationship("Location", back_populates="courses")
    ```

    The job of this model is to teach python how the `Course` object and the `courses` database table relate to one another. The first ~25 data fields are just direct mappings to table columns. The "relationship" data fields (`instructors`, `schedules`, `location`), on the other hand, specify how the foreign keys from other database tables connect to other ORM objects in our Project 2 app. Under the hood, SQLAlchemy helps us manage these joins. This is helpful because it allows you to do things like this...

    ```py
    # note that location info is stored in a different table than course info
    print(course.location.full_location)

    # note that instrutor info is stored in a different table than course info
    for instructor in course.instructors:
        print(instructor.full_name)

    ```

    ...without having to manually write the code to organize the data from your table joins.

1. Now that you've looked at your `Course` model, you're ready to understand how joins work in SQLAlchemy. To get your joins to populate the related models correctly, you must make sure you explicitly query for the data in the related tables as shown below in the  `show_courses_with_table_joins` function (which can also be found in the `sample_orm_queries` file):

    ```py
    import Course from models
    from sqlalchemy.orm import selectinload

    async def show_courses_with_table_joins(db: AsyncSessionLocal):
        # query also joins with the instructors and location table
        query = (
            select(Course)
            .options(
                selectinload(Course.instructors),
                selectinload(Course.location)
            )
            .order_by(Course.department)
        )

        # execute the query:
        result = await db.execute(query)

        # convert the query results to a list:
        courses = result.scalars().all()

        # print select information for each course:
        for course in courses:

            # print stuff from courses tables
            print(f"{course.crn} ({course.department}) - {course.title}")

            # because we joined on the instructors table, we  have access to its data:
            instructor_names = [inst.full_name for inst in course.instructors]
            print("Intructor(s):", ", ".join(instructor_names))

            # because we joined on the locations table, we can output the location:
            if course.location:
                print("Location:", course.location.full_location)
            print("-" * 70)
    ```

    Note that the query has a new "options" clause that invokes SQLAlchemy's `selectinload` function to query for related data. Once the joined data is loaded into its corresponding `Course` object and relations (instructors, location). You can now manipulate the data as you would any other python object.

1. The last thing that is important in these examples is the **await/async** concept, which we also saw in JavaScript. In this code example, all database queries are issued asynchronously. Because database queries are "expensive" (they take a lot of time), we don't want our system blocking until the query completes. By using async / await, other parts of the system can continue to work while python is waiting for information to come back from the database server:
    * The `async` keyword, which is put before a the function definition, indicates that the function is utilizing some asynchronous functionality.
    * The `await` keyword is ensures that the next line of code within the function does not execute until the asynchronous function call has returned.

{:.info}
> #### SQLAlchemy Tasks
> Now that you've taken a look at some SQLAlchemy capabilities in more depth, please complete the following tasks:
>
> 1. Short answer questions (to be answered in the Google Doc):
>     1. Please explain, in your own words, how the `print_schedules` function works (located inside of the `sample_orm_queries.py` file)  (no more than 3 sentences).
>     1. Open `backend/populate.py` file and take a look at it. What does the `load_course_data` function do? Describe it in your own words in no more than three sentences.
> 1. Coding questions (to be completed in the `sample_orm_queries.py` file). Create the following 3 asynchronous functions:
>     1. `print_usernames` -- prints all of the usernames in the system (query the `User` model).
>     1. `print_unique_departments`  -- prints a distinct list of departments (query the `Course` model). 
>     1. `print_open_cs_courses` -- prints the `crn` and `title` of courses in the CSCI department that are currently open (not full). 

### 3. Building Fast API Endpoints (Docker Server container)
<a href="https://fastapi.tiangolo.com/" target="_blank">FastAPI</a> is a web framework for building web APIs with Python. Some reasons we're using it in project 2:
* It's really fast (comparable to Node.js and Go).
* It supports asynchronous programming using Python's async and await.
* It uses the routes and type hints that you define in your python code to automatically generate interactive documentation
    * If your Docker container is running, check it out: <a href="http://127.0.0.1:8000/docs" target="_blank">http://127.0.0.1:8000/docs</a>
* It uses python type hints to validate and serialize data (using the Pydantic library).

Before completing your FastAPI tasks, I wanted to mention a few things:

#### 3.1. Examining server.py
`server.py` is the entrypoint for FastAPI. Please open it in VS Code and take a look at it. 
* The code on lines 1-33:
    * Imports the python libraries that your App uses
    * Initializes the database (if needed), and 
    * Enables CORS (a security feature that allows your API to be accessed from clients that don't share the server's IP address -- like your React App).
* The remaining code in this file defines what your endpoints should do, including the input they accept and the format of the output.

#### 3.2. Examining the `/api/instructors/` endpoint
You will be building some new API endponts in this section. Given this, let's explore the anatomy of a FastAPI endpoint so that you understand how to make one. Let's look at one of the existing endpoints in the `server.py` file to understand how it works:

```py
@app.get("/api/instructors/", response_model=List[serializers.Instructor])
async def get_instructors(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(models.Instructor).order_by(models.Instructor.last_name)
    )
    instructors = result.scalars().all()  # Extract distinct department names
    return instructors
```

##### Route Decorator
The first line of the code above...

```
@app.get("/api/instructors/", response_model=List[serializers.Instructor])
```

...is a python decorator. A decorator in Python is a special type of function that modifies or enhances the behavior of another function or method (the one that's directly below the decorator function, in this case `get_instructors()`). Decorators allows you to "wrap" another function with additional functionality without altering the function's actual code. 

This particular decorator's job is to validate the inputs and outputs of the HTTP request:
* `app.get` is a method of the app object that specifies that the `get_instructors()` function should handle GET requests.
* `/api/instructors/` is the path or endpoint where the GET request should be made. 
* `response_model=List[serializers.Instructor]` indicates the expected structure of the data returned by this endpoint. While the `get_instructors()` function actually returns a list of `Instructor` models, the `response_model` parameter determins how that list of `instructors` will be formatted and sent back to the client over HTTP.  Specifically:
    * The response should be a list.
    * Each item in the list should conform to the `Instructor` format as defined in `serializers.py` (which uses Pydantic).

Try executing the endpoint using FastAPI's built-in tester: <a href="http://localhost:8000/docs#/default/get_instructors_api_instructors__get" target="_blank">http://localhost:8000/docs</a>

##### Function Definition
The `get_instructors()` function should look pretty similar to the functions you made in the last section. However, one key difference is the `db: AsyncSession = Depends(get_db)` argument that is passed into the function.

`Depends(get_db)` is a FastAPI dependency that injects a database session (AsyncSession) into the function. This allows you to abstract the database connection logic into get_db, making the function cleaner and reusable across different endpoints. FastAPI handles this behind the scenes, but just know that if you pass in that particular argument into your function, it will give you access to the database session so that you can execute SQLAlchemy queries.



#### 3.3. Examining the `/api/courses/` endpoint
In the assigned tasks below, you will need to accept data from the client using HTTP conventions. Let's take a look at how the `/api/courses/` endpoint does this (it currently allows users to specify a search term and whether )


```py
@app.get("/api/courses/", response_model=List[serializers.Course])
async def get_courses(
    title: str = Query(None),
    instructor: str = Query(None),
    department: str = Query(None),
    hours: int = Query(None),
    db: AsyncSession = Depends(get_db),
):

    # base query to "courses" table that also asks SQLAlchemy
    # to join to the "instructors" and "locations" table.
    query = select(models.Course).options(
        selectinload(models.Course.instructors), 
        selectinload(models.Course.location)
    )

    # includes a "title" filter if specified:
    if title:
        query = query.where(models.Course.title.ilike(f"%{title}%"))

    # includes a "department" filter if specified:
    if department:
        query = query.where(models.Course.department == department)

    # includes an "hours" filter if specified:
    if hours:
        query = query.where(models.Course.hours == hours)

    # includes an "instructors" filter if specified:
    if instructor:
        query = query.join(models.Course.instructors).where(
            or_(
                models.Instructor.last_name.ilike(f"%{instructor}%"),
                models.Instructor.first_name.ilike(f"%{instructor}%"),
            )
        )

    result = await db.execute(
        query.order_by(models.Course.department, models.Course.code)
    )
    courses = result.scalars().all()
    return courses
```

There are two new elements that this function has that the previous function doesn't:
1. Query parameter arguments: note that in the function signature, there are 4 optional query parameters...

    * title: str = Query(None),
    * instructor: str = Query(None),
    * department: str = Query(None),
    * hours: int = Query(None)

    ...that allow the user of the endpoint to specify the kind of data they want to be returned.
1. Chaining of query filters: notice that the SQLAlchemy query can be further customized depending on the client's preferences.

Try executing the endpoint using FastAPI's built-in tester: <a href="http://localhost:8000/docs#/default/get_courses_api_courses__get" target="_blank">http://localhost:8000/docs</a>.
* Note also that because of the way that the Python type hints have been specified in the function definition, the auto-documentation tool made the correct tester form. Pretty cool!



{:.info}
> #### Fast API Tasks
> Now that you understand how endpoints work, you're going to create some new endpoints and modify some existing ones as follows:
> 
> 1. Create a GET endpoint, `/api/departments`, that returns a distinct list of all of the department codes by querying the `Course` model. The return datatype should be a list of strings (e.g., `response_model=List[str]`). The data returned from the endpoint should look something like this:
>
>    ```
    [
        "ACCT",
        "AFST",
        "AM",
        "AMS",
        "ANTH",
        "ART",
        "ARTH",
        "ARTS",
        "ASIA",
        ...
    ]
    ```
> 
> 1. Create a GET endpoint, `/api/users/{username}` that returns a single user from the database by querying the `User` model. The data returned from this endpoint request, `/api/users/svanwart`, should look something like this:
>
>    ```
    {
        "id": 18,
        "username": "svanwart",
        "email": "svanwart@unca.edu",
        "first_name": "Sarah",
        "last_name": "Van Wart"
    }
    ```
> 
> 1. Modify the `/api/courses` endpoint functionality to support the following additional filters:
>     * Whether the course matches a special category (DI, DIR, honors, FYS, open v. closed). Do this in any way you like.
>     * Whether to show only open courses
>     * Matching days

### 4. Building your React client (Node.js + static files)

Since you've had a bit more experience with React than you have with Fast API, I won't go into much detail here. That said, a few notes:

1. Remember that your React client is running on your host machine (versus on Docker). Make sure you're running the node development server within your `ui` directory (`npm run dev`).
1. Before attempting the coding tasks, spend some time getting oriented with the React app. Specifically:
    * Click the "View Schedule" button (top right) and see what happens. 
    * Try adding and removing classes from your schedules. What happens?
    * Try searching for classes based on `title`, `department`, `instructor`, and `credit hours` (which are implemented). How does it work? How do the user's search parameters get translated to the API end point?

{:.info}
> #### React Tasks
> After examining the React starter code and getting familiar with the components, please complete the following tasks:
>
> 1. Short answer questions (to be answered in the Google Doc):
>     1. Please explain how the `CourseSearchForm.jsx` component is able to communicate with the `CourseList.jsx` component. In other words, how does the `CourseList` know to redraw when the form is submitted? 
>     1. What are some of the advantages of using a web interface to plan your schedule versus a command line interface?
> 
> 1. Coding questions (to be completed in the relevant React component files inside of `ui`). Please complete the following tasks:
>     1. Modify the `fetchUser()` function inside of `services/apis.jsx`. It currently looks like this:
>
>        ```JS
        export async function fetchUser(username) {
            return {
                id: 18,
                username: "svanwart",
                email: "svanwart@unca.edu",
                first_name: "Sarah",
                last_name: "Van Wart",
            };
        }
        ```
>
>        You will replace the hard-coded return value with functionality that retrieves and returns the user corresponding to the `username` argument from the `api/users/{username}` endpoint.
>
>     1. Modify the `CourseSearchForm.jsx` component so that the departments shown in the dropdown list are generated from the results of a query to `/api/departments`. You will need to use React's `useState` and `useEffect`, and the JavaScript `map` function to generate each `<Select.Option />`.
>
>     1. Get the form / search results to honor the "Designation", "Days", and "Open Only" parameters. This will involve building the URL query string based on the form data (see the `fetchCourses` function inside of `services/apis.jsx`). You will need to make sure that the the URL you build conforms to the rules you created when you were implementing the API.


### 5. Final Exam Reflection
You are now at the end. Congratulations! As part of your reflective final assessment (extending your thinking beyond Project 2 to encompass all you have learned this semester), please answer these final 5 questions:


{:.info}
> #### Course Reflection Tasks
> Short answer questions (to be answered in the Google Doc):
> 1. Reflect on the value of the static analysis tools that you used in Project 1:
>   * How were they useful? How were they not useful?
>   * Would you use them again if you were working on a different software project? 
> 2. What are some of the dependencies that are used in Project 2 on the server-side? What are some of the trade-offs associated with adding these new dependencies? How do dependencies make your life both harder and easier?
> 3. What are some of the dependencies that are used in Project 2 on the client-side? What are some of the trade-offs associated with adding these new dependencies? How do dependencies make your life both harder and easier?
> 4.  What are some software development considerations on the UI side that don't exist on the server-side? Is UI engineering easier than server side engineering?
> 5.  Reflect on the two approaches to make your schedule planner (across Projects 1 & Project 2):
>   * What are some of the key differences between the two different architectures?
>   * At what point does the added complexity introduced in Project 2 become worth the effort (in your opinion)?


## What to Turn In

### Checklist
Please make sure the following tasks have been completed:

{:.checkbox-list}
* All questions in the Google Doc have been answered.
* You have implemented the following three SQLAlchemy functions in `sample_orm_queries.py`: 
    * `print_usernames()`
    * `print_unique_departments()`
    * `print_open_cs_courses()`
* You have made the requested FastAPI endpoint modifications in `server.py`, including:
    * Implementing `/api/departments`
    * Impelementing `/api/users/{username}`
    * Enhancing `/api/courses`
* You have completed the three React tasks:
    * Modifying `fetchUser()` to pull from `api/users/{username}`
    * Modifying the department dropdown list to pull from `/api/departments`
    * Getting the search form to honor the “Designation”, “Days”, and “Open Only” parameters
* Ensured that static linter / formatter checks pass for both the server-side code and the python code:
    * Server-side checks (run from Docker shell): `bash scripts/check.py`
    * Client-side checks (run from your local computer): 
        * `npm run format:check`
        * `npm run format:fix`

### What to Turn In
When you're done:
1. Push your `project02` branch to GitHub and make a pull request. Please ensure that the destination (left-hand side) is pointing to the `main` branch of **your repo** and the source (right-hand side) is pointing to the `project02` branch of **your repo**. 
2. Paste your PR link at the top of your "Answers" Google Document.
3. Upload your Google Document as a Word or PDF on the Moodle under the project 2 assignment.
