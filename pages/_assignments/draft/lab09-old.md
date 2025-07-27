---
layout: assignment-two-column
title: Storing Your Tasks in a Database
type: lab
abbreviation: Lab 9
draft: 1
points: 6
num: 9
start_date: 2024-11-21
due_date: 2024-11-26
---


<style>

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

</style>

## Introduction

In this lab, you will be modifying your `server.py` routes so that they are performing CRUD (create, read, update, delete) operations to your database. We will be using postgreSQL as our database, and SQLAlchemy to interact with our database via python.

### Why are we learning to use a relational database? 

Relational databases offer a standardized way to store and query structured data using SQL (Structured Query Language). Many website backends use some form of a relational database. We will be using <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> as our database, though there are many other options, including Oracle, Microsoft's SQL Server, MySQL, SQLite, and more! 


### What is SQL?
SQL is a declarative programming language that functions at a higher level of abstraction than, say, Python or JavaScript. Using SQL, you tell the database what data operations you want it to execute, but the underlying database system figures out how to actually go about manipulating / retrieving the data. Another nice thing about SQL is that these queries can be optimized to be very efficient (though this is well beyond the scope of this course). If you want to learn more, consider taking **CSCI 343. Database Management Systems**.


### What is an Object Relational Mapping (ORM)?
ORMs allow a programmer to associate user-defined Python classes with database tables, and instances of those classes (objects) with rows in their corresponding tables (<a href="https://docs.sqlalchemy.org/en/14/orm/tutorial.html" target="_blank">more on ORM here</a>). In other words, rather than writing SQL directly, you interact with SQL Alchemy "models" that issue SQL queries under-the-hood.


### What is SQL Alchemy?
As stated on the <a href="https://www.sqlalchemy.org/" target="_blank">SQL Alchemy project page</a>: "SQLAlchemy is the Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL." In other words, SQL Alchemy is a python abstraction that makes communication with databases easier. It is database agnostic, meaning that you use the same commands, regardless of whether you're interacting with PostgreSQL, SQLite, MySQL, or some other relational database. 


