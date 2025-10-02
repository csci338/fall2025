---
title: UNCA Course Lookup
layout: assignment-two-column
type: project
draft: 0
points: 20
abbreviation: Project 1
num: 1
h_max: 3
start_date: 2025-10-02
due_date: 2025-10-30
---

<style>
h4 {
    margin: 5px 0;
}
.info {
    background-color: #0076a514;
    padding: 25px 50px;
    border-width: 0;
    padding: 20px 0px 20px 40px;
    border-radius: 10px;
    padding: 20px;
    margin: 0px;
    margin-bottom: 20px;
}
</style>

{% include toggle-button.html %}

<div class="info">
{% expandable expanded="true" level=2 title="How do I rebase main against my current working branch? "%}
1. Stage and commit all of the changes on the branch you're currently on. 
1. Checkout main and pull down changes:<br><br>
  ```bash
     git checkout main
     git pull
  ```
1. Check out your working branch<br><br>
  ```bash
     git checkout <your-feature-branch>
  ```
1. Rebase:<br><br>
  ```bash
     git rebase main
  ```
1. If there are conflicts:	
      * Manually resolve them in VS code
      * Then stage the changes you just made: `git add .`
      * Then continue the rebase process: `git rebase --continue`
      * And when you're done, modify latest commit message (optional).
1. Verify that nothing broke by:
      * run the tests
      * run the app
      * run the linter (and formatter if needed)
1. Force push: because we rewrote history, we need to use the force flag:<br><br>
  ```bash
     git push --force
  ```
{% endexpandable %}
</div>

## Introduction
For your first project, you are going to create a command line tool to replicate aspects of the <a href="https://www.unca.edu/schedules/" target="_blank">UNCA Course Search</a> app. A subset of the app's functionality is shown in <a href="https://drive.google.com/file/d/1DlmCIw0_sXJYLQNjyt1qnHmrXpekU2lY/view?usp=drive_link" target="_blank">this video</a> (please watch).


{% expandable expanded="true" level=3 title="Learning Goals"%}
This project will help you practice the concepts we have been covering so far, including:

1. Breaking requirements up into logical units that can be worked on in parallel (i.e., minimizing the dependencies between components).
1. Thinking about which "jobs" each component will have.
1. Working with a common development environment using Docker (e.g., operating system, python versions, coding conventions, testing suite) so that the app runs identically on any machine.
1. Working with static analysis tools.
1. Writing tests.
1. Devising a workflow for integrating work.
1. Coordinating and communicating across tasks to make sure everything can be successfully integrated.
{% endexpandable %}

{% expandable expanded="true" level=3 title="Product Requirements"%}
You and your team will create an app that implements the following features:

1. A way to download the UNCA data file from the Internet (JSON)
1. A way to display the search options. 
1. A way to allow the user to specify the search options
1. A way to store the user's preferences (for any of the options)
1. A way to filter the courses according to the user's preferences
1. A way to display the courses that match a user's preferences
1. A way to add, remove, and view courses from a user's schedule
1. A way to download the schedule as a CSV file
1. A way to email one's schedule to someone (using Twilio's SendGrid API)
{% endexpandable %}

{% expandable expanded="true" level=3 title="System Architecture (Done as a Class)"%}
During class on Tuesday (9/24), we discussed how to organize our system, and we collectively created the following diagram:

<img class="large" src="/fall2025/assets/images/projects/project-1-diagram.png" />

{% endexpandable %}

## Team Assignments
Your teams are listed below. Each member of your team has been assigned a task from the GitHub Issue Tracker. Some of you will be working on the same Python class, so make sure you only work on the tasks to which you were assigned:

{% expandable expanded="true" level=3 title="Team 1" %}
Please see your team's <a href="https://github.com/csci338/p01-team01-fall2025" target="_blank">repo</a> for more information. Members of your team are:

