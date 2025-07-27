---
layout: assignment-two-column
title: "Testing & Static Analysis"
type: lab
draft: 0
points: 6
abbreviation: Lab 6
num: 6
start_date: 2025-02-20
due_date: 2025-02-26
h_max: 5
---

## Introduction & Background
The goal of this lab is to get you familiar with some automated testing and static analysis tools that are commonly used in industry. To do this, you will:
1. Pick a language / environment: **either** Python **or** JavaScript
2. Implement a "rock paper scissors" function
3. Write some vanilla unit tests for your function
4. Re-write your tests using a testing framework
5. Perform some static analysis tests on your code -- and fix any errors
6. Answer the 3-4 questions in `answers.md`.
7. Create a pull request.

{:.info}
> ### This is an "Either Or" Assignment
> * You only have to implement the rock paper scissors activities in **ONE of the languages** (either JavaScript or Python).
> * **Extra Credit:** If you need to make up a lab or if you would like to earn 6 points extra credit (equivalent to 1 Lab), you can do both options.


## Set Up
Before you begin, get the latest code from <a href="https://github.com/csci338/class-exercises-fall2025" target="_blank">class-exercises-fall2025</a>. 
* If you are a Windows user, you will do this lab (and all subsequent work in this class) using the WSL terminal.

**On GitHub:**
* Sync the latest changes from the class version of `class-exercises-fall2025` to your copy of the repo on GitHub.

**On your local computer:**
* Make sure that all of your changes from the last lab are staged and committed.
* Checkout your main branch: `git checkout main`
* Pull down the latest changes: `git pull`
    * If you did it correctly, you will notice that a new `lab06` folder has been created.
* Create a new branch called lab06: `git checkout -b lab06-b`
* Verify that you're on your new branch: `git branch`

## Option 1. JavaScript
Begin by completing the JavaScript tasks, which are located in the `javascript_rps` folder (`rps` stands for "rock paper scissors"), as described below:

### 1. Implement the "Rock Paper Scissors" function
Open `your-task.mjs` and take a look at the `rps` function, which should look like this:

```js
export function rps(hand1, hand2) {
    // finish this code:
    if (hand1 === "rock" && hand2 === "paper") {
        return "Paper wins!";
    } else {
        return "invalid";
    }
}
```

Implement the following "rock paper scissors" logic and return the corresponding message (exactly as it is shown below):
* If one hand is **rock** and the other is **paper**, return the string **"Paper wins!"**
* If one hand is **paper** and the other is **scissors**, return the string **"Scissors wins!"**
* If one hand is **scissors** and the other is **rock**, return the string **"Rock wins!"**
* If both hands are the same (and have valid arguments), return **"Tie!"**
* If anything other than rock, paper, or scissors are passed in, return **"Invalid"**

### 2. Write the tests WITHOUT a framework
As you are writing your `rps` function, write corresponding tests to verify your implementation for different possible arguments that a user might pass in. 

You will first write some tests *without* a framework. To help you, I have written two helper functions in `helpers.mjs`. The high-level point here is that **anyone can write and run tests -- simply and easily -- without using a fancy testing library**. Please open the `run-tests-vanilla.mjs` file to inspect how these two helper functions are used. Pause and try and understand what this code does.

When you've thought about it, please run the test suite by navigating into the `javascript_rps` directory from the command line and running the following command:

```shell
node run-tests-vanilla.mjs 
```

Your should see the following output:

```shell
> node run-tests-vanilla.mjs

----------------------------------------------------
✅ Success: it returns "Hello world!"
✅ Success: paper beats rock
❌ Failure: paper beats rock (flipped)
----------------------------------------------------

😬 Only  2 out of 3 tests passed.
```

Please write all the tests to ensure that the relevant possible inputs yield the expected output. A few tips:
1. As you make new test functions, don't forget to add the name of the function definition to the list of tests that are passed into the `runAllTests` function (at the bottom of the file).


### 3. Write the tests with a framework (Mocha)
Now that you have implemented the `rps` function and written the corresponding tests using "vanilla" JavaScript, you are going to rewrite your tests to use **Mocha** -- a JavaScript testing framework. 

#### Install Mocha
Mocha offers a set of functions and objects that organize your tests and make them easier to define and write. It also requires that all tests be placed in a folder called `test`. Create a Node project and install `mocha` via the npm package manager as follows:

```bash
# create the package.json file:
npm init -y  

# install mocha as a dev dependency:
npm install mocha --save-dev
```