{:#installation}
## 1. Set Up Database Logic
In order to complete today's lab, you will need a PostgreSQL database. However, rather than installing one on your laptop, we will be creating another Docker image and container, and using Docker compose to manage the interaction between our Client, Server, and Database containers.

### 1.0. Create a lab08-your-username branch
After completing [Lab 7](lab07), you will create a new branch called `lab08-your-username` branch from your `lab07-your-username` branch (from within your `class-exercises-fall2025` repository) as follows:

```sh
git status  # make sure you've committed all of your files
git branch  # verify that you're on the lab07-your-username branch
git checkout -b lab08-your-username  # should create a new branch based on your lab07 branch
git branch  # verify that you're on your new branch
```

When you're done, please make the following modifications to your code:

### 1.1. Create a secret file to store protected database information
In software development, you never want to include any protected information (database passwords, API keys, etc.) in the codebase. To accomplish this, you typically create an `.env` file, which is used to set environment variables on your operating system that your system can read. This `.env` file is then excluded from your repo and created manually on your production server. 

Create a new file called `.env` at the root of your copy of the `lab05` directory, with the following information:

```bash
#Remember: IRL, never commit your .env file to GitHub
PGPASSWORD=postgres
DB_USERNAME=csci338_user
DB_PASSWORD=12345
DB_HOST=db
DB_PORT=5432
DB_NAME=taskdb
```

You will also copy the `.env` file into your `src` directory. In other words, you will have two copies of `.env` -- one at the root of your lab05, and one inside of `src`.

#### Exclude .env files from the repo
Please also edit your .gitignore file to exclude the `.env` file from the repo (see line 7 below):

```bash
.DS_Store
__pycache__
*.pyc
node_modules
.parcel-cache
dist
.env
```

### 1.2. Create a Database script
Within the `app` directory of your copy of the `lab05` directory, create a new file called `db_setup.sh` with the following information:

```bash
# read environment variables from .env file and use them to create a new database (with custom username, password, etc.)
pg_pass=$(cat ./.env | grep PGPASSWORD | awk -F= '{print $2}')
DB_USERNAME=$(cat ./.env | grep DB_USERNAME | awk -F= '{print $2}')
DB_PASSWORD=$(cat ./.env | grep DB_PASSWORD | awk -F= '{print $2}')
DB_HOST=$(cat ./.env | grep DB_HOST | awk -F= '{print $2}')
DB_PORT=$(cat ./.env | grep DB_PORT | awk -F= '{print $2}')
DB_NAME=$(cat ./.env | grep DB_NAME | awk -F= '{print $2}')


# set the postgres password environment variable
export PGPASSWORD=$pg_pass

# build a new DB user and a new database based on the environment variables:
psql -U postgres -h $DB_HOST -p $DB_PORT -c "DROP DATABASE IF EXISTS "$DB_NAME";"
psql -U postgres -h $DB_HOST -p $DB_PORT -c "CREATE DATABASE "$DB_NAME";"
psql -U postgres -h $DB_HOST -p $DB_PORT -c "DROP USER IF EXISTS "$DB_USERNAME";"
psql -U postgres -h $DB_HOST -p $DB_PORT -c "CREATE USER "$DB_USERNAME" with encrypted password '"$DB_PASSWORD"';"
psql -U postgres -h $DB_HOST -p $DB_PORT -c "ALTER DATABASE "$DB_NAME" OWNER TO "$DB_USERNAME";"
psql -U postgres -h $DB_HOST -p $DB_PORT -c "GRANT all privileges on database "$DB_NAME" to "$DB_USERNAME";"
psql -U postgres -h $DB_HOST -p $DB_PORT -c "GRANT USAGE ON SCHEMA public TO "$DB_USERNAME";"
```

This bash script does the following:
1. Reads in your database connection variables from the secret `.env` file you just made.
2. Creates a new database called `taskdb` (see `.env` file)
3. Creates a new database user called `csci338_user`
4. Grants the new user administrative privileges on the new `taskdb` database

## 2. Set Up Object-Relational Mapping Logic in Python
Now that you've set up your database initialization script, we're going to add logic that enables python to easily communicate with the database. 

### 2.1. Add new python dependencies
Because we are adding new python dependencies, we first need to delete the `.poetry.lock` file if you have one (it should be in the same directory as your `pyproject.toml` file). The lock file will regenerate when we install our new python dependencies via poetry. 

Within your `pyproject.toml` file (inside the `src` directory), please add the following dependencies below the `pytest` dependency:

```
asyncpg = "^0.28.0"
psycopg2 = "^2.9.9"
SQLAlchemy = "^2.0.0"
Faker = "^19.12.0"
python-dotenv = "^1.0.0"
```
A few new modules have been introduced:

* `psycopg2` and `asyncpg` are two modules that enable python to connect with our PostgreSQL database (both synchronously and asynchronously).
* `SQLAlchemy`` is our object relational mapping library.
* `Faker` is a convenience module for generating fake data for our database.
* `python-dotenv` is a convenience module for reading environment variables (from our `.env` file).

### 2.2. Add the ORM Models and associated Logic
In this unit, we're not going to issue SQL queries directly from python. Instead, we're going to use an object-relational mapping library whereby we create python "models" (i.e., classes) to interact with our database for us. Give this, please create a folder inside your `src` directory called `models`. Then, inside `models`, you will create 6 files:

```bash
models
├── __init__.py   # two underscores before and after the "init"
├── base.py
├── db.py
├── db_async.py
├── task.py
└── user.py
```

#### 2.2.1. db.py
Add the following code to `src/models/db.py`:

```py
# https://mattermost.com/blog/building-a-crud-fastapi-app-with-sqlalchemy/
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

import os
from dotenv import load_dotenv
load_dotenv()

url = URL.create(
    drivername="postgresql",
    username=os.environ.get('DB_USERNAME'),
    password=os.environ.get('DB_PASSWORD'),
    host=os.environ.get('DB_HOST'),
    port=os.environ.get('DB_PORT'),
    database=os.environ.get('DB_NAME')
)

# engine = create_engine(url, echo=True)
engine = create_engine(url)
Session = sessionmaker(bind=engine)
session = Session()
```

This file contains a few different things:
* A way to read database environment variables from `.env`
* A way to make **synchronous** database connections and sessions

#### 2.2.2. db_async.py
Add the following code to `src/models/db_async.py`:

```py
# https://stribny.name/blog/fastapi-asyncalchemy/
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

import os
from dotenv import load_dotenv
load_dotenv()

url = URL.create(
    drivername="postgresql+asyncpg",
    username=os.environ.get('DB_USERNAME'),
    password=os.environ.get('DB_PASSWORD'),
    host=os.environ.get('DB_HOST'),
    port=os.environ.get('DB_PORT'),
    database=os.environ.get('DB_NAME')
)

engine = create_async_engine(url, future=True, echo=True)
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)
```

This file does the same thing as `db.py` but makes **asynchronous** database connections and sessions

#### 2.2.3. base.py
Add the following code to `src/models/base.py`:

```py
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
```

`DeclarativeBase` is the base class for SQLAlchemy models. All models need to inherit from this base class. There is also a convenience method, `to_dict()` in this class to make it easy for our API to convert from a Python object to a JSON object.

#### 2.2.4. user.py
Add the following code to `src/models/user.py`:

```py
from sqlalchemy import Column, Integer, String
from .base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)

