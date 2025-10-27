---
layout: assignment-two-column
title: Database + ORM Lab
type: lab
abbreviation: Lab 8
draft: 0
points: 6
num: 8
start_date: 2025-10-30
due_date: 2025-11-07
---

<style>

    blockquote.info {
        padding: 20px;
    }
    blockquote.info h3, blockquote.info li {
        margin-bottom: 20px;
    }
    td ul {
        margin-top: 10px !important;
    }
    table th:first-child, 
    table td:first-child {
        width: auto;
        max-width: 200px;
        /* min-width:200px; */
    }

    table th:last-child, 
    table td:last-child {
        width: auto;
        min-width:130px !important;
    }

    table th:nth-child(3), 
    table td:nth-child(3) {
        width: auto;
        min-width:200px !important;
    }

    table code {
        font-weight: 600;
        font-size: 1.1em;
    }

    blockquote.updates {
        background-color: #d4edda;
        border: solid 1px #c3e6cb;
    }
    blockquote.updates h2, 
    blockquote.updates p, 
    blockquote.updates li, 
    blockquote.updates a {
        color: #155724;
    }
    blockquote.updates h2 {
        border-bottom: solid 1px #155724;
    }
    blockquote.updates a:hover {
        background-color: transparent;
    }

</style>

## 1. Introduction

The goals of this lab are as follows:

1. Set up a docker container with a postgres tutorial
1. Get some basic experience with SQL
1. Get experience interacting with a Postgres database from Python
1. Get experience querying the database via an ORM

## 2. Setup

### Version Control Stuff
Before you begin, get the latest code from <a href="https://github.com/csci338/class-exercises-fall2025" target="_blank">class-exercises-fall2025</a>. 

**On GitHub:**
* Sync the latest changes from the class version of `class-exercises-fall2025` to your copy of the repo on GitHub.

**On your local computer:**
* Make sure that all of your changes from the last lab are staged and committed.
* Checkout your main branch: `git checkout main`
* Pull down the latest changes: `git pull`
    * If you did it correctly, you will notice that a new `lab08` folder has been created.
* Create a new branch called **lab08-b**: `git checkout -b lab08-b`
* Verify that you're on your new branch: `git branch`


### Build and run your Docker file
Navigate to your `lab08` directory and type:

```bash
docker compose up -d
```

As you may recall, this command builds your Docker container *and* runs it. Keep your terminal running and do the remaining tasks on anther terminal.


## 3. SQL Exercises

### Run the Postgres SQL Client

In the new terminal window we'll run `psql` (the postgres SQL
client) on the your running container.

```bash
# get container id:
docker ps -la

# connect to the docker container
docker exec -it <pid> psql -U postgres
```

If you did this correctly, you should see a PostgreSQL shell that looks like this:

```
postgres=#
```

Now let's confirm things are working. Try typing in the `\list`
command and confirm you see the `dvdrental` database.

```
postgres=# \list
```

If that works, let's change to the `dvdrental` database and run a
simple sql query to list all customer's first names.

```
postgres=# \c dvdrental
dvdrental=# select first_name from customer;
```

### [Optional] Using a GUI Client
For those of you who would like to look at the data in a visual way, feel free to use DBeaver (which you can <a href="https://dbeaver.io/download/" target="_blank">download here</a>). Once downloaded and installed, you can preview the DVD Rental database by using the following connection information for a PostgreSQL connection:

* host: **localhost**
* database: **postgres**
* username: **postgres**
* password: **postgres**
* port: **5433**

Also, make sure that the "Show all databases" option is checked (as pictured in the screenshot below):

<img class="medium frame" src="/fall2025/assets/images/labs/lab08/dbeaver-ss.png" />

### Tutorial

Now that you're all set up, please answer the 10 SQL questions (listed below) in the "SQL" section of your `lab08/answers_sql.md` file. Here are some references from the PostgreSQL tutorial to help you:

- [Select](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-select/)
- [Where](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/)
- [Limit](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-limit/)
- [Joins](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/)
- [Table Aliases](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-alias/)
- [Inner Join](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/)
- [Insert](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-insert/)
- [Insert Multiple Rows](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-insert-multiple-rows/)

