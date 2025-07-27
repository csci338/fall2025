---
layout: two-column
title: Git Collaboration Activity
type: activity

---

{:.info}
> Credit: This activity was designed by Semmy Purewall

This activity is designed to be completed entirely in class. The goals with this activity are as follows:

1. Practice with merge conflicts
2. Practicing with various merging/rebasing strategies
3. More practice with basic git & CLI stuff


For this activity, you'll work with (at least) one other person. The person who creates the initial repository will be called the "owner." Any additional collaborators will be called "the collaborator"

## Part 1: Merging
Nominate one person in your group to be "the owner." 

### 1.1. Owner setup
If you are the owner, you will create a new git repository as follows:
1.  Open a new command line shell (Windows users use WSL),  navigate to your `csci338` folder, and make a directory called `merge-activity`:

    ```bash
    $ mkdir merge-activity
    ```
1. Navigate into the directory (`cd merge-activity`)
1. Initialize a new git repository (`git init`)
1. Create a `README.md` file directly inside of `merge-activity`. Inside `README`, add a heading that says "Merge / Rebase Practice" 
1. Stage your `README.md` file using (`git add .`)
1. Commit it (e.g., `git commit -m "Added README.md"`)
1. Next create a `my_code.py` file. It should look like this.

    ```py
    def say_hello() -> None:
        print("hello world!");


    if __name__ == "__main__":
        say_hello();
    ```
1. Commit it.
1. Now create a *private* repository on GitHub (github.com) for your local git repository and push your local repository to the remote repository.
1. After a successful push, add your collaborator(s) to the
repository (GitHub > Settings > "Collaborators and Teams"). 

### 1.2. Collaborator setup
After the owner has added you as a collaborator to the `merge-activity` repo, you are going to clone their repository. To do this:

1.  Open a new command line shell (Windows users use WSL),  navigate to your `csci338` folder.
2. *From within the `csci338` folder, clone the the `merge-activity` repo using the SSH protocol. If you forgot how to do this, refer back to Lab 2.
1. Navigate into the `merge-activity` repo that has just been created on your local machine.

You and your partner are now going to work on two features in parallel. The owner will work on Feature A and the collaborator will work on Feature B. Both of your repositories should have the same remote urls. 

**Question:** Which Git subcommand can you use to confirm that? Go ahead and confirm it.


**Answer:** `git remote show origin`


Complete the next two sections in parallel.

### 1.3. Creating a conflict
You are now going to both edit the same file on different branches and practice resolving the conflicts.

#### Feature A (Owner)

This feature will be implemented on the `main` branch.

**The owner of the repository** should complete Feature A. Instead of always printing "hello world", let's make your function print out "hello \<name\>" where "\<name\>" is specified as a parameter to the
function. In other words, when called like this:

```py
say_hello("Walter")
say_hello("Ruth")
say_hello("Larry")
say_hello("Helen")
```

It will print out:

```bash
Hello Walter!
Hello Ruth!
Hello Larry!
Hello Helen!
```

Once this is tested and working, commit it locally, then **push your main branch to the remote repository** on GitHub.

#### Feature B (Collaborator)

The collaborator will complete this feature on a different branch. First, create
and check out a branch.

```bash
$ git checkout -b feature-b
```

Now implement feature-b. Allow an argument to specify the number of
times the message should be repeated. So if it's called like this:

```py
say_hello(3)
```

It will print out:

```bash
hello world!
hello world!
hello world!
```

Once you're happy with your change, commit it locally, but **do not push
anything yet.**

### 1.4. Pulling down the owners changes

Once you're both finished with the sections above, you'll work
together on this section on the **collaborator's** computer.