```

For Lab 8, we are introducing the idea of users into our system. In the real world, there will be many users creating tasks on your system. That said, we need a way to figure out which task belongs to whom, so that when a user logs into your system, they will only see their tasks. The `User` model will be used to interact with the `users` table in the `taskdb` database. Note that it inherits from the `Base` model we just created.

#### 2.2.5. task.py
Add the following code to `src/models/task.py`:

```py
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from .base import Base
from sqlalchemy.orm import mapped_column
from sqlalchemy import ForeignKey


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    done = Column(Boolean, default=False)
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    user = relationship("User")
```

The `Task` model will be used to interact with the `tasks` table in the `taskdb` database. Note that we have introduced the idea of a foreign key that links the tasks table to the users table. This makes table joins easier (we'll look at this in a moment).

#### 2.2.6. __init__.py
Finally, add the following code to `src/models/__init__.py`:

```py
# order matters (models with dependencies must come first)
from .base import Base
from .user import User
from .task import Task
```

The `__init__.py` is a file that tells python that the current folder is a package. Among other things, this file makes import syntax easier for other python files that want to import the models we've just made.

### 2.3. Update your server.py file so that it includes database connection logic
At the top of `server.py` (inside of your `src` directory), add the following import statements:

```py
from models import User, Task
from models.db_async import async_session
from sqlalchemy import select
```

Then, add a new route to the bottom of your existing routes that queries the `tasks` table:

```python
@app.get("/api/tasks")
async def get_tasks():
    async with async_session() as session:
        async with session.begin():
            query = select(Task).order_by(Task.id)
            tasks = await session.scalars(query)

            # Convert each SQLAlchemy Object into a JSON object
            # so that you can send it over HTTP:
            return [task.to_dict() for task in tasks]
```

## 3. Server Build Updates
In order to build our new database and run it using Docker, we need to make some updates to our initialization scripts.

### 3.1. Create a file to build your tables and data
In SQLAlchemy, there are some utility functions that can build tables based on the model structure you set up in the `models` folder. Given this, we will create a file inside of `src` called `populate.py` that will initialize our database. This file should be run anytime you want to rebuild your database, and will be run when Docker first builds your app. Please add the following code to `src/populate.py`

```py
from models import User
from models import Task
from models import Base
from models.db import engine, session
from faker import Faker
import random

tasks = [
    ['Dishes', 'Do the dishes'],
    ['Sweep', 'Sweep the floor'],
    ['Mow', 'Mow the lawn'],
    ['Trash', 'Take out the trash'],
    ['Groceries', 'Buy groceries'],
    ['Exercise', 'Do some jumping jax'],
]

fake = Faker()


def create_tables():
    Base.metadata.create_all(engine)


def drop_tables():
    Base.metadata.drop_all(engine)


def create_user():
    profile = fake.simple_profile()
    tokens = profile['name'].split(' ')
    first_name = tokens.pop(0)
    last_name = ' '.join(tokens)
    username = '{0}_{1}'.format(
        first_name, last_name.replace(' ', '_')).lower()
    provider = profile['mail'].split('@')[1]
    email = '{0}@{1}'.format(username, provider)
    user = User(
        username=username,
        first_name=first_name,
        last_name=last_name,
        email=email)
    return user