| 1. |  Course | carlos460  | Implement the `Course` class |
| 2. |  Courses	| ajrest1103  | Implement the `Courses` class |
| 3. |  UserPreferences | HLaiK  | Implement the `UserPreferences` class |
| 4. |  CourseFilter | mling0502  | Implement the `CourseFilter` class |
| 5. |  UI functions | Tangerinedream13  | Implement the `UI` functions (`ui.py`) |
| 6. |  Schedule (except for send_email) | aqsmith02  | Implement the `Schedule` class (except for `send_email`) |
| 7. |  send_email	jbartle1 | Implement the `send_email` method of the `Schedule` class |

{% endexpandable %}

{% expandable expanded="true" level=3 title="Team 2" %}
Please see your team's <a href="https://github.com/csci338/p01-team02-fall2025" target="_blank">repo</a> for more information. Members of your team are:

| 1. |  Course	dhend595  | Implement the `Course` class |
| 2. |  Courses	ringojuic | Implement the `Courses` class |
| 3. |  UserPreferences | jneal2003  | Implement the `UserPreferences` class |
| 4. |  CourseFilter | JesseRayCrouse  | Implement the `CourseFilter` class |
| 5. |  UI functions | ktaylo-funky-pants  | Implement the `UI` functions (`ui.py`) |
| 6. |  Schedule (except for send_email) | amhpurple  | Implement the `Schedule` class (except for `send_email`) |
| 7. |  send_email | 0re0-Speedwagon  | Implement the `send_email` method of the `Schedule` class |

{% endexpandable %}

{% expandable expanded="true" level=3 title="Team 3" %}
Please see your team's <a href="https://github.com/csci338/p01-team03-fall2025" target="_blank">repo</a> for more information. Members of your team are:

| 1. |  Course | kpr0vence  | Implement the `Course` class |
| 2. |  Courses | Neptune-C-Providence  | Implement the `Courses` class |
| 3. |  UserPreferences | kgary432  | Implement the `UserPreferences` class |
| 4. |  CourseFilter | m-mazzotta  | Implement the `CourseFilter` class |
| 5. |  UI functions | alisalofe  | Implement the `UI` functions (`ui.py`) |
| 6. |  Schedule (except for send_email) | kikooperative  | Implement the `Schedule` class (except for `send_email`) |
| 7. |  send_email | Hayden514 | Implement the `send_email` method of the `Schedule` class |

{% endexpandable %}

{% expandable expanded="true" level=3 title="Team 4" %}
Please see your team's <a href="https://github.com/csci338/p01-team04-fall2025" target="_blank">repo</a> for more information. Members of your team are:

| 1. |  Course | rsciaudo  | Implement the `Course` class |
| 2. |  Courses | KellanBrown  | Implement the `Courses` class |
| 3. |  UserPreferences | ltripp1  | Implement the `UserPreferences` class |
| 4. |  CourseFilter | NoahCSC  | Implement the `CourseFilter` class |
| 5. |  UI functions | slundin24  | Implement the `UI` functions (`ui.py`) |
| 6. |  Schedule (except for send_email) | rodrigomendes37  | Implement the `Schedule` class (except for `send_email`) |
| 7. |  send_email | takarin13  | Implement the `send_email` method of the `Schedule` class |

{% endexpandable %}

## Tasks
Each task is listed below. Each student on your team has been assigned a task via the GitHub Issue Tracker, and will be completing some subset of the functionality described below:

{% expandable level=3 title="1. Course" id="course" expanded="true" %}
The job of the Course class (`course.py`) is to parse the incoming dictionary into a more useable form. If you have been assigned this issue, please note that the rest of the app is highly dependent on this class, so the earlier you complete this task, the easier it will be for your teammates.

#### Sample dictionary item to be parsed

