---
layout: two-column
title: Unit Test Activity
type: activity
---


## 1. Get Situated / Pull Down the Files
**On GitHub:** sync your fork of the **class-exercises-fall2025** repo on GitHub.

**On your local machine:**
* Navigate to your `csci338/class-exercises-fall2025` directory
* Check that everything is committed and pushed to your remote branch (some command reminders below):<br><br>
    ```
    git branch
    git status
    git add .
    git commit -m "Message describing your changes"
    ```
* Checkout `main`
* Pull down the latest code (`git pull`). You should see a new `writing-tests` folder within your local `class-exercises-fall2025` folder.
* Create a new branch from main called **writing-tests-b**: `git checkout -b writing-tests-b`


## 2. Configure your development environment using Poetry
1. Navigate into your `writing-tests` directory from the command line.
1. Open the entire `writing-tests` directory in VS Code by typinc `code .` on the terminal.
1. Create a new Poetry project: `poetry init` (take all the defaults by pressing the enter key).
2. Install the following dependencies with `poetry add`<br><br>
    ```
    pytest
    black
    flake8
    isort
    ```

## 3. Run the python files and the tests:
Navigate back into the `writing-tests` directory on the command line. Then type the following:

```bash
poetry run python app/main.py       # runs the app
poetry run pytest -v                # runs the tests
```

Now, open `tests/test_main.py` and take a look at it. Uncomment the tests one by one.
* What do you think the decorators do?
* Under what circumstances might it be important to create test mocks?

## 4. Refactor the code

### Organize code for doing math
1. You decided to create a new class that contains static methods for doing Arithmetic (I have already created this class for you -- just uncomment the first static method I have created for you).
2. Delete the `add_nums` function defintion from `main.py` and use the one in `Arithmetic` instead.
3. Run `test_main.py` again. Fix the failing tests.


### Organize code for interacting with the user
1. Create a new Python class called `UserInterface`. (I have already created a stub for this class. You will need to migrate the functions and convert them into static methods (by using the `@staticmethod` decorator.
2. Delete `add_nums_from_user_input` function defintion from `main.py` and use the one in `UserInterface` instead.
3. Fix your tests so that they work again.

{:.info}
> #### Metacomment about testing:
>
> 1. One of the most useful things about tests is that they will tell you when your code refactor broke something.
> 1. One of the challenges of tests (as you've already seen) is that you have to maintain them. Figuring out ways of designing manageable tests is a lifelong pursuit.


## 5. Create two new static methods
1. Create a new static method in the Arithmetic class called `subtract_nums` that subtracts two numbers.
1. Create a new static method in the Arithmetic class called `subtract_nums_from_user_input` that subtracts two numbers based on user input.
1. Write some tests to test your new methods.


## 6. Use the static analysis / formatter tools
1. Run the import sorter check: `poetry run isort . --check-only`
1. Run the import sorter fix: `poetry run isort`
2. Run the formatter check: `poetry run black .`
2. Run the formatter fixes: `poetry run black .`
3. Run flake8 (linter / code quality checker): `poetry run flake8`