def create_fake_users(n=5):
    users = []
    for _ in range(n):
        user = create_user()
        users.append(user)
        session.add(user)
    session.commit()
    return users


def create_fake_tasks(users, n=25):
    for _ in range(n):
        user = random.choice(users)
        task = create_task(user)
        session.add(task)
    session.commit()


def create_task(user):
    dummy_task = random.choice(tasks)
    task = Task(
        name=dummy_task[0],
        description=dummy_task[1],
        done=False,
        user=user
    )
    return task


if __name__ == '__main__':

    # drop all tables:
    step = 1
    print('{0}. Dropping all tables...'.format(step))
    drop_tables()
    step += 1

    # create all tables:
    print('{0}. creating DB tables (if they don\'t already exist)...'.format(step))
    create_tables()
    step += 1

    # fake users:
    print('{0}. creating some fake users...'.format(step))
    users = create_fake_users(5)
    step += 1

    # fake tasks:
    create_fake_tasks(users, n=25)
    print('{0}. creating some fake tasks...'.format(step))
```

The job of the code above is to recreate the database (if it exists) and populate the `users` and `tasks` table with fake data (generated by the Faker library).

### 3.2. Create a file of test SQLAlchemy queries
Create another file inside of `src` called `sample_orm_queries.py`, which will hold some test SQLAlchemy queries. Then paste the following code into this file:

```py
##############################################
# This file uses a synchronous DB connection #
##############################################


from models import Base, User, Task
from models.db import session
from sqlalchemy import select, or_

###################
# SELECT PRACTICE #
###################
# https://docs.sqlalchemy.org/en/14/orm/tutorial.html#querying

# Query all of the users:
query = select(User).order_by(User.id)
# users = session.execute(query)
users = session.scalars(query)

# Output all of the users using regular Python:
print(query)  # prints the SQL
for user in users:
    print(user.username)

# Query all of the tasks:
query = select(Task).order_by(Task.id)
print(query)
tasks = session.scalars(query)

# Print them:
for task in tasks:
    print(task.name, task.user.username)

# Query all of the tasks owned by Keith Taylor:
query = (
    select(Task)
    .join(User)
    .filter(User.username == "keith_taylor")
    .order_by(Task.id)
)
print(query)
tasks = session.scalars(query)

for task in tasks:
    print(task.name, task.user.username)

# Query all of the tasks owned by Keith Taylor or Misty Baker:
query = (
    select(Task)
    .join(User)
    .filter(
        or_(User.username == "keith_taylor",
            User.username == "misty_baker")
    )
    .order_by(Task.id)
)
print(query)
tasks = session.scalars(query)
for task in tasks:
    print(task.name, task.user.username)

###################
# INSERT PRACTICE #
###################

# create a user:
user = User(
    username='walter_jones',
    first_name='Walter',
    last_name='Jones',
    email='walter_jones@gmail.com'
)

# save it:
session.add(user)
session.commit()

# verify that it worked:
query = select(User).order_by(User.id)
users = session.scalars(query)
for user in users:
    print(user.to_dict())


# create a task:
task = Task(
    name='Gym',
    description='Lift weights',
    done=False,
    user=user
)

# save it:
session.add(task)
session.commit()

# verify that it worked:
query = select(Task).order_by(Task.id)
tasks = session.scalars(query)
for task in tasks:
    print(task.to_dict())


###################
# UPDATE PRACTICE #
###################

# get task #5 from the database:
query = select(Task).where(Task.id == 5)
result = session.execute(query).fetchone()
print(result)  # returns as a tuple, so get the first task from the tuple
task = None
if result is not None:
    task = result[0]
    print(task.to_dict())  # before
    task.done = True
    session.commit()
    print(task.to_dict())  # after


###################
# DELETE PRACTICE #
###################

# delete task #5
if task is not None:
    session.delete(task)
    session.commit()

# verify:
query = select(Task).where(Task.id == 5)
result = session.execute(query).fetchone()
print(result)  # None