At this point, we are in the situation where you are in a feature
branch, but main is ahead (i.e., changes have been made to main since you branched from it, making the collaborator's branch is no longer in sync with main).

![image](/fall2025/assets/images/activities/feature_branch_main_ahead.png)

Check the state of your git repository and make sure you're on the `feature-b` branch. Let's checkout `main` on your laptop and then  pull your partner's changes down from GitHub.

```bash
$ git checkout main
```

Confirm you're on the main branch now.

```bash
$ git pull origin main
```

Now take a look at the history (`git log`) to make sure you see the commit that
implements feature A. Then, check out your feature branch again:

```bash
$ git checkout feature-b
```

Let's take a look at the history again. Do you see the commit with
feature A? Probably not, but you can see it by doing this:

```bash
$ git log --all
```

And if you want a visual representation, add the `--graph`
option. Where is `HEAD`? Where is `feature-b`?

```bash
$ git log --all --graph
```

### 1.5. Merging
Let's merge the branches! First, check out main again. Take a look at
the history (with all commits and the graph option enabled). Where is
`HEAD`?

Now let's use the `merge` subcommand to merge the branches. Make sure
you're on `main` and then run:

```bash
$ git merge feature-b
```

This attempts to merge the `feature-b` branch into the `main`
branch. It should look something like this:

```bash
<<<<<<< HEAD
[Feature A Code]
=======
[Feature B Code]
>>>>>>> feature-b
```

Note that `[Feature A Code]` will be replaced with the actual code
associated with Feature A. The top part represents the state of the
code at your `HEAD` (in this case, `HEAD` is an alias for `main`).

Before going further, take a look at the state of your
repository. Note that `git` gives you helpful instructions on how to
proceed -- you can either fix the conflicts and then run `git commit -m "some message"`
which will create your merge commit, or you can abort the process
altogether.

Your job is now to reconcile these conflicts, and remove the merge conflict separators. Do that now. At the end of your reconciliation, both features should work as expected. You can test them by running it with Python.

Once that's done, let's take a look at the state of the repo
again. Git should tell you that you're good to go!

```bash
$ git status
```

Let's take a look at the log with the `--graph` option. You should see
your merge commit with two parent pointers.

Commit and push the changes to the main branch on Github, and take a look at all
the commits. Have your partner (the owner) pull down the changes. You both should now have the exact same code on the `main` branch. 

## Part 2: Rebasing
We're going to to do a rebase and fast-forward this time, instead of a merge. ***Let's reverse roles*** now so that the owner becomes the collaborator and vice-versa. 

### 2.1. Owner setup
Repeat Step 1.1 above, but instead of working with `merge-activity`, you will create a new repo within `csci338` called `rebase-activity`.

Your directory structure should look something like:
```
csci338
├── class-exercises-fall2025
├── lab01
├── merge-activity
└── rebase-activity
```

### 2.2. Collaborator setup
Repeat Step 1.2 above, but with the `rebase-activity` repo.

### 2.3. Creating a conflict
Repeat Step 1.3 above, but with the `rebase-activity` repo.

### 2.4. Pulling down the owner's changes
Repeat Step 1.4 above, but with the `rebase-activity` repo.

### 2.5. Rebasing
Now, we're going to rebase the branches to see how this process differs. The ***collaborator*** will do the rebase.

Check out `main` again. Take a look at the history (with all commits and the graph option enabled). Where is HEAD?

Next, we'll rebase `main` on the `feature-b` branch, then fast-forward merge `feature-b` back into `main`. So check out the `feature-b` branch. And then, after confirming you're in the right place, do the rebase.

```bash
$ git rebase main
```

Git will try to "replay" the new commit in `main` on top but it will hit the same conflict we saw in the merge case. Read the message Git outputs.

Now take a look at the code. You'll see it looks something like this.

```bash
<<<<<<< HEAD
[Feature A Code]
=======
[Feature B Code]
>>>>>>> 1a0ffaa (Add feature b)
```

In this case `HEAD` is `main` again, since we checked it out to replay
the commits on top. Check the status of the repository, and read all
the hints Git is giving you. Fix the conflicts as you did this time.

Once you're done, check the status again and read the message. 

**Question:** What should you do now?

**Answer:** 
```
git add .
git rebase --continue
```

Once that's done, you've successfully rebase `main` onto
`feature-b`. Check the history and note that the commit hash
associated with `feature-b` has changed as we expected!

We're not finished yet, because we wanted to get `feature-b` into
`main`. Now that `main` is no longer ahead, we can do a fast-forward
merge into main. To complete this, check out the main branch and do a
merge.

```bash
$ git checkout main
$ git merge feature-b
```

Read the output. Now take a look at the history with the `--graph`
option. How is the history different from the merge above? Do you see
a merge commit?

Push the changes to Github and take a look at the commits.

Now you've successfully fixed some merge conflicts, merged, and
rebased. Do you have any opinions on which is better? Talk with your
partner about your newly found strong opinions.