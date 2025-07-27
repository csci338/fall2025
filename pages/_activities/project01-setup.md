---
layout: two-column
title: Project 1 Set-Up
type: activity
---

For today's activity, you are going to complete the following tasks:

## Part 1. Set Up
1. Accept the invite to your team's repo.
1. Read over the [project instructions](../assignments/project01) and the requirements for the task you've been assigned.
1. Go to the GitHub Issue tracker, click on your issue, and assign yourself to your issue (there's a place to do this in the right-hand panel).
1. Set up your Docker container for Project 1 by following the [set-up instructions](../assignments/project01#id_set-up).
1. Create a new feature branch (name it something reasonable like "walter-schedule" or "lisa-courses" -- depending on the task you were assigned).

## Part 2. Practice Rebasing
Nominate one person on your team to add everyone on your team's name to `README.md`. That person will create a second branch called `team-members` and edit the `README.md` on the new branch. Once that person has added everyone's name, they will commit, push, and make a pull request, tagging `@svanwart` (one PR per team).
* Sarah will approve their pull request.
* That person will then merge their pull request into main -- after your PR is approved, it is your job to actually do the merge.

It will now be the case that `main` on GitHub will be one commit ahead of your local repo. Everyone  on the will now integrate the change into their feature branch as follows:
* Checkout their local copy of `main` (`git checkout main`)
* Pull down the latest changes (`git pull`)
* Check out their feature branch again (`git checkout whatever-your-feature-branch-is-called`)
* Rebase their feature branch with main (`git rebase main`)

## Part 3. Discuss Team Logistics
Your project is due on Thursday, 3/20, which is in approximately 3 weeks. You will not only have to implement your specific feature, but also ensure that your code is well-integrated with the overall project and that everything works as expected. This is something you can't leave 'til the last minute because most teams will have at least 14 code reviews (happeing over time as things are changing). Give this, you should figure out some logistics, including:

1. When everyone's individual feature should be drafted.
1. When everyone's individual feature should be completed.
1. Whose feature needs to be done first (blockers).
1. How your team will communicate.
1. Will you have in-person work sessions?
1. What does accountability mean for your team? Everyone has different schedules, commitments, and working styles. Given this, does your plan work for your team?
1. Who will be in charge of integrating features (historically, this has been the UI person, but it's up to you)?

Keep in mind that there may be a 12-24 hour delay from the time you make your PR and the time it is approved.

## What to Submit
Before you leave, please upload a screenshot of your git graph (git log --graph --all) to the Moodle under the "Attendance & Participation" section to show that you rebased the `README.md` updates into your feature branch. This is **due tonight (2/27).**