```

### 3.3. Modify Docker's compose.yaml file
Finally, please modify your `compose.yaml` file so that it looks like the one below:

```bash
services:
  server:
    build:
      context: .
    ports:
      - "8000:8000"
    volumes:
      - ./src:/app
    depends_on:
      ui:
       condition: service_healthy
      db_setup:
        condition: service_completed_successfully
    entrypoint: > 
      bash -c "poetry run python populate.py && poetry run uvicorn server:app --host 0.0.0.0 --reload"

  ui:
    image: node:lts
    # user: "${UID}:${GID}"
    ports:
      - "1234:1234"
    volumes:
      - ./src/ui:/app
      - /app/.parcel-cache
      - /app/node_modules
    working_dir: /app
    healthcheck:
      test: "ls dist"
      timeout: 90s
      interval: 10s
    entrypoint: npm run watch

  db:
    image: postgres:15
    env_file:
    - .env
    environment:
      - POSTGRES_PASSWORD=${PGPASSWORD}
    healthcheck:
      test: "psql -U postgres -h ${DB_HOST} -p ${DB_PORT}"
      timeout: 10s
      interval: 10s
    volumes:
      - ./src:/script
    working_dir: /script

  db_setup:
    image: postgres:15
    env_file:
    - .env
    volumes:
      - ./src:/script
    depends_on:
      db:
        condition: service_healthy
    working_dir: /script
    entrypoint: "bash ./db_setup.sh"
```

A few things have been added here:
1. A new image for your postgreSQL database
1. A new container to test that your database is running
1. Also note that your docker file is reading from the `.env` file at the root of your `lab05` folder.

## 4. Run your server and experiment
Now that you have made the updates, verify that everything worked as follows:

### 4.1. Build your docker image
On the command line from the root of your `lab05 folder`, type:

```sh
docker compose up
```

Wait for the file to build. If it worked, you should be able to see data from the database when you navigate to: <a href="http://localhost:8000/api/tasks" target="_blank">http://localhost:8000/api/tasks"</a>

### 4.2. PostgreSQL Tests
First, list all of your docker containers:

```bash
docker container ls -a
```

Then, activate the bash shell on your database server:

```bash
docker exec -it <container_id> bash
```

Once on your database's bash shell, connect to your `taskdb` database with the `csci338_user` account:

```bash
psql -U csci338_user -d taskdb
```

Once on the psql shell, execute some queries:


#### SELECT
```sql

-- all columns, all rows from users table:
SELECT * FROM users;


SELECT * FROM tasks; 

-- 3 columns from both the tasks and users table
-- joining on the user_id column
-- returns records for user #5 only
SELECT tasks.name, tasks.done, users.username
FROM tasks
INNER JOIN users ON tasks.user_id = users.id
WHERE users.id = 5;
```

* Use the spacebar to page to see more results
* Type q to get back to the sql prompt
* Type \q to get back to the bash shell

Select cheat sheet:

| Clause | Example | Documentation |
|--|--|--|
| SELECT | SELECT statement that retrieves data from a single table:<br><br>SELECT * FROM users;<br>SELECT name, done FROM tasks;  | <a href="https://www.postgresqltutorial.com/postgresql-select/" target="_blank">SELECT docs</a> |
| ORDER BY | The ORDER BY clause allows you to sort rows returned by a SELECT clause in ascending or descending order based on a sort expression:<br><br>SELECT * FROM users ORDER BY last_name;<br>SELECT * FROM users ORDER BY last_name desc; | <a href="https://www.postgresqltutorial.com/postgresql-order-by/" target="_blank">ORDER BY docs</a> |
| WHERE | The WHERE clause uses a condition to filter the rows returned from the SELECT clause:<br><br>SELECT * FROM users WHERE id = 3;<br>SELECT * FROM users WHERE id < 3; | <a href="https://www.postgresqltutorial.com/postgresql-where/" target="_blank">WHERE docs</a> |
| INNER JOIN | Joins two tables where the values of two columns are equal. For instance, to query the tasks and usernames of people who who have have outstanding tasks, we could issue this query:<br><br>SELECT tasks.name, tasks.done, users.username<br>FROM tasks<br>INNER JOIN users ON tasks.user_id = users.id<br>WHERE tasks.done = false; | <a href="https://www.postgresqltutorial.com/postgresql-inner-join/" target="_blank">INNER JOIN docs</a> |

#### UPDATE
Updating allows you to alter records in a table. The syntax is as follows:

```sql
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;

