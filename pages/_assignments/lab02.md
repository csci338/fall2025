---
layout: assignment-two-column
title: "Configuring git and GitHub"
type: lab
draft: 1
points: 6
abbreviation: Lab 2
num: 2
start_date: 2025-08-28
due_date: 2025-09-03
---

## Introduction
Today we will be configuring your lab repo using **git** and **GitHub**. Next week we will be working on ***collaboration workflows***.

Here are the <a href="https://docs.google.com/presentation/d/1iBYAdOWcRUqr_Oc0O0ss0F0PFG2ulR9g/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true" target="_blank">Lab 2 slides</a>.


## Your Tasks

### 1. Add your GitHub username to the spreadsheet
If you haven't already, please register for a GitHub account, and then add your full name and your GitHub username to <a href="https://docs.google.com/spreadsheets/d/1h0mJjAiXMAxyXjmM8rLF6PU6kc_NMbF7/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true" target="_blank">this spreadsheet</a>. I will invite you to be a contributor to the relevant repos.
* Note that **you will have to confirm this invitation** via email.
* I recommend that you use your UNCA email account because you can get some student perks later from GitHub.

{:#authentication}
### 2. Set up public / private key authentication for GitHub
When accessing a remote server (including a GitHub server), a common authentication strategy involves using public and private keys. Below, you will go through the process of generating a public / private key. Your private key is for you and you alone. It is your secret, and should not be shared with anyone. Your public key, on the other hand, is typically copied to a server to which you have access.

In the workflow outlined below, all commands should be run from the command line on your  **local computer** (not arden). If you're a Windows user, activate WSL.

#### 2.1. Generate a public / private key pair
To generate a public / private key pair (use WSL if you're a Windows user):

* Type the following command: **`ssh-keygen`**
* This will generate your private key inside the `.ssh` folder inside your home directory. Typically, the private key is  called `id_rsa` and the public key is called `id_rsa.pub`.
* Verify that this worked by typing `ls -la ~/.ssh`. You should see both files (with today's timestamp).

#### 2.2. Copy your public key to GitHub
* Follow the <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account" target="_blank">GitHub instructions</a>
* More on public / private keys here: <a href="https://kb.iu.edu/d/aews" target="_blank">https://kb.iu.edu/d/aews</a>

### 3. Fork the Course Repository
In this class, we're going to be working with various shared repositories on GitHub. For most of our labs and in-class exercises, we will be using the **`class-exercises-fall2025`** repository. You will "fork" your own personal copy of this repository on Github that you will periodically sync with the class repo. This will be for doing individual work and activities.

Before we get into the details of various GitHub workflows, you will create a copy of the course repo -- one that **you own** -- on GitHub. To do this:
1. Navigate to the course repository: <a href="https://github.com/csci338/class-exercises-fall2025" target="_blank">https://github.com/csci338/class-exercises-fall2025</a>
1. Click the "Fork" button (towards the top of the page on the right hand side)
1. Confirm where you would like the repo to be forked (choose your GitHub account). 


### 4. Set up the course repo on your local computer
Now, on your laptop, make a copy of your repo locally as follows:

1. Navigate to your `csci338` directory on the command line.<br><br>
1. Within your `csci338` directory, clone the `class-exercises-fall2025` repo using the **ssh method** using the following command:<br><br>`git clone git@github.com:<your-github-username>/class-exercises-fall2025.git`<br><br>Please replace `<your-github-username>` with your GitHub username<br><br>
1. Navigate into the `class-exercises-fall2025` folder (that was just created)
1. Look at commit history (`git log`)

### 5. Make a new branch
1. Create a new branch called `lab02-b`
    * See the <a href="/fall2025/resources/github">git cheatsheat</a>
1. Switch to the branch you just made (if you haven't already)
1. Verify that you are now on the `lab02-b` branch (see cheatsheet)


### 6. Write some code
1. Open the entire `class-exercises-fall2025` folder in VS Code.
1. Create a folder named `lab02`
1. Inside of your `lab02` folder, create a text file called `ContainsPair.java`
1. Within the `ContainsPair.java` file, implement one of the "contains pair" solutions we discussed in class (ideally the fastest one). Here's a stub to help you:

    ```java
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;

    public class ContainsPair {

        public static void main(String[] args) {
            List<Integer> list1 = Arrays.asList(1, 2, 3, 2);
            List<Integer> list2 = Arrays.asList(5, 2, -10, 44, 90);
            System.out.println(ContainsPair.check(list1)); // should print true
            System.out.println(ContainsPair.check(list2)); // should print false
        }
        public static boolean check(List<Integer> l) {
            // replace this with your code:
            return false;
        }
    }
    ```
1. Compile it on the command line using the `javac` command (e.g., `javac ContainsPair.java`). See the Lecture 3 slides for potential solutions. Make sure you're in the right directory. This should generate the compiled `Java.class` file.
    * If you're on WSL and `javac` is not installed, you can install it using the apt package manager as follows:<br>`sudo apt install default-jdk`
1. Run your program on the command line by typing `java ContainsPair`

### 7. Exclude all `.class` files
When working with version control, you don't want to commit compiled code, system files, passwords, or third-party libraries. Luckily, the `.gitignore` file makes this easy.

From the command line
1. Type `git status -u`. What happened?
    * This command should tell you all of the untracked changes you've made.
1. Edit the `.gitignore` file by adding this line: `*.class`
1. Type `git status -u` again. What happened?

If you did it correctly, git is now ignoring your `*.class` file.

### 8. Write some code in Python
1. Inside of your `lab02` folder, create another text file called `contains_pair.py`
1. Within the `contains_pair.py` file, implement one of the "contains pair" solutions we discussed in class (ideally the fastest one). Here's a stub to help you:

    ```py
    def check(l: list):
        # your code goes here
        return False


    print(check([1, 2, 3, 2]))          # should print True
    print(check([5, 2, -10, 44, 90]))   # should print False
    ```
1. Run your program on the command line by typing `python contains_pair.py`

### 9. Stage and commit your changes
1. Stage your changes using `git add .` (the dot indicates that you want to stage all of the files that have been added / deleted / edited).
1. Commit your changes using `git commit -m "Some descriptive commit message"` (e.g. "Lab 2 is completed").

### 10. Push (upload) your changes to GitHub
1. Push your branch to GitHub using the `git push` command
    * This command should display an error with a suggested push command (e.g., `git push --set-upstream origin <your-branch-name>`). This is telling you that there is no branch called `lab02-b` in the GitHub repository.
1. Try again by typing `git push --set-upstream origin lab02-b`


### 10. Create a pull request
Now that your code is on GitHub, you're going to make a "Pull Request" so that I can review your code. This can be done on **your version** of the `class-exercises-fall2025` on GitHub.

#### A note on your origin path
Within git, your **`remote origin`** variable holds both the address and the protocol you will be using to interact with a remote server (like GitHub). Some of you are accessing the remote server using the **https** protocol while others are using the **ssh** protocol. For the sake of simplicity, let's all use **ssh**. To check your origin, type: `git remote show origin`.

If it prints `git@github.com:<your-user-name>/class-exercises-fall2025`, you don't have to do anything. Otherwise, let's switch up your origin protocol to ssh as follows:

```sh
git remote rm origin  # removes current references
git remote add origin git@github.com:<your-user-name>/class-exercises-fall2025.git  # adds new reference
git remote show origin  # prints the new origin (which should be the correct one).
```

If you get a "Please tell me who you are." error message, please set the following environment variables on your machine (you will only have to do this once):

```shg
git config --global user.name "My Name"
git config --global user.email "my_email@gmail.com"
```

Please use the email you used to register with GitHub

## What to Turn In
Please paste a link to your pull request in the Moodle submission box. Also, please verify that...

{:.checkbox-list}
* You created a branch called `lab02-b`.
* You have a working `ContainsPair.java` file in it.
* You have edited your `.gitignore` file so that `ContainsPair.class` is not checked into version control.
* You have a working `contains_pair.py` file in it.