```python
{
    "CRN": 60002,
    "Code": "ACCT 215.001",
    "Department": "ACCT",
    "Title": "Principles of Accounting I",
    "Instructors": [{"Username": "chughes", "Name": "Hughes, Carolyn"}],
    "Hours": 4,
    "Days": "MW",
    "StartTime": "2020-05-05T21:30:00Z",
    "EndTime": "2020-05-05T23:10:00Z",
    "Location": {"FullLocation": "DEL 110", "Building": "DEL", "Room": "110"},
    "EnrollmentCurrent": 26,
    "EnrollmentMax": 28,
    "WaitlistMax": 0,
    "WaitlistAvailable": 0,
    "TermPart": "1",
    "StartDate": "2025-08-18T04:00:00Z",
    "EndDate": "2025-12-10T05:00:00Z",
    "Classification": {
        "DiversityIntensive": False,
        "DiversityIntensiveR": False,
        "DistanceLearning": False,
        "FirstYearSeminar": False,
        "Graduate": False,
        "Honors": False,
        "Arts": False,
        "ServiceLearning": False,
        "Open": True,
    },
    "AdditionalMeetings": [],
    "InstructionalMethod": "In-Person",
    "Async": False,
}
```

#### Properties
It should allow setting and getting of the following properties:
* `crn` (str)
* `code` (str)
* `department` (str)
* `title` (str)
* `instructors` (list[str]) - list of strings
* `hours` (int)
* `days` (list[str]) - list of strings
* `start_time` (str) - formatted to be human-readable
* `end_time` (str) - formatted to be human-readable
* `location` (str)
* `enrollment_current` (int)
* `enrollment_max` (int)
* `term` (int)
* `is_di` (bool)
* `is_dir` (bool)
* `modality` (str) - In-Person or Online

**Empty values:** If no data are available for a particular property, represent "no data" as follows:
```py
* str = ""  # empty string
* int = -1
```