-- specific example:
UPDATE tasks
SET done = true
WHERE id = 3;
```

A common mistake is forgetting to include the where clause. Without it, the update will be made to EVERY RECORD of your table.

<a href="https://www.postgresqltutorial.com/postgresql-update/" target="_blank">UPDATE docs</a>

#### INSERT
Inserting allows you to add records to a table. The syntax is as follows:

```sql
INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …);

-- Specific example:
INSERT INTO tasks (name, description, done, user_id)
VALUES('Exercise', 'Run a mile', false, 4);

-- Verify that it worked (use space bar to see more results, q to quit):
SELECT * FROM tasks;
```

<a href="https://www.postgresqltutorial.com/postgresql-insert/" target="_blank">INSERT docs</a>

#### DELETE
The DELETE statement allows you to delete one or more rows from a table.

```sql
DELETE FROM table_name
WHERE condition;

-- specific example:
DELETE FROM tasks WHERE id = 1;

-- Note that if you try to delete a user, you can't because there are
-- records in the task table that depend on user_id = 1.
-- Database constraints (like primary key - foreign key relationships) prevent this:
DELETE FROM users WHERE id = 1;
```

Note: if you forget to include the where clause, you will delete every record in your table by accident. Yikes!

<a href="https://www.postgresqltutorial.com/postgresql-delete/" target="_blank">DELETE docs</a>

### 4.3. Python / FastAPI Tests

Activate the bash shell on your python server:

```bash
docker exec -it <container_id> bash
```

Then activate the poetry shell:

```bash
poetry shell
```

#### Rebuild the database

For practice, try running the `populate.py` script from the command line to see what happens:

```bash
python populate.py
```

You should have seen something like this output to the screen:

```
Dropping all tables...
creating DB tables (if they don't already exist)...
creating some fake users...
creating some fake tasks...
```

This script rebuilds the database and repopulates your database with new fake data. Issue a SQL command on the DB shell to see...

#### Experiment with SQLAlchemy
Now, type `python` on the command prompt of your server shell to activate the interactive python shell.

Once you're in there, paste the following commands into the interactive shell:

```py
from models import Base, User, Task
from models.db import session
from sqlalchemy import select, or_
```

These import statements are needed to experiment with the SQLAlchemy models. 

##### SELECT
Let's try some select statements:

```py
# Query all of the users:

# create the query
query = select(User).order_by(User.id)

# create the query session
users = session.scalars(query)

print(query)  # prints the SQL

# Output all of the users using regular Python:
for user in users:
    print(user.to_dict())
```

Take a look at the results in your interactive shell. Note that when you issue the `print(query)` command, it shows you the underlying SQL that your code executes.

Practice with a few more SELECT statements. Paste in each statement one by one and see what happens:

```py
# Query all of the tasks:
query = select(Task).order_by(Task.id)
print(query)
tasks = session.scalars(query)

# Print them:
for task in tasks:
    print(task.name, task.user.username)

# Query all of the tasks owned by Keith Taylor:
# change keith_taylor to someone who is in your DB:
query = (
    select(Task)
    .join(User)
    .filter(User.username == "keith_taylor") 
    .order_by(Task.id)
)
print(query)
tasks = session.scalars(query)

for task in tasks:
    print(task.to_dict())

# Query all of the tasks owned by Keith Taylor or Misty Baker
# (use actual users in your DB):
query = (
    select(Task)
    .join(User)
    .filter(
        or_(User.username == "keith_taylor",
            User.username == "misty_baker")
    )
    .order_by(Task.id)
)
print(query)
tasks = session.scalars(query)
for task in tasks:
    print(task.to_dict())

```

##### INSERT
Let's try a DB insert:

```py
###################
# INSERT PRACTICE #
###################

# create a user:
user = User(
    username='walter_jones',
    first_name='Walter',
    last_name='Jones',
    email='walter_jones@gmail.com'
)

# save it:
session.add(user)
session.commit()

# verify that it worked:
query = select(User).order_by(User.id)
users = session.scalars(query)
for user in users:
    print(user.to_dict())


# create a task:
task = Task(
    name='Gym',
    description='Lift weights',
    done=False,
    user=user
)

# save it:
session.add(task)
session.commit()

# verify that it worked:
query = select(Task).order_by(Task.id)
tasks = session.scalars(query)
for task in tasks:
    print(task.to_dict())
```

##### UPDATE
Let's try a DB update:

```py
###################
# UPDATE PRACTICE #
###################

# get task #5 from the database:
query = select(Task).where(Task.id == 5)
result = session.execute(query).fetchone()
print(result)  # returns as a tuple, so get the first task from the tuple
task = None
if result is not None:
    task = result[0]
    print(task.to_dict())  # before
    task.done = True
    session.commit()
    print(task.to_dict())  # after
```

##### DELETE
Let's try a DB delete:

```py
###################
# DELETE PRACTICE #
###################

# delete task #5
if task is not None:
    session.delete(task)
    session.commit()

# verify:
query = select(Task).where(Task.id == 5)
result = session.execute(query).fetchone()
print(result)  # None
```


## 5. Start the Lab
Last Thursday, you configured your `lab08` branch to work with SQLAlchemy and the PostgreSQL database. You are now ready to complete the lab. 

### 5.1. Data Model Notes
Before implementing your endpoints, a few notes:

* Since we are now building a system where multiple users can have tasks, we have a new table called `users`. Each record in the user table represents a different user of your system. The JSON represention of the `User` model is shown below.
* Each `Task` object also needs to be extended to account for the user to which the task belongs. The JSON represention of the `Task` model is shown below.

#### User Model
Below is a sample JSON representation of the `User` model:
```json
{
    "id": 1,
    "username": "jane_doe",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane_doe@gmail.com"
}
```

#### Task Model
Below is a sample JSON representation of the `Task` model. Note that there are two new data fields: 

* `done` -- flag indicating whether the task has been completed, and 
* `user_id` -- foreign key to the `User` model:

```json
{
    "id": 4,
    "name": "jane_doe",
    "description": "Jane",
    "done": false,
    "user_id": 1
}
```

### 5.2. New Helper functions in server.py
Now that we are (a) using a database and (b) assumping that a user is logged into your system, we will need to make three modifications to `server.py`:

#### 5.2.1. Session Function
First, we will create a function to generate a reusable session object, which we will use to connect to our PostgreSQL database. Please add this code directly below the `app = FastAPI()` statement in your `server.py` file:

```py
_session = None

async def get_session():
    global _session
    if _session is None:
        _session = async_session()
        await _session.begin()
    return _session
```

#### 5.2.2. Logged In User Function
Second, create a function that spoofs a logged in user (let's just assume that the user with `id=1` is the user logged into the system). Add this code directly below the session function you just added:

```py
_user = None

async def get_current_user():
    global _user
    if _user is None:
        user_id = 1
        session = await get_session()
        query = select(User).where(User.id == user_id)
        result = await session.execute(query)
        record = result.fetchone()
        if record:
            _user = record[0]
        else:
            raise Exception(f'No User in database with id={user_id}')
    return _user
```

#### 5.2.3. Modify get_tasks()
Finally, now that we have a simpler way to create a database session and a way to access the logged in user, we will replace the `get_tasks()` function as follows:

**Replace this code...**
```python
@app.get("/api/tasks")
async def get_tasks():
    async with async_session() as session:
        async with session.begin():
            query = select(Task).order_by(Task.id)
            tasks = await session.scalars(query)

            # Convert each SQLAlchemy Object into a JSON object
            # so that you can send it over HTTP:
            return [task.to_dict() for task in tasks]
```

**...with this code (simplified session syntax with only the current user's tasks)**
```python
@app.get("/api/tasks")
async def get_tasks():
    session = await get_session()
    # get the (fake) current user:
    user = await get_current_user()
    user_id = user.id
    query = (
        select(Task)
        .where(Task.user_id == user_id)
        .order_by(Task.id)
    )
    tasks = await session.scalars(query)
    return [task.to_dict() for task in tasks]
```

The updated function uses the reusable database session, and filters the task  list according to the user who is logged into the system.

### 5.3. Create new REST endpoints to interact with the database
You are now ready to create the following endpoints:

<table>
<thead>
    <tr>
        <th>Method/Route</th>
        <th>Description and Examples</th>
        <th>Parameters</th>
        <th>Response Type</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>GET /api/tasks</td>
        <td>Returns all of the tasks in the database that belong to the current user. If the user specifies a <code>status</code> parameter, then only return the tasks that correspond to the status (open or closed).
            <ul>
                <li><a href="http://localhost:8000/api/tasks">http://localhost:8000/api/tasks</a>
                    <br>Returns all tasks associated with the current user
                </li>
                <li><a href="http://localhost:8000/api/tasks?status=open">http://localhost:8000/api/tasks?status=open</a>
                    <br>Returns open tasks associated with the current user
                </li>
                <li><a href="http://localhost:8000/api/tasks?status=closed">http://localhost:8000/api/tasks?status=closed</a> <br>Returns completed tasks associated with the current user
                </li>
            </ul>
            Note that this endpoint is already partially implemented for you.
        </td>
        <td>
            <ul>
                <li><code>status (string, optional)</code> Specifies whether to return open or closed tasks. If not set, return all tasks.</li>
            </ul>
        </td>
        <td>List of Task objects</td>
    </tr>
    <tr>
        <td>POST /api/tasks/</td>
        <td>Creates a new user (database insert).
            Note that tasks now require a user. Before inserting into the DB, make sure you assign the user to the current user logged into the system (using the <code>get_logged_in_user()</code> function).
            <br><br>
            If invalid data is posted, return a 400 error with a JSON message that says something like:<br><code>{"error": "actual description of the error"}</code>. 
        </td>
        <td>
            <ul>
                <li><code>name (string, required)</code> Name of the task</li>
                <li><code>description (string, required)</code> Description of the task</li>
                <li><code>done (boolean, required)</code> Whether or not the task is completed.</li>
            </ul>
        </td>
        <td>Task object that was just created</td>
    </tr>
    <tr>
        <td>GET /api/tasks/{task_id}</td>
        <td>Returns the task associated with the <code>task_id</code>.
            <br><br>
            If the task does not belong to the current user or if it doesn't exist, throw a 404 error with a JSON message that says:<br><code>{"error": "task does not exist"}</code>
        </td>
        <td></td>
        <td>Single task object</td>
    </tr>
    <tr>
        <td>DELETE /api/tasks/{task_id}</td>
        <td>Deletes the task associated with the <code>task_id</code> from the database. 
            <br><br>
            If the task does not belong to the current user or if it doesn't exist, throw a 404 error with a JSON message that says:<br><code>{"error": "task does not exist"}</code>. 
        </td>
        <td></td>
        <td>Empty object <code>{}</code></td>
    </tr>
    <tr>
        <td>GET /api/user</td>
        <td>Returns the current user who is logged into the system
            <br><br>
        This is an easy one: just return a JSON representation of the user returned by the <code>get_logged_in_user()</code> function.</td>
        <td></td>
        <td>User object</td>
    </tr>
        <tr>
        <td><strong>OPTIONAL</strong>: PATCH /api/tasks/{task_id}</td>
        <td>
            Updates the task associated with the <code>task_id</code>. 
            <ul>
                <li>If the task does not belong to the current user or if it doesn't exist, throw a 404 error (same as GET).
                </li>
                <li>
                    If invalid data is posted, return a 400 error (same as POST). 
                </li>
            </ul>
        </td>
        <td>Same as POST</td>
        <td>Single task object</td>
    </tr>
</tbody>
</table>

### 5.4. Modifying your REACT Client to interact with new Endpoints
Once you have implemented all of the required endpoints, update your React app so that it interacts with your new endpoints.

## 6. What to turn in
Before you submit, please verify that you have completed all of the tasks:

**Task Routes**

{:.checkbox-list}
* GET (List) - Only shows the current user's tasks (filtered by whether the tasks are closed or open if applicable). Examples:
    * /api/tasks
    * /api/tasks?status=open
    * /api/tasks?status=closed
* GET (Detail) - Shows the corresponding task (if it exists and belongs to the current user). Example:
    * /api/tasks/3
* DELETE - Deletes task if it exists and belongs to the current user). Example:
    * /api/tasks/3
* POST - Adds a task if valid information is submitted (and handles invalid data with an appropriate error message)
    * /api/tasks

**User Route**

{:.checkbox-list}
* GET - Shows the current user. Example:
    * /api/user

**React App**

{:.checkbox-list}
* React App interacts with the **database version of the endpoints,** including listing, creating, and deleting tasks belonging to the current logged in user. 

When you're done, please create a pull request with the fully implemented web client (which should be completed inside of your version of your `lab05` folder).