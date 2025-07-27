---
layout: assignment-two-column
title: Collaboration and Quality Control using GitHub
type: lab
draft: 1
points: 3
abbreviation: Lab 3
show_schedule: 1
num: 3
start_date: 2023-09-07
due_date: 2023-09-10

---

## Thoughts
* Maybe by this point, the basic infrastructure could be set up and everyone can be assigned their feature. Then, in this lab, they build a single function on their way to implementing the feature, where they go through the workflow.

## Workflow Notes
Asky Semmy. Here's how I've done it in the past.

### Student's job
1. On local machine: pull down from upstream main (org's repo).
1. Make a new local branch for feature
1. When done, commit and push new branch to student's clone of repo.
1. Make a PR

### Code Reviewer's job:
1. Review PR and either ask for changes or merge into main.

### Questions
* Should we configure GitHub Actions / Workflows to run linter and unit tests? Yes I think?
* Should we use the GitHub Issue Tracker? If so, is there a particular format that you'd suggest we use?
* Should we make a practice codebase for the lab, or should we just have them work on the main course app as part of a homework assignment?