---
layout: assignment-two-column
title: Database Activity
type: lab
abbreviation: Lab 8a
draft: 1
points: 6
num: 8
start_date: 2023-11-07
due_date: 2023-11-08
---


<style>
    table.admin th:first-child, 
    table.admin td:first-child {
        width: auto;
        min-width:200px;
    }

    table.admin th:last-child, 
    table.admin td:last-child {
        width: auto;
        min-width:180px;
    }
</style>

## Introduction

{:.blockquote-no-margin}
> ### Overview 
> In this lab, you will be doing the following:
>
> {:.compact}
> 1. [Installing PostgreSQL](#installation)
> 2. [Configuring](#configuration) PGAdmin and the command line interface
> 3. [Walking through the SQL Rules](#sql) to create, read, update, and delete (CRUD) data from your database.
> 4. [Completing the SQL exercises](#practice)

### Why are we learning to use a relational database? 

Relational databases offer a standardized way to store and query structured data using SQL (Structured Query Language). Many website backends use some form of a relational database. We will be using <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> as our database, though there are many other options, including Oracle, Microsoft's SQL Server, MySQL, SQLite, and more! 

In two weeks, we will be configuring a database "in the cloud," and querying it by asking python to issue various SQL commands. Today, we will just be getting familiar with some of the basic SQL syntax.

### What is SQL?
SQL is a declarative programming language that functions at a higher level of abstraction than, say, Python or JavaScript. Using SQL, you tell the database what data operations you want it to execute, but the underlying database system figures out how to actually go about manipulating / retrieving the data. Here is an example of a SQL query that retrieved data from two tables, `users` and `posts`, in order to figure out which user has the most posts:

{:.overflow}
```
SELECT users.username, count(posts.id) as post_count
FROM posts
INNER JOIN users ON
    posts.user_id = users.id
GROUP BY users.username
ORDER BY count(posts.id) desc;


     username      | post_count 
-------------------+------------
 adam_wilcox       |         12
 shannon_dyer      |         12
 mary_green        |         12
 rachel_murphy     |         12
 jamie_evans       |         12
 john_hughes       |         12
 erika_smith       |         12
 carla_fleming     |         11
 timothy_maldonado |         11
 lori_horton       |         11
 mr._daniel_turner |         10
 heather_moore     |         10
 david_robinson    |         10
 webdev            |         10
 russell_sellers   |         10
 ryan_valentine    |          9
 geoffrey_reed     |          9
 rebecca_brown     |          9
 daniel_myers      |          9
 jason_morris      |          9
 rodney_marshall   |          8
 stephen_landry    |          8
 nicholas_khan     |          8
 john_morales      |          8
 barbara_armstrong |          8
 kayla_johnson     |          7
 tyler_williams    |          7
 sharon_ritter     |          7
 david_cole        |          7
 barbara_stone     |          6
 george_thomas     |          6
(31 rows)
```

With very few lines of "declarative" code, we have merged two data structures together, selected a few attributes, counted the posts by user, and sorted the post_counts in decending order. It's useful to think about how you might do something like this manually, with python, if you had 2 lists of dictionaries (doable, but it would take a lot longer).

Another nice thing about SQL is that these queries can be optimized to be very efficient (though this is well beyond the scope of this course). If you want to learn more, consider taking **CSCI 343. Database Management Systems**.

{:#installation}
## 1. Installation
In order to complete today's lab, you will need to install PostgreSQL on your laptop. These installation instructions are based on the  <a href="https://www.postgresqltutorial.com/postgresql-getting-started/" target="_blank">PostgreSQL Getting Started Guide</a>. Please do the following:

* <a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads" target="_blank">Download the latest PostgreSQL version</a> (currently v. 15.x) for either Windows or Mac
* Follow the OS-Specific instructions to install and verify your PostgreSQL installation:
    * <a href="https://www.postgresqltutorial.com/install-postgresql/" target="_blank">Windows</a>
    * <a href="https://www.postgresqltutorial.com/install-postgresql-macos/" target="_blank">Mac</a>
* A few notes as you run the installer:
    * **DO NOT FORGET** the DB Admin password you assign for the `postgres` account
    * Take all the defaults, and use a default port of `5432`
    * If, for some reason, port 5432 is taken, just use the suggested port given by the installer (and make a note of it)
    * You do NOT need to install the "Stack Builder" (unless you want to)

{:#configuration}
## 2. Configuration
<a class="nu-button" href="/spring2023/course-files/tutorials/tutorial10.zip">tutorial10.zip<i class="fas fa-download" aria-hidden="true"></i></a>

* Download tutorial10.zip (above) and unzip it, and move it into your `csci344/tutorials` folder / git repo.
* Follow the procedure outlined in <a href="https://www.postgresqltutorial.com/load-postgresql-sample-database/" target="_blank">these instructions</a>, but make the following modifications:
    * Create a database called `tutorial10`, using either the command line interface or the PGAdmin GUI interface.
    * Load the `tutorial10.tar` (in the tutorial10 folder you just downloaded) into the empty `tutorial10` database (to create the table structure and table data).

<!-- pg_dump -U postgres -p 5432 -Ft photo-app > ~/Desktop/tutorial10.tar
postgres=# CREATE DATABASE tutorial10;
pg_restore -U postgres -d tutorial10 ~/Desktop/tutorial10.tar -->

You have a few options for interacting with your database: 

### 1. PGAdmin
PGAdmin is a GUI tool for managing PostgreSQL databases. 

### 2. Adding psql to your path
`psql` is a command line program that allows you to interact with PostgreSQL databases. Open your Terminal or command prompt and type `psql -U postgres`. 
* If the `psql -U postgres` command was recognized, jump to [Section 3](#sql) ("Walkthrough of SQL Commands"). Otherwise, you'll have to add it to your path by following the instructions below.

#### 1. Mac instructions
Note: you only have to do this if the `psql -U postgres` command was NOT recognized on your Terminal.
1. Find the location of your `psql` executable on your computer by searching for `psql`. Make a note of where it is (for Sarah, it's located at `/Library/PostgreSQL/15/bin/psql`)
1. Open a Terminal window. Figure out which shell you're using by typing `echo $SHELL` at the command prompt.
1. Depending on the shell version you're using, open *one* of the files below (in your home directory) in a text editor:
    * for zsh edit one of these:
        * `~/.zshrc`
        * `~/.zprofile`
    * for bash, edit one of these:
        * `~/.bashrc`
        * `~/.bash_profile` 

1. In the file you just opened, add the following line:<br>`PATH=$PATH:/Library/PostgreSQL/15/bin` (but use ***your*** bin/psql path) to the end.
1. Source the file you just edited by typing `source ~/.bashrc` (or whatever file you just edited). This will load your updated path variable and make it accessible to your shell.
1. When you're done, type `psql -U postgres` on your command line and it should work.


You can read more about each shell here:
* <a href="https://www.baeldung.com/linux/bashrc-vs-bash-profile-vs-profile" target="_blank">bash</a>
* <a href="https://apple.stackexchange.com/questions/388622/zsh-zprofile-zshrc-zlogin-what-goes-where" target="_blank">zsh</a>


#### 2. Windows instructions
Note: you only have to do this if the `psql -U postgres` command was NOT recognized on your command prompt.
Follow <a href="https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools" target="_blank">this tutorial</a>. Notes:
1. You will first need to find where your PostgreSQL bin has been installed on your computer. Should be something like: `C:\Program Files\PostgreSQL\15\bin`
1. Once you do, you will append the path to your PostgreSQL bin to your PATH environment variable. <a href="https://www.mathworks.com/matlabcentral/answers/94933-how-do-i-edit-my-system-path-in-windows" target="_blank">Here is how to do this</a>.
1. Once you save your changes, be sure to restart your command prompt.
1. Finally, type `psql -U postgres` on your command line and it should work.

After you have configured your database, your `tutorial10` database should have the following structure:

<img class="large" src="/spring2023/assets/images/tutorials/tutorial10/schema.svg" />

{:#sql}
## 3. Walkthrough of SQL Commands
This section walks you through some of the SQL commands you will be using in [Part 4](#practice). Please try executing these commands to understand how they work:

### 1. Administrative commands if you use the command line interface
To enter the postgreSQL shell, type: `psql -U postgres` (connecting as the postgres superuser). Once you're in the psql shell, try using the following commands:

{:.admin}
| Command | Explanation | Example |
|--|--|--|
| `\q` | Exits the psql shell | |
| `\l` | Lists all the available databases | |
| `\c <dbname> <username>` | Connect to specific database | `\c photo_app_tutorial postgres` |
| `\dt` | Lists all of the tables in the database you're connected to |
| `\d <table_name>` | Describes the structure (i.e., "schema") of a table | `\d posts` |
| `\du` | List all users and their roles | |
| space bar | If you query data in a table that has multiple pages, the space bar will show you the next set of records.  | |
| q | If you query data in a table that has multiple pages, and you want to go back to the psql prompt. | |

For instance, to connect to the database you just made, type:

From terminal / command prompt
```shell
psql -U postgres
```

Within psql environment:
```
\c photo_app_tutorial
\dt
```

Output:
```
photo_app_tutorial10=# \dt
             List of relations
 Schema |      Name      | Type  |  Owner   
--------+----------------+-------+----------
 public | bookmarks      | table | postgres
 public | comments       | table | postgres
 public | following      | table | postgres
 public | likes_comments | table | postgres
 public | likes_posts    | table | postgres
 public | posts          | table | postgres
 public | stories        | table | postgres
 public | users          | table | postgres
(8 rows)
```

Consult <a href="https://www.postgresqltutorial.com/psql-commands/" target="_blank">this guide</a> for more details.

### 2. SELECT
After you've connected to a database, you can query and manipulate data. Selecting is the most complex part of the SQL language. Some of the most commonly used commands in a select statement are listed below:

| Clause | Example | Documentation |
|--|--|--|
| SELECT | SELECT statement that retrieves data from a single table:<br><br>SELECT * FROM posts;<br>SELECT id, caption FROM posts;  | <a href="https://www.postgresqltutorial.com/postgresql-select/" target="_blank">SELECT docs</a> |
| ORDER BY | The ORDER BY clause allows you to sort rows returned by a SELECT clause in ascending or descending order based on a sort expression:<br><br>SELECT * FROM users ORDER BY last_name;<br>SELECT * FROM users ORDER BY last_name desc; | <a href="https://www.postgresqltutorial.com/postgresql-order-by/" target="_blank">ORDER BY docs</a> |
| WHERE | The WHERE clause uses a condition to filter the rows returned from the SELECT clause:<br><br>SELECT * FROM users WHERE id = 3;<br>SELECT * FROM users WHERE id > 10; | <a href="https://www.postgresqltutorial.com/postgresql-where/" target="_blank">WHERE docs</a> |
| INNER JOIN | Joins two tables where the values of two columns are equal. For instance, if we want to know the usernames of the people who Thomas Choi (id=3) is following, we would join the `following` table to the `users` table as follows:<br><br>SELECT following.id, users.username<br>FROM following<br>INNER JOIN users ON following.following_id = users.id<br>WHERE following.user_id = 3; | <a href="https://www.postgresqltutorial.com/postgresql-inner-join/" target="_blank">INNER JOIN docs</a> |
| GROUP BY | The Group By statement allows you aggregate your data  (e.g. sum, count, etc.) by groupings. For instance, if you want to know how many posts each user has made or how many likes each post has, the GROUP BY function can help:<br><br>SELECT user_id, count(\*) FROM bookmarks GROUP BY user_id ORDER BY count(*) desc; | <a href="https://www.postgresqltutorial.com/postgresql-group-by/" target="_blank">GROUP BY docs</a> |

### 3. UPDATE
Updating allows you to alter records in a table. The syntax is as follows:

```sql
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;

-- specific example:
UPDATE posts
SET caption = 'This is my dog' 
WHERE id = 3;
```

A common mistake is forgetting to include the where clause. Without it, the update will be made to EVERY RECORD of your table.

<a href="https://www.postgresqltutorial.com/postgresql-update/" target="_blank">UPDATE docs</a>

### 4. INSERT
Inserting allows you to add records to a table. The syntax is as follows:

```sql
INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …);

-- Specific example:
-- Note that now() is a built-in PostgreSQL function that gets the current timestamp.
INSERT INTO comments (text, user_id, post_id)
VALUES('Great photo!', 5, 3, now());

```
<a href="https://www.postgresqltutorial.com/postgresql-insert/" target="_blank">INSERT docs</a>

### 5. DELETE
The DELETE statement allows you to delete one or more rows from a table.

```sql
DELETE FROM table_name
WHERE condition;

-- specific example:
DELETE FROM comments
WHERE id = 1;
```

Note: if you forget to include the where clause, you will delete every record in your table by accident. Yikes!

<a href="https://www.postgresqltutorial.com/postgresql-delete/" target="_blank">DELETE docs</a>

{:#practice}
## 4. Your Tasks (What you will be turning in)

For each of the exercises below, write the SQL statement that achieves the goal described in the prompt. When you've figured it out, paste the statement (or statements) into the `answers.sql` file (that you downloaded) beneath the corresponding exercise number.

### 1. Selecting all columns
Write a query to retrieve all of the records in the `users` table. It should return the following data:

{:.overflow}
```
 id | first_name |   last_name   |     username      |    password_plaintext    |                                             password_hash                                              |            email            |              image_url               |             thumb_url              |        date_created        | is_verified | is_disabled 
----+------------+---------------+-------------------+--------------------------+--------------------------------------------------------------------------------------------------------+-----------------------------+--------------------------------------+------------------------------------+----------------------------+-------------+-------------
  1 | Webdev     | User          | webdev            | password                 | pbkdf2:sha256:260000$F1DNoH1iCqK0LI5t$7a8c70ef93b705e209dd66195d320de93b40556c3ef753502fe2b3620c5f16b2 | webdev@u.northwestern.edu   | https://picsum.photos/300/200?id=566 | https://picsum.photos/30/30?id=589 | 2022-04-10 17:45:59.163585 | f           | f
  2 | David      | Cole          | david_cole        | up_knowledge_end         | pbkdf2:sha256:260000$apWgUPOjsMiGkMDv$f15a8ce254ffe961e17c5bb6d9fb10b3123e82e8e846ddf7d7034cf8647e55b4 | david_cole@yahoo.com        | https://picsum.photos/300/200?id=313 | https://picsum.photos/30/30?id=958 | 2022-04-10 17:46:03.979957 | f           | f
  3 | Jamie      | Evans         | jamie_evans       | police_start_series      | pbkdf2:sha256:260000$umfdYNHpQAwyil8s$1b04bcfa094321daff5dff07ffd66bf38a53a004575247c3cf048d3bf0c5975d | jamie_evans@hotmail.com     | https://picsum.photos/300/200?id=328 | https://picsum.photos/30/30?id=124 | 2022-04-10 17:46:03.979963 | f           | f
  4 | Mary       | Green         | mary_green        | effect_painting          | pbkdf2:sha256:260000$oEXou2jcxRoQj4iE$c8bb4629b989de55708924da83e569550a24782f6c8f000aef4d991fe28293de | mary_green@yahoo.com        | https://picsum.photos/300/200?id=637 | https://picsum.photos/30/30?id=397 | 2022-04-10 17:46:03.979966 | f           | f
  5 | Jason      | Morris        | jason_morris      | building_seek            | pbkdf2:sha256:260000$IegvobCoRH2s5gWd$ee3e25a8ad9a7adaeb77f8191807144d818cf256ef450d4479f454ccc45395aa | jason_morris@yahoo.com      | https://picsum.photos/300/200?id=812 | https://picsum.photos/30/30?id=370 | 2022-04-10 17:46:03.979969 | f           | f
  6 | Erika      | Smith         | erika_smith       | area_how_area            | pbkdf2:sha256:260000$7jddojBiVhNAgF6J$484b91a4aec1741ad4aeb5b619ea7bbef867d481f9f9c3ce65097ea2b2f3cd2a | erika_smith@yahoo.com       | https://picsum.photos/300/200?id=809 | https://picsum.photos/30/30?id=923 | 2022-04-10 17:46:03.979971 | f           | f
  7 | Timothy    | Maldonado     | timothy_maldonado | thus_difficult           | pbkdf2:sha256:260000$EUuh12mYmnKm6Yjp$ca6007aa630aec090f82a028db16fa59a4a5cea3efe0a288d3b7cfb65114c81b | timothy_maldonado@yahoo.com | https://picsum.photos/300/200?id=525 | https://picsum.photos/30/30?id=666 | 2022-04-10 17:46:03.979973 | f           | f
  8 | Rachel     | Murphy        | rachel_murphy     | team_property_much       | pbkdf2:sha256:260000$yZx8RM3e7DFyiCwy$ccc9e9952cb8a208ba415c51385187d693094a04c41264c02f0d27d4a1f1744b | rachel_murphy@yahoo.com     | https://picsum.photos/300/200?id=335 | https://picsum.photos/30/30?id=600 | 2022-04-10 17:46:03.979976 | f           | f
  9 | Sharon     | Ritter        | sharon_ritter     | culture_avoid            | pbkdf2:sha256:260000$zFqp3eBo7UCHYzCD$bc103e6235b9c56de34155f523410b00f15fcb851992f90da76d119e1eeada72 | sharon_ritter@hotmail.com   | https://picsum.photos/300/200?id=355 | https://picsum.photos/30/30?id=117 | 2022-04-10 17:46:03.979978 | f           | f
 10 | Carla      | Fleming       | carla_fleming     | skill                    | pbkdf2:sha256:260000$grhLOI018dy9Dsgu$326fa7f1f9f2835590dd97e6c096c7d4e124393f92543ee0e4f6753321e56730 | carla_fleming@yahoo.com     | https://picsum.photos/300/200?id=295 | https://picsum.photos/30/30?id=973 | 2022-04-10 17:46:03.979981 | f           | f
 11 | Kayla      | Johnson       | kayla_johnson     | common_else_while        | pbkdf2:sha256:260000$tLvL58hfE6en23aE$f42a85d8202da749dcc146cbf9fececf441084f70037feb6da48735b4936279b | kayla_johnson@hotmail.com   | https://picsum.photos/300/200?id=635 | https://picsum.photos/30/30?id=668 | 2022-04-10 17:46:03.979983 | f           | f
 12 | Rebecca    | Brown         | rebecca_brown     | hand_help_save           | pbkdf2:sha256:260000$mDa1Cp5UA5RCb4FQ$2440db2dd530318a83f23ecb63f6e28ae7573fd3f79e6b1fd99281bd9bb399a1 | rebecca_brown@yahoo.com     | https://picsum.photos/300/200?id=527 | https://picsum.photos/30/30?id=714 | 2022-04-10 17:46:03.979985 | f           | f
 13 | Ryan       | Valentine     | ryan_valentine    | phone                    | pbkdf2:sha256:260000$zFsRgNl4zKQRZDZT$a61675c1c5a7b64903d7275d6c13d7bd333794e9367adb9faf6f1110fce88a0f | ryan_valentine@hotmail.com  | https://picsum.photos/300/200?id=378 | https://picsum.photos/30/30?id=909 | 2022-04-10 17:46:03.979988 | f           | f
 14 | Adam       | Wilcox        | adam_wilcox       | next_wish                | pbkdf2:sha256:260000$zzQDAbKj6w9al9o0$77e1327648f71eff922353d0aa771dc49f753562967e17d71424fe2a2f8edc77 | adam_wilcox@hotmail.com     | https://picsum.photos/300/200?id=346 | https://picsum.photos/30/30?id=671 | 2022-04-10 17:46:03.97999  | f           | f
 15 | John       | Morales       | john_morales      | city_baby                | pbkdf2:sha256:260000$i9VMHH4LqWMRjaZb$68f9c6d69e763d1c38d1cc7241f4544c12199c3abacf3848f8db495453148fd7 | john_morales@gmail.com      | https://picsum.photos/300/200?id=421 | https://picsum.photos/30/30?id=845 | 2022-04-10 17:46:03.980003 | f           | f
 16 | David      | Robinson      | david_robinson    | miss_ground              | pbkdf2:sha256:260000$LEsaYcAhkEGowwmy$252fcfaf4615e02cfa733c0d5a6454f700cb2a514f8446b9a472f1850e387a0a | david_robinson@gmail.com    | https://picsum.photos/300/200?id=982 | https://picsum.photos/30/30?id=947 | 2022-04-10 17:46:03.980005 | f           | f
 17 | Stephen    | Landry        | stephen_landry    | interesting_little       | pbkdf2:sha256:260000$bYZYzHJJmEI4Mj6o$ef181877de16261f1c965910b981891f701e0138964a2e15ee7ab0b49617c175 | stephen_landry@gmail.com    | https://picsum.photos/300/200?id=582 | https://picsum.photos/30/30?id=996 | 2022-04-10 17:46:03.980008 | f           | f
 18 | Tyler      | Williams      | tyler_williams    | save_remain_rest_public  | pbkdf2:sha256:260000$71aNF161vumjYK9O$60632348a29df11ed2373a9ab95c3f65b1447cb908cc0311ae49581b4eb7d7e4 | tyler_williams@yahoo.com    | https://picsum.photos/300/200?id=449 | https://picsum.photos/30/30?id=270 | 2022-04-10 17:46:03.98001  | f           | f
 19 | Mr.        | Daniel Turner | mr._daniel_turner | word_perform_ball        | pbkdf2:sha256:260000$K38BeuLHLY787mCR$f45360fa41344a185727a269d08441469dd38f44c4dde1993b4ece2d06d9c279 | mr._daniel_turner@yahoo.com | https://picsum.photos/300/200?id=336 | https://picsum.photos/30/30?id=810 | 2022-04-10 17:46:03.980012 | f           | f
 20 | Geoffrey   | Reed          | geoffrey_reed     | health_inside_high       | pbkdf2:sha256:260000$uVPRasclLW3CA9Yc$47f9d75875c75fcad094803be2b2873cad8ef3afecca78f5680ef02f81ed90cb | geoffrey_reed@hotmail.com   | https://picsum.photos/300/200?id=369 | https://picsum.photos/30/30?id=825 | 2022-04-10 17:46:03.980015 | f           | f
 21 | Russell    | Sellers       | russell_sellers   | pick_body_pass_audience  | pbkdf2:sha256:260000$1xu4UBaMeWahEHjt$eee72b86340655aaa760666637006d9ad7862d9a44e47aecfed93a34acb80f61 | russell_sellers@yahoo.com   | https://picsum.photos/300/200?id=579 | https://picsum.photos/30/30?id=541 | 2022-04-10 17:46:03.980017 | f           | f
 22 | Rodney     | Marshall      | rodney_marshall   | somebody_reach_agency    | pbkdf2:sha256:260000$3h6vr3HEHkdlRujC$123c51c924cba211d86a24913de4bfddbca77098abe7c74467ec471d962da7eb | rodney_marshall@hotmail.com | https://picsum.photos/300/200?id=293 | https://picsum.photos/30/30?id=984 | 2022-04-10 17:46:03.980019 | f           | f
 23 | George     | Thomas        | george_thomas     | second_decade_despite    | pbkdf2:sha256:260000$arNwdma41nx3WnrT$9a13754a2b27a02d0c61b1a38077bd933406c3693cd3ab19ef57ef04e82b6f28 | george_thomas@gmail.com     | https://picsum.photos/300/200?id=157 | https://picsum.photos/30/30?id=461 | 2022-04-10 17:46:03.980022 | f           | f
 24 | Lori       | Horton        | lori_horton       | their_realize            | pbkdf2:sha256:260000$J7uxTO6hTl4MDKk1$2c50befdbef69d71ebb0db37aa4d64977475431cf3039f5fed1c2e40cc2f5211 | lori_horton@yahoo.com       | https://picsum.photos/300/200?id=757 | https://picsum.photos/30/30?id=864 | 2022-04-10 17:46:03.980024 | f           | f
 25 | Daniel     | Myers         | daniel_myers      | officer_natural          | pbkdf2:sha256:260000$JK0Po4tnSI5cLMA4$bf120278bb2bd5348b6a775e947a4330e417f7f2226b18fc32aa1d0250ceb167 | daniel_myers@gmail.com      | https://picsum.photos/300/200?id=110 | https://picsum.photos/30/30?id=894 | 2022-04-10 17:46:03.980027 | f           | f
 26 | Nicholas   | Khan          | nicholas_khan     | everything_change_answer | pbkdf2:sha256:260000$wcQkkkj9adctcdCN$dee3043de0f4e007eaaab4f94a4a0151b1c5cd6b236ef5bd0625666f2e1ff08a | nicholas_khan@gmail.com     | https://picsum.photos/300/200?id=893 | https://picsum.photos/30/30?id=47  | 2022-04-10 17:46:03.980045 | f           | f
 27 | Barbara    | Armstrong     | barbara_armstrong | painting_material        | pbkdf2:sha256:260000$2u4px7fehQt4DKyP$4840a43930c3e5fce505dd13bc6c12f2fce467776bc450a08f5842ce38859d3e | barbara_armstrong@gmail.com | https://picsum.photos/300/200?id=82  | https://picsum.photos/30/30?id=595 | 2022-04-10 17:46:03.980052 | f           | f
 28 | Heather    | Moore         | heather_moore     | nor_nice                 | pbkdf2:sha256:260000$ifanUDOqYyZSDmSi$a8c2bfc911c836ac8d4c8e16615c113ca3c2f3d70a6e9f1abd5e3414afbb9b31 | heather_moore@yahoo.com     | https://picsum.photos/300/200?id=434 | https://picsum.photos/30/30?id=563 | 2022-04-10 17:46:03.980057 | f           | f
 29 | John       | Hughes        | john_hughes       | whether_open_mouth       | pbkdf2:sha256:260000$jrbPqV2Oy4E0Q111$08cddc76dd0aaf2820a6dcb842fdd5f23f5d138c450f281525e5ea86ace003ac | john_hughes@gmail.com       | https://picsum.photos/300/200?id=962 | https://picsum.photos/30/30?id=860 | 2022-04-10 17:46:03.980059 | f           | f
 30 | Barbara    | Stone         | barbara_stone     | media_table              | pbkdf2:sha256:260000$NwXMDTOvdecGLpsL$3c02600be389049dd48bd6adbabaecdb25d134fc5fb9a84ff52305d5b7f391ce | barbara_stone@yahoo.com     | https://picsum.photos/300/200?id=81  | https://picsum.photos/30/30?id=199 | 2022-04-10 17:46:03.980061 | f           | f
 31 | Shannon    | Dyer          | shannon_dyer      | couple_few               | pbkdf2:sha256:260000$NAobYTH9gXhdcrZS$886c55bff5b2099da9f0d1b85eccb6c33e486c6e8d81385dafc7768b60ef01e9 | shannon_dyer@yahoo.com      | https://picsum.photos/300/200?id=732 | https://picsum.photos/30/30?id=693 | 2022-04-10 17:46:03.980064 | f           | f
(31 rows)

```

### 2. Selecting some columns
Write a query to retrieve the `id`, `first_name`, and `last_name` of each record in the `users` table. It should return the following data:

{:.overflow}
```
 id | first_name |   last_name   
----+------------+---------------
  1 | Webdev     | User
  2 | David      | Cole
  3 | Jamie      | Evans
  4 | Mary       | Green
  5 | Jason      | Morris
  6 | Erika      | Smith
  7 | Timothy    | Maldonado
  8 | Rachel     | Murphy
  9 | Sharon     | Ritter
 10 | Carla      | Fleming
 11 | Kayla      | Johnson
 12 | Rebecca    | Brown
 13 | Ryan       | Valentine
 14 | Adam       | Wilcox
 15 | John       | Morales
 16 | David      | Robinson
 17 | Stephen    | Landry
 18 | Tyler      | Williams
 19 | Mr.        | Daniel Turner
 20 | Geoffrey   | Reed
 21 | Russell    | Sellers
 22 | Rodney     | Marshall
 23 | George     | Thomas
 24 | Lori       | Horton
 25 | Daniel     | Myers
 26 | Nicholas   | Khan
 27 | Barbara    | Armstrong
 28 | Heather    | Moore
 29 | John       | Hughes
 30 | Barbara    | Stone
 31 | Shannon    | Dyer
(31 rows)
```

### 3. Sorting
Write a query to retrieve the `id`, `first_name`, and `last_name` of each record in the `users` table sorted by `last_name`. Use an `ORDER BY` clause. Your query should return the following data:

{:.overflow}
```
 id | first_name |   last_name   
----+------------+---------------
 27 | Barbara    | Armstrong
 12 | Rebecca    | Brown
  2 | David      | Cole
 19 | Mr.        | Daniel Turner
 31 | Shannon    | Dyer
  3 | Jamie      | Evans
 10 | Carla      | Fleming
  4 | Mary       | Green
 24 | Lori       | Horton
 29 | John       | Hughes
 11 | Kayla      | Johnson
 26 | Nicholas   | Khan
 17 | Stephen    | Landry
  7 | Timothy    | Maldonado
 22 | Rodney     | Marshall
 28 | Heather    | Moore
 15 | John       | Morales
  5 | Jason      | Morris
  8 | Rachel     | Murphy
 25 | Daniel     | Myers
 20 | Geoffrey   | Reed
  9 | Sharon     | Ritter
 16 | David      | Robinson
 21 | Russell    | Sellers
  6 | Erika      | Smith
 30 | Barbara    | Stone
 23 | George     | Thomas
  1 | Webdev     | User
 13 | Ryan       | Valentine
 14 | Adam       | Wilcox
 18 | Tyler      | Williams
(31 rows)
```

### 4. Filtering
Write a query to retrieve the `id`, `user_id`, and `image_url` for the `posts` created by Nicholas Khan (user_id=26). Use a `WHERE CLAUSE`. Your query should return the following data:

{:.overflow}
```
 id  |              image_url               | user_id 
-----+--------------------------------------+---------
 237 | https://picsum.photos/600/430?id=647 |      26
 238 | https://picsum.photos/600/430?id=46  |      26
 239 | https://picsum.photos/600/430?id=207 |      26
 240 | https://picsum.photos/600/430?id=37  |      26
 241 | https://picsum.photos/600/430?id=601 |      26
 242 | https://picsum.photos/600/430?id=934 |      26
 243 | https://picsum.photos/600/430?id=487 |      26
 244 | https://picsum.photos/600/430?id=991 |      26
(8 rows)
```

### 5. Filtering: logical operators
Write a query to retrieve the `id`, `image_url`, and `user_id` for the `posts` created by either Nicholas Khan (user_id=26) or Rebecca Brown (user_id=12). It should return the following data:

{:.overflow}
```
 id  |              image_url               | user_id 
-----+--------------------------------------+---------
 111 | https://picsum.photos/600/430?id=162 |      12
 112 | https://picsum.photos/600/430?id=119 |      12
 113 | https://picsum.photos/600/430?id=189 |      12
 114 | https://picsum.photos/600/430?id=610 |      12
 115 | https://picsum.photos/600/430?id=880 |      12
 116 | https://picsum.photos/600/430?id=67  |      12
 117 | https://picsum.photos/600/430?id=702 |      12
 118 | https://picsum.photos/600/430?id=261 |      12
 119 | https://picsum.photos/600/430?id=663 |      12
 237 | https://picsum.photos/600/430?id=647 |      26
 238 | https://picsum.photos/600/430?id=46  |      26
 239 | https://picsum.photos/600/430?id=207 |      26
 240 | https://picsum.photos/600/430?id=37  |      26
 241 | https://picsum.photos/600/430?id=601 |      26
 242 | https://picsum.photos/600/430?id=934 |      26
 243 | https://picsum.photos/600/430?id=487 |      26
 244 | https://picsum.photos/600/430?id=991 |      26
(17 rows)
```

### 6. Using functions in a select statement
Write a query that uses the `count` function in the SELECT clause to figure out how many posts there are in the `posts` table. Your query should return the following:

{:.overflow}
```
 count 
-------
   292
(1 row)
```

### 7. Aggregating data
Write a query that uses the `count` function and a `GROUP BY` clause to find out how many comments each user has made. Order by the number of comments, descending. Your query should return the following:

{:.overflow}
```
 user_id | count 
---------+-------
       4 |    33
      12 |    32
      30 |    30
       7 |    30
      26 |    29
       3 |    27
      23 |    27
      27 |    27
      24 |    27
      28 |    27
      17 |    27
      22 |    26
       1 |    26
      13 |    24
       9 |    24
      16 |    24
      21 |    24
      29 |    23
       8 |    23
      10 |    22
      20 |    22
      31 |    20
       6 |    19
       5 |    17
      18 |    17
      19 |    17
      25 |    17
       2 |    16
      15 |    16
      14 |    14
      11 |    13
(31 rows)
```

### 8. Joining: two tables
Write a query to retrieve the `id`, `image_url`, and `user_id` for the `posts` created by either Nicholas Khan (user_id=26) or Rebecca Brown (user_id=12) -- just like in #5. However, this time you will also join on the `users` table so that you can also display the `username`, `first_name`, and `last_name` of the creators. 
* HINT: You will join the tables where the `user.id` is the same as `posts.user_id`. 

Your query should return the following data:

{:.overflow}
```
 id  |              image_url               | user_id |   username    | first_name | last_name 
-----+--------------------------------------+---------+---------------+------------+-----------
 111 | https://picsum.photos/600/430?id=162 |      12 | rebecca_brown | Rebecca    | Brown
 112 | https://picsum.photos/600/430?id=119 |      12 | rebecca_brown | Rebecca    | Brown
 113 | https://picsum.photos/600/430?id=189 |      12 | rebecca_brown | Rebecca    | Brown
 114 | https://picsum.photos/600/430?id=610 |      12 | rebecca_brown | Rebecca    | Brown
 115 | https://picsum.photos/600/430?id=880 |      12 | rebecca_brown | Rebecca    | Brown
 116 | https://picsum.photos/600/430?id=67  |      12 | rebecca_brown | Rebecca    | Brown
 117 | https://picsum.photos/600/430?id=702 |      12 | rebecca_brown | Rebecca    | Brown
 118 | https://picsum.photos/600/430?id=261 |      12 | rebecca_brown | Rebecca    | Brown
 119 | https://picsum.photos/600/430?id=663 |      12 | rebecca_brown | Rebecca    | Brown
 237 | https://picsum.photos/600/430?id=647 |      26 | nicholas_khan | Nicholas   | Khan
 238 | https://picsum.photos/600/430?id=46  |      26 | nicholas_khan | Nicholas   | Khan
 239 | https://picsum.photos/600/430?id=207 |      26 | nicholas_khan | Nicholas   | Khan
 240 | https://picsum.photos/600/430?id=37  |      26 | nicholas_khan | Nicholas   | Khan
 241 | https://picsum.photos/600/430?id=601 |      26 | nicholas_khan | Nicholas   | Khan
 242 | https://picsum.photos/600/430?id=934 |      26 | nicholas_khan | Nicholas   | Khan
 243 | https://picsum.photos/600/430?id=487 |      26 | nicholas_khan | Nicholas   | Khan
 244 | https://picsum.photos/600/430?id=991 |      26 | nicholas_khan | Nicholas   | Khan
(17 rows)

```

### 9. More joining practice: two tables
Write a query that displays the `id` and `pub_date` from the `posts` table alongside the `id` of the following table for all of the users that Nicholas Khan (user_id=26) is following. To do this, you will have to join the `posts` table with the `following` table.
* HINT: Join where the `user_id` of the `post` table is the same as the `following_id` of the `following` table.


Your query should return the following data:

{:.overflow}
```
 id  |          pub_date          | following_id 
-----+----------------------------+--------------
   1 | 2022-04-10 08:46:04.107741 |            1
   2 | 2022-04-07 01:46:04.109636 |            1
   3 | 2022-04-08 14:46:04.109914 |            1
   4 | 2022-04-07 13:46:04.110164 |            1
   5 | 2022-04-08 14:46:04.110432 |            1
   6 | 2022-04-07 03:46:04.110664 |            1
   7 | 2022-04-06 12:46:04.110901 |            1
   8 | 2022-04-07 03:46:04.111115 |            1
   9 | 2022-04-06 12:46:04.111333 |            1
  10 | 2022-04-06 11:46:04.111537 |            1
  18 | 2022-04-07 11:46:04.119333 |            3
  19 | 2022-04-08 03:46:04.122143 |            3
  20 | 2022-04-10 11:46:04.122361 |            3
  21 | 2022-04-09 02:46:04.122557 |            3
  22 | 2022-04-08 08:46:04.122763 |            3
  23 | 2022-04-07 16:46:04.12298  |            3
  24 | 2022-04-06 22:46:04.123155 |            3
  25 | 2022-04-07 12:46:04.123328 |            3
  26 | 2022-04-08 17:46:04.123505 |            3
  27 | 2022-04-08 22:46:04.123696 |            3
  28 | 2022-04-10 10:46:04.123897 |            3
  29 | 2022-04-09 12:46:04.124087 |            3
  63 | 2022-04-07 04:46:04.141871 |            7
  64 | 2022-04-07 20:46:04.146565 |            7
  65 | 2022-04-07 13:46:04.146911 |            7
  66 | 2022-04-06 18:46:04.147154 |            7
  67 | 2022-04-09 12:46:04.147364 |            7
  68 | 2022-04-07 10:46:04.147587 |            7
  69 | 2022-04-08 08:46:04.147805 |            7
  70 | 2022-04-07 20:46:04.148125 |            7
  71 | 2022-04-07 12:46:04.149393 |            7
  72 | 2022-04-09 20:46:04.150657 |            7
  73 | 2022-04-09 22:46:04.151621 |            7
  86 | 2022-04-07 15:46:04.157701 |            9
  87 | 2022-04-06 16:46:04.16126  |            9
  88 | 2022-04-07 13:46:04.161501 |            9
  89 | 2022-04-07 04:46:04.161717 |            9
  90 | 2022-04-08 16:46:04.161915 |            9
  91 | 2022-04-08 18:46:04.162115 |            9
  92 | 2022-04-08 23:46:04.162303 |            9
 111 | 2022-04-10 06:46:04.173387 |           12
 112 | 2022-04-08 11:46:04.176721 |           12
 113 | 2022-04-06 17:46:04.176973 |           12
 114 | 2022-04-09 11:46:04.177188 |           12
 115 | 2022-04-07 20:46:04.177394 |           12
 116 | 2022-04-07 22:46:04.17761  |           12
 117 | 2022-04-10 07:46:04.177816 |           12
 118 | 2022-04-10 04:46:04.178003 |           12
 119 | 2022-04-09 02:46:04.178177 |           12
 129 | 2022-04-08 13:46:04.183366 |           14
 130 | 2022-04-07 04:46:04.18636  |           14
 131 | 2022-04-09 04:46:04.186605 |           14
 132 | 2022-04-07 07:46:04.186818 |           14
 133 | 2022-04-10 12:46:04.187029 |           14
 134 | 2022-04-08 09:46:04.187244 |           14
 135 | 2022-04-08 16:46:04.187434 |           14
 136 | 2022-04-07 02:46:04.187638 |           14
 137 | 2022-04-07 14:46:04.187832 |           14
 138 | 2022-04-07 16:46:04.18803  |           14
 139 | 2022-04-07 06:46:04.188211 |           14
 140 | 2022-04-08 09:46:04.188385 |           14
 141 | 2022-04-09 20:46:04.188572 |           15
 142 | 2022-04-08 00:46:04.192009 |           15
 143 | 2022-04-09 19:46:04.192274 |           15
 144 | 2022-04-06 22:46:04.192526 |           15
 145 | 2022-04-06 15:46:04.192746 |           15
 146 | 2022-04-08 15:46:04.192964 |           15
 147 | 2022-04-06 10:46:04.193175 |           15
 148 | 2022-04-08 00:46:04.193359 |           15
 149 | 2022-04-07 22:46:04.193548 |           16
 150 | 2022-04-07 01:46:04.196439 |           16
 151 | 2022-04-07 19:46:04.196667 |           16
 152 | 2022-04-08 01:46:04.196886 |           16
 153 | 2022-04-08 01:46:04.197089 |           16
 154 | 2022-04-06 16:46:04.19728  |           16
 155 | 2022-04-07 23:46:04.197598 |           16
 156 | 2022-04-10 09:46:04.197831 |           16
 157 | 2022-04-07 06:46:04.198055 |           16
 158 | 2022-04-08 03:46:04.198384 |           16
 217 | 2022-04-08 19:46:04.232795 |           24
 218 | 2022-04-06 12:46:04.237888 |           24
 219 | 2022-04-08 04:46:04.238135 |           24
 220 | 2022-04-08 17:46:04.23835  |           24
 221 | 2022-04-10 10:46:04.238647 |           24
 222 | 2022-04-07 09:46:04.238853 |           24
 223 | 2022-04-10 00:46:04.239056 |           24
 224 | 2022-04-09 01:46:04.239256 |           24
 225 | 2022-04-08 14:46:04.239441 |           24
 226 | 2022-04-09 01:46:04.239652 |           24
 227 | 2022-04-10 01:46:04.239837 |           24
 245 | 2022-04-09 02:46:04.249785 |           27
 246 | 2022-04-07 06:46:04.25299  |           27
 247 | 2022-04-09 15:46:04.253233 |           27
 248 | 2022-04-08 07:46:04.253455 |           27
 249 | 2022-04-08 12:46:04.253678 |           27
 250 | 2022-04-09 14:46:04.2539   |           27
 251 | 2022-04-06 18:46:04.254123 |           27
 252 | 2022-04-09 23:46:04.254296 |           27
(98 rows)
```


### 10. More joining practice: three tables (Optional)
Write a query that displays the same information as in the previous exercise, but adds an additional column that displays the `username` of the person who created the post. To do this, you will have to join on a third table, `users`, to retrieve the usernames. Please also sort the posts by the `pub_date` in decending order (much like a feed might work).

{:.overflow}
```
 id  |          pub_date          | following_id |     username      
-----+----------------------------+--------------+-------------------
 133 | 2022-04-10 12:46:04.187029 |           14 | adam_wilcox
  20 | 2022-04-10 11:46:04.122361 |            3 | jamie_evans
 221 | 2022-04-10 10:46:04.238647 |           24 | lori_horton
  28 | 2022-04-10 10:46:04.123897 |            3 | jamie_evans
 156 | 2022-04-10 09:46:04.197831 |           16 | david_robinson
   1 | 2022-04-10 08:46:04.107741 |            1 | webdev
 117 | 2022-04-10 07:46:04.177816 |           12 | rebecca_brown
 111 | 2022-04-10 06:46:04.173387 |           12 | rebecca_brown
 118 | 2022-04-10 04:46:04.178003 |           12 | rebecca_brown
 227 | 2022-04-10 01:46:04.239837 |           24 | lori_horton
 223 | 2022-04-10 00:46:04.239056 |           24 | lori_horton
 252 | 2022-04-09 23:46:04.254296 |           27 | barbara_armstrong
  73 | 2022-04-09 22:46:04.151621 |            7 | timothy_maldonado
 141 | 2022-04-09 20:46:04.188572 |           15 | john_morales
  72 | 2022-04-09 20:46:04.150657 |            7 | timothy_maldonado
 143 | 2022-04-09 19:46:04.192274 |           15 | john_morales
 247 | 2022-04-09 15:46:04.253233 |           27 | barbara_armstrong
 250 | 2022-04-09 14:46:04.2539   |           27 | barbara_armstrong
  67 | 2022-04-09 12:46:04.147364 |            7 | timothy_maldonado
  29 | 2022-04-09 12:46:04.124087 |            3 | jamie_evans
 114 | 2022-04-09 11:46:04.177188 |           12 | rebecca_brown
 131 | 2022-04-09 04:46:04.186605 |           14 | adam_wilcox
 245 | 2022-04-09 02:46:04.249785 |           27 | barbara_armstrong
 119 | 2022-04-09 02:46:04.178177 |           12 | rebecca_brown
  21 | 2022-04-09 02:46:04.122557 |            3 | jamie_evans
 226 | 2022-04-09 01:46:04.239652 |           24 | lori_horton
 224 | 2022-04-09 01:46:04.239256 |           24 | lori_horton
  92 | 2022-04-08 23:46:04.162303 |            9 | sharon_ritter
  27 | 2022-04-08 22:46:04.123696 |            3 | jamie_evans
 217 | 2022-04-08 19:46:04.232795 |           24 | lori_horton
  91 | 2022-04-08 18:46:04.162115 |            9 | sharon_ritter
 220 | 2022-04-08 17:46:04.23835  |           24 | lori_horton
  26 | 2022-04-08 17:46:04.123505 |            3 | jamie_evans
 135 | 2022-04-08 16:46:04.187434 |           14 | adam_wilcox
  90 | 2022-04-08 16:46:04.161915 |            9 | sharon_ritter
 146 | 2022-04-08 15:46:04.192964 |           15 | john_morales
 225 | 2022-04-08 14:46:04.239441 |           24 | lori_horton
   5 | 2022-04-08 14:46:04.110432 |            1 | webdev
   3 | 2022-04-08 14:46:04.109914 |            1 | webdev
 129 | 2022-04-08 13:46:04.183366 |           14 | adam_wilcox
 249 | 2022-04-08 12:46:04.253678 |           27 | barbara_armstrong
 112 | 2022-04-08 11:46:04.176721 |           12 | rebecca_brown
 140 | 2022-04-08 09:46:04.188385 |           14 | adam_wilcox
 134 | 2022-04-08 09:46:04.187244 |           14 | adam_wilcox
  69 | 2022-04-08 08:46:04.147805 |            7 | timothy_maldonado
  22 | 2022-04-08 08:46:04.122763 |            3 | jamie_evans
 248 | 2022-04-08 07:46:04.253455 |           27 | barbara_armstrong
 219 | 2022-04-08 04:46:04.238135 |           24 | lori_horton
 158 | 2022-04-08 03:46:04.198384 |           16 | david_robinson
  19 | 2022-04-08 03:46:04.122143 |            3 | jamie_evans
 153 | 2022-04-08 01:46:04.197089 |           16 | david_robinson
 152 | 2022-04-08 01:46:04.196886 |           16 | david_robinson
 148 | 2022-04-08 00:46:04.193359 |           15 | john_morales
 142 | 2022-04-08 00:46:04.192009 |           15 | john_morales
 155 | 2022-04-07 23:46:04.197598 |           16 | david_robinson
 149 | 2022-04-07 22:46:04.193548 |           16 | david_robinson
 116 | 2022-04-07 22:46:04.17761  |           12 | rebecca_brown
 115 | 2022-04-07 20:46:04.177394 |           12 | rebecca_brown
  70 | 2022-04-07 20:46:04.148125 |            7 | timothy_maldonado
  64 | 2022-04-07 20:46:04.146565 |            7 | timothy_maldonado
 151 | 2022-04-07 19:46:04.196667 |           16 | david_robinson
 138 | 2022-04-07 16:46:04.18803  |           14 | adam_wilcox
  23 | 2022-04-07 16:46:04.12298  |            3 | jamie_evans
  86 | 2022-04-07 15:46:04.157701 |            9 | sharon_ritter
 137 | 2022-04-07 14:46:04.187832 |           14 | adam_wilcox
  88 | 2022-04-07 13:46:04.161501 |            9 | sharon_ritter
  65 | 2022-04-07 13:46:04.146911 |            7 | timothy_maldonado
   4 | 2022-04-07 13:46:04.110164 |            1 | webdev
  71 | 2022-04-07 12:46:04.149393 |            7 | timothy_maldonado
  25 | 2022-04-07 12:46:04.123328 |            3 | jamie_evans
  18 | 2022-04-07 11:46:04.119333 |            3 | jamie_evans
  68 | 2022-04-07 10:46:04.147587 |            7 | timothy_maldonado
 222 | 2022-04-07 09:46:04.238853 |           24 | lori_horton
 132 | 2022-04-07 07:46:04.186818 |           14 | adam_wilcox
 246 | 2022-04-07 06:46:04.25299  |           27 | barbara_armstrong
 157 | 2022-04-07 06:46:04.198055 |           16 | david_robinson
 139 | 2022-04-07 06:46:04.188211 |           14 | adam_wilcox
 130 | 2022-04-07 04:46:04.18636  |           14 | adam_wilcox
  89 | 2022-04-07 04:46:04.161717 |            9 | sharon_ritter
  63 | 2022-04-07 04:46:04.141871 |            7 | timothy_maldonado
   8 | 2022-04-07 03:46:04.111115 |            1 | webdev
   6 | 2022-04-07 03:46:04.110664 |            1 | webdev
 136 | 2022-04-07 02:46:04.187638 |           14 | adam_wilcox
 150 | 2022-04-07 01:46:04.196439 |           16 | david_robinson
   2 | 2022-04-07 01:46:04.109636 |            1 | webdev
 144 | 2022-04-06 22:46:04.192526 |           15 | john_morales
  24 | 2022-04-06 22:46:04.123155 |            3 | jamie_evans
 251 | 2022-04-06 18:46:04.254123 |           27 | barbara_armstrong
  66 | 2022-04-06 18:46:04.147154 |            7 | timothy_maldonado
 113 | 2022-04-06 17:46:04.176973 |           12 | rebecca_brown
 154 | 2022-04-06 16:46:04.19728  |           16 | david_robinson
  87 | 2022-04-06 16:46:04.16126  |            9 | sharon_ritter
 145 | 2022-04-06 15:46:04.192746 |           15 | john_morales
 218 | 2022-04-06 12:46:04.237888 |           24 | lori_horton
   9 | 2022-04-06 12:46:04.111333 |            1 | webdev
   7 | 2022-04-06 12:46:04.110901 |            1 | webdev
  10 | 2022-04-06 11:46:04.111537 |            1 | webdev
 147 | 2022-04-06 10:46:04.193175 |           15 | john_morales
(98 rows)
```


### 11. Inserting records
Nicholas (user_id=26) wants to bookmark a few of his posts (specifically, post ids 219, 220, and 221). Write three INSERT statements that add the appropriate entries in the `bookmarks` table. The table requires a valid `user_id` and a valid `post_id`.

### 12. Deleting records
Nicholas changed his mind and now wants to delete his bookmarks for post ids 219, 220, and 221. Write three DELETE statements that remove the three entries that were just added to the database.

### 13. Updating records
Nicholas has a new email address: knick2022@gmail.com. Write an UPDATE statement that updates Nicholas's email address in the `users` table.


### 14. More Querying Practice (Optional)
Write a query that displays the `id` and `caption` of every blog post that Nicholas has published, along with a count of how many comments each post has.

{:.overflow}
```
 id  | user_id | count |                        concat                        
-----+---------+-------+------------------------------------------------------
 244 |      26 |     5 | Age look simply star behind beat manage art as ph...
 240 |      26 |     5 | Remain suggest base her Mrs sing land race appear...
 241 |      26 |     5 | Southern behavior force everybody public conditio...
 242 |      26 |     5 | Environmental close turn fine by simply rock here...
 238 |      26 |     4 | Car treat manager financial ready hit American be...
 239 |      26 |     4 | Action must continue international three successf...
 237 |      26 |     4 | As huge party model arm plant authority discuss k...
 243 |      26 |     2 | Place anyone morning their fund their training al...
(8 rows)
```

## What to turn in
To submit Tutorial 10, upload a zip file with the following two files:

1. answers.sql
1. A text file that answers the following questions:
    * What is a join (just in your own words) and why is it useful?
    * Consider the structure of the `posts` table: why would you want to use a foreign key (`user_id`) to the `users` table instead of storing the `username`, `first_name`, and `last_name` in the `posts` table?