#### Methods
Your class should also have the following methods:
* A `constructor` method, which takes a dictionary as an argument and sets the properties right away. A stub has been implemented for you.
* A `__repr__` method (similar to Java's toString() method, which returns the code and name of the course.
* A `to_row` method that returns a more detailed representation of the course (e.g., name, crn, instructor, location, time / day, etc.).
* An `is_full` method that returns true or false, depending on whether the course is full or not.
* An `is_morning` method that returns true or false, depending on whether the course starts before 12PM and false otherwise
* An `is_afternoon` method that returns true if the course starts between 12PM-5PM and false otherwise.
* An `is_evening` method that returns true if the course starts on or after 5PM and false otherwise.

{% endexpandable %}


{% expandable level=3 title="2. Courses" id="courses" expanded="true" %}
The job of the Courses class (`courses.py`) is to make it convenient to print, filter, and download a list of Course objects.

#### Properties
Your class should have the following properties:
* `_courseList`: a (private) list of `Course` objects

#### Methods
Your class should also have the following methods:

* A `constructor` method, which takes a list of Course objects (list[Course]) as an argument and sets the `_courseList` property right away. A stub has been implemented for you in the starter code.
* A `to_list` method (no required parameters) which returns the `_courseList` property
* A `size` method  (no required parameters) which returns the length of the `_courseList` list
* A `display_to_terminal` method (no required parameters) that prints a nice, formatted list of courses (or a message if there are no courses in the list). Use the course's `to_row` method to help you.
* A `get_matching_courses` method which takes a UserPreferences object as an argument and return a new Courses object that includes only the courses that match the user's preferences.
    * As you iterate through the available courses, use the CourseFilter object (made by one of your classmates to figure out whether each course is a match).
    * Consider chaining your filtering methods together using Python's built-in `filter` method. Some pseudocode is shown below: 
    ```python
    # Python's `filter` function returns a new list with only results matching the filter function.
    # Use multiple filter invocations to apply multiple filters:
    course_matches = filter(some_filter_function, self._courseList)
    course_matches = filter(another_filter_function, course_matches)
    ```
{% endexpandable %}


{% expandable level=3 title="3. UserPreferences" id="user_prefs" expanded="true" %}
The job of the UserPreferences class (`user_preferences.py`) is store the user's search preference information, and to provide methods for modifying the user's preferences as they browse courses of interest. If you have been assigned this issue, please note that the rest of the app is highly dependent on this class, so the earlier you complete this task, the easier it will be for your teammates.


#### Properties
It should allow setting and getting of the following properties. 
* `days`: list[str] = []
* `department`: str = ""
* `di_only`: bool = False 
* `dir_only`: bool = False
* `hours`: int = -1
* `instructor`: str = ""
* `open_closed_status`: str = "" (either "open", "closed", or "" (no preference))
* `search_term`: str = ""
* `time_of_day`: str = "" (either "morning", "afternoon", or "evening")


**Empty values:** If the filter is unset (i.e., the user didn't specify a value one way or the other),  represent "unset" preferences as follows:

```
str = ""  # empty string
int = -1
list = []
bool = False
```

#### Methods
Your class should also have the following methods:

* A `constructor` method that initializes all of the default property values right away.
* An `update_search_term` method that prompts the user to enter a search term or clear their current `search_term` property.
* An `update_department` method that prompts the user to enter a department or clear their current `department` property.
* An `update_instructor` method that prompts the user to enter an instructor or clear their current `instructor` property.
* An `update_di` method that asks the user whether they want to only see DI courses. This will set the `di_only` property.
* An `update_dir` method that asks the user whether they want to only see DI-Race courses. This will set the `dir_only` property.
* An `update_open_closed_status` method that asks the user whether they want to only open or only closed courses. This will set the `open_closed_status` property.
* An `update_dir` method that asks the user whether they want to only see DI-Race courses. This will set the `dir_only` property.
* An `update_hours` method that asks the user whether they only want to see courses with 1, 2, 3, or 4 credit hours. This will set the `hours` property.
* An `update_days` method that asks the user which days they're looking for classes. This will set the `days` property.
* An `update_time_of_day` method that asks the user whether they want to specify morning, afternoon or evening classes. This will set the `time_of_day` property.

##### A note on the methods
* All of the update methods must validate the user's input and re-prompt them if they enter an incorrect value (and explain why the value is incorrect).
* All of the input methods should also be able to clear out the properties (unset them to empty).
* Feel free to use as many private helper methods as you want. In python, private methods are named with a leading underscore.
{% endexpandable %}


{% expandable level=3 title="4. Course Filter" id="course_filter" expanded="true" %}
The job of the CourseFilter class (`course_filter.py`) is to determine whether a course matches a given set of criteria. 

#### Properties
It should allow setting and getting of the following properties:
* `user_prefs`: UserPreferences

#### Methods
* A `constructor` method, which takes a UserPreferences object as an argument and sets the `user_prefs` property right away. A stub has been implemented for you.
* `is_search_term_match`: accepts a Course object as an argument. Returns true if the course's title matches the user's preference (from the UserPreferences) property or if the search_term preference is not set. Returns false otherwise.
* `is_instructor_match`: accepts a Course object as an argument. Returns true if the course's instructor partially matches the user's preference or if the instructor preference is not set. Returns false otherwise.
* `is_di_match`: accepts a Course object as an argument. Returns true if the course is a DI course preference or if the di_only preference is not set. Returns false otherwise.
* `is_dir_match`: accepts a Course object as an argument. Returns true if the course is a DI-Race course preference or if the dir_only preference is not set. Returns false otherwise.
* `is_departmental_match`: accepts a Course object as an argument. Returns true if the course's department matches the user's preference or if the department preference is not set. Returns false otherwise.
* `is_hours_match`: accepts a Course object as an argument. Returns true if the course's credit hours matches the user's preference or if no preference is set. Returns false otherwise.
* `is_status_match`: accepts a Course object as an argument. Returns true if the course's `open_closed_status` matches the course's current state or if no preference is set. Returns false otherwise.
* `is_time_of_day_match`: accepts a Course object as an argument. Returns true if the course's `time_of_day` matches the course's time of day status or if no preference is set. Returns false otherwise.

Make sure that all filters are case-insensitive and that they return true if no preference is set.
{% endexpandable %}


{% expandable level=3 title="5. User Interface (UI)" id="ui" expanded="true" %}
The job of the User Interface file (`ui.py`) is to allow people to make choices about what they want to do in the app and receive the appropriate response. This is the main driver of the app and is just a series of function and method calls. 

#### Helper Objects
Because `ui.py` is the primary way in which users will interact with the app's functionality, this file will initialize `UserPreferences`, `Courses`, and `Schedule` objects and make use of their public methods. A small portion of this has already been done for you, but you will continue to use methods from these objects based on user input.

#### Functions
* A `fetch_courses` method that queries for the course data from the following url: <a href="https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/2025/spring" target="_blank">https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/2025/spring</a>, converts each result into a `Course` object, and returns a `Courses` object (read more about these objects above).
* A `generate_menu` method that returns a string representation of all of the menu choices in the system (watch the demo video to get ideas). This menu should also indicate to the user which preferences they have selected. 
* A `show_menu` function that prints the menu generated (these two functions have been separated so that they're easier to test).
* A `process_menu_choice` function (which can accept as many arguments as needed) to handle the user's selection. This function will invoke functionality from `UserPreferences`, `Courses`, and `Schedule` objects that are initialized when the app starts. It will return the string "quit" if the user asks to terminate the program (so that the application loop knows to break).
* A `start_app` method that continues showing the user the menu and re-prompting them until they quit the application.
{% endexpandable %}


{% expandable level=3 title="6. Schedule" id="schedule" expanded="true" %}
The job of the Schedule class (`schedule.py`) is to allow the user to build a schedule based on the courses the user finds interesting. Eventually, you may want this class to extend the `Courses` class (optional) if it makes sense.

#### Properties
It should allow setting and getting of the following properties:
* `_courseList`: a list of `Course` objects (set by the constructor)

#### Methods
* A `to_list` method (no required parameters) which returns the `_courseList` property
* A `size` method  (no required parameters) which returns the length of the `_courseList` list
* A `display_to_terminal` method (no required parameters) that prints a nice, formatted list of courses (or a message if there are no courses in the list). Use the course's `to_row` method to help you.
* An `add_courses` method, which takes a list of Course objects (list[Course]) as an argument. The function's job is to display the courses, and ask the user which courses they'd like to append to their schedule. After the user makes their selection, the method will append the selected courses to `_courseList`.
* A `remove_courses` method (no required parameters). This function's job is to display the user's current schedule of classes, and ask the user which courses they'd like to remove. The corresponding courses are then removed from `_courseList`.
* A `save_schedule` method that saves the current schedule as a CSV file (text file).
* An `send_email`, which will email the schedule to a selected recipient.
{% endexpandable %}


## Set Up

{:.info}
> Last semester, I made a <a href="https://drive.google.com/file/d/10h6CsMGXYFRHe4y95x32moJs-u6P9rjo/view?usp=drive_link" target="_blank">video walkthrough</a> of the set up if it helps.

{% expandable expanded="true" level=3 title="1. Set up your repository" %}
Once your team lead has added you to their repo, you will set up the code locally as follows:
1. Open the terminal.
1. Clone your team's version of the repository:
```
git clone git@github.com:csci338/p01-<your-team-number>-fall2025.git project01
```
    * Note that the second argument of the clone command allows you to specify the name of the local folder (`project01`) even if the remote repo name is different.
    * Please do not clone this repo inside of another directory that is already under version control.
    * Make sure that the folder you just created is called `project01` (important for Docker).<br><br>

1. Navigate into the `project01` directory you just cloned. Create a new branch that describes the feature you will be working on (name it whatever you want):
```
cd project01
git checkout -b yourname-feature
```
{% endexpandable %}

{% expandable expanded="true" level=3 title="2. Building Your Docker Container" %}
1. Make sure that Docker is running
1. Then, from within the `project01` directory on your command line, issue the following Docker command:
   ```bash
   docker compose up -d
   ```
   This command will build your image and your container in "detached mode," meaning that the build takes place in a background process. Once the container has built, you should see some output like this:
   ```bash
   [+] Running 2/2
    ✔ Network project01_default  Created                                      0.0s 
    ✔ Container project01-app-1  Started      
   ```

1. Now, find the process id of the container you just made by listing all of your containers as follows:
   ```bash
   docker ps -a
   ```
1. Install the poetry dependencies on your Docker container:
   ```bash
   docker exec -it <pid> poetry install
   ```
1. Run the tests:
   ```bash
   docker exec -it <pid> poetry run pytest -v
   ```
1. Run the app:
   ```bash
   docker exec -it <pid> poetry run python course_lookup/ui.py
   ```
1. Now you're ready to start coding in VS Code. Open the entire project in VS Code by typing: `code .`


#### 1. Returning to Docker later
Once you've built your container, it should be available to you in the future, even if you close out of Docker or stop the container. To get back to your container:

1. Make sure Docker is running
2. Find the pid of the container you want to run: 
   ```bash
   docker ps -a
   ```
3. Start the stopped container with the pid you just found:
   ```bash
   docker start <pid>
   ```
4. Use container as per usual (and make sure you're in the `project01` directory when you run the poetry commands).

You could also go to the Docker Dashboard and start your container from the Dashboard.

#### 2 Some useful commands

| Command | Description |
|--|--|
| `docker ps -a` | List all of the containers (including stopped containers) |
| `docker stop <pid>` | List all of the containers (including stopped containers) |
| `docker start <pid>` | List all of the containers (including stopped containers) |
| `docker exec -it <pid> bash` | Runs terminal on the container |
| `docker exec -it <pid> poetry run python course_lookup/ui.py` | Runs the `ui.py` using poetry. |
| `docker exec -it <pid> poetry run pytest -v ` | Runs tests |
| `docker exec -it <pid> bash scripts/check.sh` | Runs check script |
| `docker exec -it <pid> bash scripts/fix.sh` | Runs fix script |
{% endexpandable %}


## Logistics
Before you begin working on this project, please read the guidelines **VERY CAREFULLY**.

{% expandable expanded="true" level=3 title="1. Working with Feature Branches" %}
1. You will **never edit the `main` branch directly**. Consider `main` to be the "source of truth" for the app. 
2. All of your work will be committed to your feature branch (which you will create from the `main` branch).
3. _Please_ pull down the latest changes from `main` periodically and rebase your local branch with `main`. To do this:
    * Commit your feature branch work,
    * Check out main,
    * Pull down the latest changes,
    * Check out your feature branch again, and
    * Rebase your feature branch with main
    {:.compact}

{% endexpandable %}


{% expandable expanded="true" level=3 title="2. Testing Tips" %}
Run the tests using the pytest library (installed via poetry). Some sample commands:

```bash
# runs all the tests
poetry run pytest -v 

# runs all the tests in a single file
poetry run pytest tests/test_courses.py -v  

# runs a single test (e.g., test_one)
poetry run pytest tests/test_courses.py::TestCourses::test_check_num_courses -v  
```
{% endexpandable %}


{% expandable expanded="true" level=3 title="3. Formatting Tips" %}
We are using `black` to format our code, `isort` to sort our import statements, and `flake8` to validate the Python code. 
* [https://black.readthedocs.io/en/stable/usage_and_configuration/index.html](https://black.readthedocs.io/en/stable/usage_and_configuration/index.html)
* [https://pypi.org/project/isort/](https://pypi.org/project/isort/)
* [https://flake8.pycqa.org/en/latest/](https://flake8.pycqa.org/en/latest/)

The following commands will be run on every push to make sure that the code styling rules have been followed:

```bash
# runs the Python formatter
poetry run black . --check     

# run the Python import sorter
poetry run isort . --check-only  

# flake8 just checks things -- you have to fix them manually
poetry run flake8                 
```

You can also use the `bash/check.sh` script (for convenience):

```bash
bash scripts/check.sh
```

To actually APPLY the formatting (which will make changes to your files), make sure you run these two commands before pushing your branch to GitHub:

```bash
# runs the Python formatter
poetry run black .   

# run the Python import sorter
poetry run isort .      
```
You can also use the bash/fix.sh script (for convenience):

```bash
bash scripts/fix.sh
```

If you want flake8 to ignore a particular line, add a `# noqa` comment at the end of the line
{% endexpandable %}

{% expandable expanded="true" level=3 title="4. GitHub Workflows & Continuous Integration Notes" %}
The `.github/workflows/pr.yml` is a configuration file that GitHub reads in order to run a series of checks everytime you push your branch to GitHub. Before you make a pull request, make sure that you run the `bash scripts/run_pr_checks.sh` script. If everything passes locally, it should also pass on GitHub.
{% endexpandable %}

## Grading and Assessment

{% expandable expanded="true" level=3 title="1. How to submit work for review" id="submissions" %}

#### Submissions
You will submit your work by making a pull request (PR) and tagging `svanwart` as a reviewer. Before making your PR, make sure that you have:

{:.checkbox-list}
* Implemented all of properties and methods needed to support the functionality listed above (using private helper methods as needed).
* Written tests for all public methods.
* Ensured all of the formatter and linter checks pass before making a pull request.

#### [PLEASE READ VERY CAREFULLY] Pull Request Details
In your pull request, make sure that:

{:.checkbox-list}
* You only include code changes that you made in the PR. There shouldn't be other random files in your PR. Just the code you want Sarah to review that you wrote.
* All of the validation checks on GitHub pass
* There are no merge conflicts with the `main` branch. If you see that your pull request has merge conflicts, it means that you need to rebase against main, and then push your rebased branch to GitHub.
* In the text of your Pull Request:
    * Be sure to reference your assigned issue by using the hash tag followed by the issue number.
    * Describe what has been done in the PR as simply and clearly as possible.


A few other PR details:
* You may make multiple PRs to implement subsets of functionality. Remember: it's better to create smaller, incremental PRs than one big PR (no long-running branches).
* I (Sarah) will review all pull requests as quickly as possible (ideally within 24 hours)
* Once I approve your pull request, **you will be responsible for merging your branch into `main` via GitHub**. I recommend doing this as soon as your PR has been approved so that your teammates have the benefit of your updated code.

#### Revisions
I may ask you for revisions on your code, which is a normal, expected part of the development process. If this happens:
* Please make the requested changes on your feature branch
* Push your new changes to the remote branch
* Modify the PR text to explain what you changed
* Tag `svanwart` again so that I can review your changes.

{% endexpandable %}

{% expandable expanded="true" level=3 title="2. Rubric"  %}
| 20% | Teamwork and communication | Did you attend class during team meetings? Where you a good team player? Did you talk to your teammates? If someone else was working on a feature that you depended on, did you reach out / coordinate / communicate with them? If someone reached out to you because they depended on a task you were doing, did you respond to them in a timely manner? | 
| 50% | Individual code contribution | Did you complete your tasks? Does your code work as expected? Do all of your functions / methods have tests? Did the code quality checks pass? Was your PR(s) approved? Were your (PRs) approved by the deadline? |
| 30% | Quality of the final group product | Does your app work? Is it complete? Can users browse for courses, filter according to their preferences, and add them to a schedule? Were everyone's contributions merged by the deadline (recognizing that the deadline may be a moving target, given the contraints we are operating under)? |

At the end of Project 1, you will be asked to complete a brief, anonymous survey about the contributions of person in your group. Even though we are all remote and operating on different sets of constraints, it is still possible to shoot a quick email or text to give a brief status report. If you are concerned about your ability to participate in this project please talk to Sarah **as soon as possible** so that the appropriate accommodations can be made.
{% endexpandable %}