{:.info}
> ### SQL Questions
> 1. **SELECT - Retrieving Data.** Write a query to list the titles and release years of all movies in the film table.
> 2. **WHERE - Filtering Data.** Write a query to find all customers whose last name starts with the letter 'S'.
> 3. **ORDER BY - Sorting Results.** List all film titles and their rental durations, sorted by rental duration in descending order.
> 4. **JOIN - Combining Tables.** Write a query to list all films along with their categories. Show the film title and category name.
> 5. **AGGREGATE FUNCTIONS - Counting and Grouping Rows.** Write a query to count how many films there are for each rating (G, PG, PG-13, R, NC-17). Show the count and the rating.
> 6. **AGGREGATE FUNCTIONS - Counting and Grouping Rows.** Write a query to count how many films are in the Action category.
> 7. **INSERT - Adding Data.** Insert a new customer into the customer table. The new customer should have a first name, last name, email, and be linked to an existing store.
> 8. **UPDATE - Modifying Data.** Update the rental rate of all films in the Comedy category, increasing it by 10%.
> 9. **DELETE - Removing Data.** Write a query to delete a rental from the `rental` table.

## 4. SQL Alchemy / Python Exercises
Now, you're going to try connecting to your postgres database using python on your local computer.

Open a terminal window, navigate to your `lab08` directory, and install the dependencies in the `pyproject.toml` file:

```bash 
poetry install
```

You should now be able to run the `orm_samples.py` file as usual from your local terminal:

```bash 
poetry run python orm_samples.py
```

Take a look at the file and try to understand what it does. The code samples are very similar to SQLAlchemy tasks you will be completing (below). 

{:.info}
> ### SQL Alchemy Questions
> You will be implementing some python functions in the `answers_orm.py` as instructed below.
> Before you begin, please run the `answers_orm.py` script first to see what it does:<br><br>
> `poetry run python answers_orm.py`<br><br>
> Note that the first exercise has already been completed for you.
> 1. **`print_titles_and_release_years`** Write a function that uses SQLAlchemy to print the titles and release years of all movies in the film table.
> 2. **`print_customers_starting_with`** Write a function that uses SQLAlchemy to print all customers whose last name starts with the character passed into the function.
> 3. **`print_film_titles_and_durations`** Write a function that uses SQLAlchemy to print all films titles and their durations, sorted by their rental duration in descending order. If two films have the same rental duration, sort them alphabetically by title.
> 4. **`print_film_titles_and_categories`** Write a function that uses SQLAlchemy to print all films along with their categories. Show the film title and category name.
> 5. **`print_num_films_in_action_category`** Write a function that uses SQLAlchemy to print the number of films in the Action category.
> 6. **`create_new_customer`** Write a function that uses SQLAlchemy to create a new customer into the customer table. The new customer should have a first name, last name, email, and be linked to an existing store.
> 7. **`delete_customer_by_id`** Write a function that uses SQLAlchemy to delete a customer from the database based on the `id` argument.
>   * *Note that many of the customers in the database are referenced in other tables (e.g., each customer is associated with a record in the store table, the address table, etc.). Given this, be sure to test your delete functionality with one of the customers you created in the previous exercise (which has no dependencies yet).*
> 8. **`update_customer_email`** Write a function that uses SQLAlchemy to update a customer's email. Required arguments are the customer's id and the new email address.

## What to Submit
Before you submit, make sure you've completed the two sets of tasks:

* SQL tasks: you have written the SQL for the 9 SQL tasks in `answers_sql.md`
* SQLAlchemy tasks: you have successfully written and invoked the 8 SQLAlchemy-based functions using asynchronous database queries in `answers_orm.py`.
{:.checkbox-list}

When you're done, please push your `lab08-b` branch to GitHub and make a pull request. Please ensure that the destination (left-hand side) is pointing to the `main` branch of **your repo** and the source (right-hand side) is pointing to the `lab08-b` branch of **your repo**. Then, please paste a link to your PR in the Moodle.