Verify that a `package.json` file and a `node_modules` folder have been created.

#### Run the mocha tests
To run the tests, you must first modify `package.json` by setting the test value to "mocha":

```json
"scripts": {
    "test": "mocha"
}
```

You can now issue the following command to run the mocha test suite:
    
```
npm test
```

If you did it correctly you should see output that looks like the following:

```bash
> mocha



  Hello World Tests
    ✔ returns "Hello world!"

  Rock Paper Scissors Tests
    1) knows that paper beats rock


  1 passing (3ms)
  1 failing

  1) Rock Paper Scissors Tests
       knows that paper beats rock:

      AssertionError [ERR_ASSERTION]: 'invalid' == 'Paper wins!'
      + expected - actual

      -invalid
      +Paper wins!
      
      at Context.<anonymous> (file:///.../lab06/javascript_rps/test/run-tests-mocha.mjs:60:16)
      at process.processImmediate (node:internal/timers:478:21)
```


### 4. Rewrite your tests using the Mocha conventions
Once you have successfully run the tests, open the `tests/run-tests-mocha.mjs` file and see if you can understand what's going on. Pause and think. What is the same and what is different?

After inspecting the code, please add new mocha tests to exhaustively test the `rps` function using the Mocha helper functions. Note that instead of your functions returning **true** or **false**, you need to use Node's built-in `assert` module.

### 5. Install, configure, and run the static analysis / formatting tools
We're now going to use some code formatting and linting tools: 
* **`prettier`** -- our code formatting tool for ensuring that your team has the same coding style conventions (indentation, curly brace placement, etc.). 
* **`eslint`** -- our linting tool for analyzing code for possible errors, style violations, or inefficiencies. Linters sometimes make code changes, but usually just point out potential issues that need to be solved manually.

#### Prettier
Prettier enforces formatting rules using the `.prettierrc` configuration file. I have already made a simple `.prettierrc` file for you, but you can add additional rules to enforce additional coding style parameters. Please open it and take a look! 

**Install and configure prettier:**

To get `prettier` working with you code, you need to install it:

```bash
npm install prettier --save-dev
```

Once you have installed it, you should see `prettier` listed as a dev dependency in your `package.json` file. 

You will also need to update your `package.json` file by adding 2 new entries (below your test entry) in the scripts section:

```json
...
"scripts": {
    "test": "mocha",
    "format:check": "prettier --check \"**/*.{js,jsx,mjs}\"",
    "format:fix": "prettier --write \"**/*.{js,jsx,mjs}\""
},
...
```

Note the placement of commas after each line but the last one. Once these entries have been added, you will be able to run prettier from the command line.

**Run the prettier check:**

You are now ready to run the code formatter. First run the format checker from the command line (from with the `javascript_rps` directory) as follows:

```bash
npm run format:check
```

This command will tell you which of your JavaScript files do not conform to the style guide. Take a look and make a note of these files.

To fix these files, just run prettier with the --fix flag (which you just configured in your `.package.json` file). This command will actually reformat your code:

```bash
npm run format:fix
```

Open one of your "fixed" `.mjs` files and note what changed. Then run the prettier check again. The check should now report that no formatting errors were found.

#### ES Lint
ES Lint enforces linting rules using the `eslint.config.mjs` configuration file. I have already made a simple `eslint.config.mjs` file for you, but you can add additional checks and rules rules. Please open it and take a look! 
* Note that because we are using some mocha functions (e.g., `describe`, `it`, etc.), we need to teach the linter that these functions are indeed valid functions so they don't raise errors (they're global functions and it's hard for `eslint` to tell where they come from).

**Install and configure eslint:**

To get `eslint` working with you code, you need to install it:

```bash
npm install eslint eslint-plugin-mocha --save-dev
```

Once you have installed it, you should see `eslint` and `eslint-plugin-mocha` listed as a dev dependency in your `package.json` file. 

You will also need to update your `package.json` file by adding 2 new entries (below your `format:fix` entry) in the scripts section:

```json
...
"scripts": {
    "test": "mocha",
    "format:check": "prettier --check \"**/*.{js,mjs,jsx}\"",
    "format:fix": "prettier --write \"**/*.{js,mjs,jsx}\"",
    "lint:check": "eslint . && echo \"All ES Lint checks pass!\"",
    "lint:fix": "eslint . --fix && echo \"All ES Lint checks pass!\""
},
...
```

Note the placement of commas after each line but the last one. Once these entries have been added, you will be able to run eslint from the command line.

**Run the eslint check:**

