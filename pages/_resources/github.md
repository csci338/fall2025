---
layout: two-column
title: Git & GitHub
parent: resources
type: resource
category: "Version Control"
---

<style>

    td:first-child {
        min-width: 120px;
    }
</style>


## Useful Online Resources

* <a href="https://git-scm.com/book/en/v2" target="_blank">Pro Git Book</a>. Great reference
* <a href="https://www.youtube.com/watch?v=_wQdY_5Tb5Q" target="_blank">Collaborating using Git and GitHub</a>: Branches, Pull Requests, Merging vs Rebasing (Video walkthrough)
* <a href="https://www.youtube.com/watch?v=_UZEXUrj-Ds" target="_blank">What is git rebase?</a>
* <a href="https://www.atlassian.com/git/tutorials/comparing-workflows" target="_blank">Article explaining how to rebase + handle merge conflicts</a>

## Git Cheatsheet
### Basic Commands

| **git clone** | Copies a remote repository (e.g., one hosted on a GitHub server) onto your local machine (within your current directory). |
| **git status** | Tells you which of the files in your current directory are different from the latest commit in the repo. |
| **git add** | Stages the specified files to be committed |
| **git log** | Shows you the commit history |
| **git commit** | Saves a snapshot of your staged files at the moment the commit is issued. Each commit represents the state of your code at a particular moment in time. |
| **git push** | Uploads your commits to a remote repo |
| **git pull** | Downloads changes from a remote repo to your local repo |

### Branch Commands 

|  **git checkout -b my-new-branch** | Creates a new branch |
| **git branch** | Tells you which branch you’re on |
| **git checkout main** | Switches you from your current branch to the main branch |
| **git checkout my-new-branch** | Switches you from your current branch to the my-new-branch branch |
| **git branch -d my-new-branch** | Deletes my-new-branch from your local repo |
| **git merge my-new-branch** | Merges changes from my-new-branch into the current branch. |
| **git rebase my-new-branch** | Rebases changes from my-new-branch into the current branch. |


## FAQs

### Q: How do I get the latest changes from the class repo while still working on my local branch?

Assumptions: 
* You are currently working on a branch called `my-feature`
* You want to rebase your branch with the latest changes from `main` that are currently on GitHub.

### A: Great question! Here are the steps

#### Step 1: Sync your GitHub repo
Since you've forked your version of the repo from the class's repo, you'll want to make sure you've got the most recent changes on the `main` branch. To do this, navigate to **your version of the class repo** on GitHub and click the "Sync Fork" button (located right underneath the green button).

#### Step 2: Get to a stopping point on your my-feature branch
When you're at a stopping point, stage and commit your changes to the `my-feature` branch:

```bash
git status      # check if there's anything you need to commit
git add .       # stage all of your changes 
git commit -m "Meaningful commit message"   # commit them
```

#### Step 3: Checkout your main branch and pull the latest changes down from GitHub

```bash
git checkout main   # switch your active branch to main
git branch          # verify that you're on main (should have an asterik next to it)
git pull            # download all the new main changes
```

#### Step 4: Go back to your my-feature branch and rebase
```bash
git checkout my-feature     # switch your active branch to my-feature
git branch                  # verify that you're on my-feature (should have an asterik next to it)
git rebase main             # incorporate the latest changes from main into your my-feature branch

# Note: you may have to manually resolve conflicts in your code editor. If that's the case, when you're done, type:
git rebase --continue       # continue rebasing
```

#### Step 5: When your my-feature branch is ready, push it to GitHub
One caveat: if you've rebased `my-feature` from `main` on your local machine but you've already created a remote `my-feature` branch on GitHub, you will need to use the force flag to upload your new changes to GitHub:

```bash
git push            # try this first (you may not need the force flag)
git push --force    # if you get an error, use the force flag
```

Why do you need the force flag? If the lineage of your local `my-feature` branch differs from the remote version of the branch (because of the rebase), then GitHub will refuse the push. But you can just override the branch protection default and push anyway by using `--force` (as this is expected behavior).  