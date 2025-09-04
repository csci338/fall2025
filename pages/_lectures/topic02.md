---
layout: module
title: Version Control & Branch Management
num: 2
type: topic
draft: 1
start_date: 2025-08-26
description: >
    Version control is perhaps one of the most important topics in software engineering. Version control systems allow teams to collaborate on projects, review one another's code, experiment with new features and ideas, and revert to previous versions when needed. In this unit, we will explore different approaches that teams might take to organize their code repositories. We will also do various hands-on activities so that you can familiarize yourself with bash and git commands.
slides: 
    - start_date: "2025-08-26"
      num: 3
      draft: 0
      type: lecture
      title: Intro to Version Control
      url: https://docs.google.com/presentation/d/1CJeCcZvtlv50V5THh3DxDZvRROZXIno9/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
    - start_date: "2025-08-28"
      type: lecture
      draft: 0
      title: Introduction to Lab 2
      url: https://docs.google.com/presentation/d/1iBYAdOWcRUqr_Oc0O0ss0F0PFG2ulR9g/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
    - start_date: "2025-09-02"
      num: 4
      draft: 0
      type: lecture
      title: Version Control and Collaborative Workflows
      url: https://docs.google.com/presentation/d/1-hRdUlYno040jHsVn3H1urpkMpDp58As/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
    - start_date: "2025-09-04"
      type: lecture
      draft: 0
      title: Intro to Lab 3
      url: https://docs.google.com/presentation/d/1ucN6atlHcSLyE7n6Tcdj2fo4X_8rqDig/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
readings: 
    - start_date: "2025-08-26"
      title: Chapter 16. Version Control and Branch Management
      num: 1
      type: reading
      required: 1
      url: https://abseil.io/resources/swe-book/html/ch16.html
    - start_date: "2025-09-02"
      title: 
      num: 2
      type: reading
      citation: > 
        <a href="https://en.wikipedia.org/wiki/git" target="_blank">Git Wikipedia article </a><br>Read the "History" and "Characteristics" sections.
      required: 1
    - start_date: "2025-09-02"
      type: reading
      num: 3
      citation: >
        <a href="https://git-scm.com/book/en/v2" target="_blank">Pro Git book</a><br>The Pro Git book provides some useful context and conceptual models, particularly 2.1-2.5, 3.1-3.1, and 3.6.
    - start_date: "2025-09-04"
      title: Collaborating with git and GitHub (video)
      num: 4
      type: reading
      url: https://www.youtube.com/watch?v=_wQdY_5Tb5Q
      instructions: > 
        Covers branches, pull requests, and merging vs rebasing
      required: 1
    - start_date: "2025-09-04"
      title: What is git rebase? (video)
      num: 5
      type: reading
      url: https://www.youtube.com/watch?v=_UZEXUrj-Ds
    - start_date: "2025-09-04"
      title: How to rebase + handle merge conflicts
      num: 6
      type: reading
      url: https://www.atlassian.com/git/tutorials/comparing-workflows
activities:
    - start_date: "2025-09-02"
      title: Git Collaboration Activity
      num: 2
      draft: 0
      type: activity
      url: /activities/git-in-class-activity
labs: [2, 3]
questions:
    - Why is version control important?
    - Why is code history important?
    - What is the difference between centralized and distributed version control?
    - What is the problem with having long-running dev branches? What is the solution?
    - What is the one version rule?
    - What are the tradeoffs of having a "monorepo" versus multiple repos?
    - What is the difference between git and GitHub?
    - What is the difference between a merge commit and rebasing? What would you want to do one over the other (i.e., what are the the tradeoffs of each)?
    - What does the "origin" typically refer to?
    - What is a public / private key pair?
    - > 
        What do the following git commands do? 
        <code>clone</code>, <code>status</code>,
        <code>add</code>, <code>log</code>, <code>commit</code>, <code>push</code>, <code>pull</code>, <code>merge</code>, <code>rebase</code>
    - > 
        What do the following bash commands do? 
        <code>ls</code>, <code>cat</code>,
        <code>mv</code>, <code>pwd</code>, <code>cd</code>, <code>rm</code>
---