You are now ready to run the linter. First run the linter check from the command line (from with the `javascript_rps` directory) as follows:

```bash
npm run lint:check
```

This command will tell you which of your JavaScript files do not conform to the linting rules. Take a look and make a note of these files.

As a first step to fixing these files, just run eslint with the `--fix` flag (which you just configured in your `.package.json` file). This command will try to auto-correct some of your linting errors...

```bash
npm run lint:fix
```
...that said, other errors might need to be corrected manually. 

### 6. Answer the questions in `answers.md`
Open `answers.md` in the root of your `lab06` directory and answer the questions.

### 7. Make a Pull Request
When you're done, make a pull request from your `lab06-b` branch to your `main` branch.

You are now done with the JavaScript version of this lab.  If you want 6 points extra credit, you can also do the JavaScript version of this lab. Otherwise, please jump down to ["Takeaways"](#takeaways).


## Option 2. Python
The Python version of these files is located in the `python_rps` folder. Please navigate to it on the terminal.

### 1. Configure Poetry
Initialize a poetry project within the `python_rps` folder (and keep pressing enter to take all the defaults):

```bash
# initialize poetry:
poetry init
```

### 2. Implement the "Rock Paper Scissors" function
Open `your-task.py` and take a look at the rps function, which should look like this:

```python
def rps(hand1, hand2):
    # finish this code:
    if hand1 == "rock" and hand2 == "paper":
        return "Paper wins!"
    else:
        return "Invalid"
```

Your job is to implement the function using the same logic as described above.


### 3. Write the tests WITHOUT a framework
As you are writing your rps function, write corresponding tests to verify your implementation for different possible arguments that a user might pass in.

Like before, you will first write your tests without a framework. To help you, I have written two helper functions in `helpers.py`. Please open the `run_tests_vanilla.py` file to inspect how these two helper functions are used. Pause and try and understand what this code does.

When you’ve thought about it, please run the test suite by navigating into the `python_rps` folder and running the following command:

```bash
poetry run python run_tests_vanilla.py
```

You should see the following output:

```bash
poetry run python run_tests_vanilla.py
--------------------------------------------------
✅ Success: It returns "Hello world!"
✅ Success: Paper beats rock
❌ Failure: Paper beats rock (flipped)
--------------------------------------------------

😬 Only  2 out of 3 tests passed.
```

Please write additional tests to ensure that all possible inputs yield the expected output. As you make new test functions, don’t forget to add the name of the function definition to the list of tests that are passed into the `run_all_tests` function (at the bottom of the file).

### 4. Write the tests with a framework (unittest)
Now that you have implemented the rps function and written the corresponding tests using “vanilla” Python, you are going to rewrite your tests to use **unittest** – a built-in Python module is part of the Python language. Like Mocha, **unittest** offers programmers a set of convenience functions and classes for organizing and writing tests.

Learn more here: <a href="https://docs.python.org/3/library/unittest.html" target="_blank">https://docs.python.org/3/library/unittest.html</a>


Please open `run_tests_framework.py`. In this file, a "starter" test class has been defined for you. It includes two starter tests that you can use a model for writing your tests. 

#### Run the unittest tests
To run the `unittest` version of your tests, issue the following command on the CLI (from within the python_rps directory):

```bash
poetry run python run_tests_framework.py --verbose
```

If you did it correctly you should see output that looks like the following:

```bash
test_hello_world (__main__.TestStringMethods.test_hello_world) ... ok
test_paper_beats_rock (__main__.TestStringMethods.test_paper_beats_rock) ... FAIL

======================================================================
FAIL: test_paper_beats_rock (__main__.TestStringMethods.test_paper_beats_rock)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/.../labs/lab06/python_rps/run_tests_framework.py", line 51, in test_paper_beats_rock
    self.assertEqual(rps('paper', 'rock'), 'Paper wins!')
AssertionError: 'Invalid' != 'Paper wins!'
- Invalid
+ Paper wins!


----------------------------------------------------------------------
Ran 2 tests in 0.000s

FAILED (failures=1)
```

#### Rewrite your tests using the unittest conventions
Once you have successfully run the tests, open the `run_tests_framework.py` file and see if you can understand what's going on. Pause and think. What is the same and what is different?

After inspecting the code, please add new `unittest` tests to exhaustively test the rps function using the helper functions. Note that instead of having your functions return **True** or **False**, you will now need to use the unittest.TestCase methods. Examples:

* `self.assertTrue`
* `self.assertEqual`

A list of possible methods is described here: <a href="https://docs.python.org/3/library/unittest.html" target="_blank">https://docs.python.org/3/library/unittest.html</a>

### 5. Install, configure, and run the static analysis / formatting tools
We're now going to use some code formatting and linting tools: 
* **`black`** -- our code formatting tool for ensuring that your team has the same coding style conventions (indentation, naming conventions, line width, etc.). 
* **`flake8`** -- our linting tool for analyzing code for possible errors, style violations, or inefficiencies. Linters sometimes make code changes, but usually just point out potential issues that need to be solved manually.
* **`isort`** -- our import sorter for ensuring that import statements are alphabetized (for consistency).

#### Black
Black is a PEP 8 compliant opinionated formatter. Black reformats entire files in place. Style configuration options are deliberately limited and rarely added. In other words, unlike prettier, the formatting rules are typically fixed (you shouldn't need to override them).

**Install black:**

To get `black` working with you code, you need to install it via poetry:

```bash
poetry add black
```

Once you have installed it, you should see `black` listed as a dev dependency in your `pyproject.toml` file. 

**Run the black check:**

You are now ready to run the code formatter. First run the format checker from the command line (from with the `python_rps` directory) as follows:

```bash
poetry run black .
```

Don't forget the `.` which instructs black to be run on all files recursively within the current directory.

This command will tell you which of your python files was modified / reformatted. Open one of your "fixed" `.py` files and note what changed. 

If you run the black command for a second time, no files should change.


#### Flake8
Flake8 enforces linting rules. Before we use it, we need to install it

**Install and configure flake8:**

To get `flake8` working with you code, you need to install it:

```bash
poetry add flake8
```

Once you have installed it, you should see `flake8` listed as a  dependency in your `pyproject.toml` file. 


**Run the flake8 check:**

You are now ready to run the linter from the command line (from with the `python_rps` directory):

```bash
poetry run flake8 .
```

This command will tell you which of your python files do not conform to the PEP 8 / linting rules. Take a look and make a note of these files.

You may have noticed two things:
1. Flake8 is analyzing all of the python dependencies in your virtual environment.
1. Some of the linting rules are contradicting the formatting rules. For instance, black and flake8 have a different rule for the correct length of a line length or whether it's OK to have trailing whitespace.

To deal with these problems, you can make a declarative configuration file at the root of your `python_rps` folder called `.flake8` and add some rules to:
1. Override the `flake8` style settings so that they match the ones specified in `black`, and
2. Exclude analyzing the python dependencies that you did not write.

Please paste the following rules into the `.flake8` file you just made:

```
[flake8]
max-line-length = 88
ignore = W291, W293

exclude =
    __pycache__
    .venv
```
Then run the linter again:

```bash
poetry run flake8 .
```

There should be fewer errors now. Please correct them all manually and then run flake8 again. Once all of your linter errors are corrected, you are done with this section.

#### iSort
Finally, to enforce consistency in the import statements used in a file, some teams use an import sorter. Will will use `isort` to do this. Let's install it...

**Install isort:**

```bash
poetry add isort
```

Once you have installed it, you should see `isort` listed as a  dependency in your `pyproject.toml` file. 


**Run isort check:**

You are now ready to run the import sorter:

```bash
poetry run isort .
```

Take a look and make a note of the files that were modified by this command. Then, open one of these files, change the import order (at the top), and then run the `isort` command again. You should see that the order has been corrected / alphabetized. Now run the tests one final time to make sure they still work:

```bash
poetry run python run_tests_framework.py --verbose
```

### 6. Answer the questions in `answers.md`
Open `answers.md` in the root of your `lab06` directory and answer the questions.

### 7. Make a Pull Request
When you're done, make a pull request from your `lab06-b` branch to your `main` branch.

You are now done with the Python version of this lab! If you want 6 points extra credit, you can also do the JavaScript version of this lab.

{:#takeaways :.info}
> ## Takeaways
> A project's **test suite**, **code formatter**, **linter**, and **import sorter** (if applicable) are typically run before any pull request is made. These tools are also run by your project's continuous integration validation suite before any branch is merged into the main codebase. Test suites and automated static analysis tools are an important part of creating scalable software that is maintainable over time.

## What to Submit
When you're done, push your `lab06-b` branch to GitHub and make a pull request. Please ensure that the destination (left-hand side) is pointing to the `main` branch of **your repo** and the source (right-hand side) is pointing to the `lab06` branch of **your repo**. Then, please paste a link to your PR in the Moodle.
