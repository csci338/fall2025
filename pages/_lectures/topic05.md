---
layout: module
title: Testing, Static Analysis, & Continuous Integration (CI)
type: topic
num: 5
draft: 1
start_date: 2025-09-23
labs: [6]
description: >
   Continuous integration (CI), static analysis, and testing are complementary software development techniques that ensure that teams can deploy software
   continuously with a high degree of confidence in the quality of their code.
   In this unit, we will learn about ways you and your team can automate code testing and validation procedures before merging code updates into the main branch. By setting up a few tools up front, you will save time and energy and increase the reliability of your code base. 

slides: 
    - start_date: 2025-09-23
      type: lecture
      num: 7
      draft: 0
      title: Intro to Testing
      url: https://docs.google.com/presentation/d/18N6d1HKbHKsgR-maWlt2Pp2sZp7A8XTP/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
    - start_date: 2025-09-30
      type: lecture
      draft: 0
      num: 8
      title: Static Analysis & Continuous Integration
      url: https://docs.google.com/presentation/d/1IUBjHLwGkYh-8xpPIC05Xahmj34cqPDd/edit?usp=sharing&rtpof=true&sd=true
readings:
    - start_date: 2025-09-23
      type: reading
      title: High-level overview of unit v. integration testing
      url: https://circleci.com/blog/unit-testing-vs-integration-testing
      required: 1
    - start_date: 2025-09-23
      type: reading
      title: Chapter 11. Testing Overview
      url: https://abseil.io/resources/swe-book/html/ch11.html
      required: 1
    - start_date: 2025-09-30
      type: reading
      title: Chapter 20. Static Analysis
      url: https://abseil.io/resources/swe-book/html/ch20.html
      required: 1
    - start_date: 2025-09-30
      type: reading
      title: Chapter 23. Continuous Integration
      url: https://abseil.io/resources/swe-book/html/ch23.html
      required: 1
    # - start_date: 2025-10-02
    #   title: Please read the Project 1 description before class
    #   type: reading
    #   url: /assignments/project01
    #   required: 1
    # - start_date: 2025-10-02
    #   title: Setting up Project 1 using Docker (video)
    #   type: reading
    #   url: https://drive.google.com/file/d/10h6CsMGXYFRHe4y95x32moJs-u6P9rjo/view?usp=drive_link
    #   required: 1
    #   notes: If you need help getting set up, here's a video walkthrough
projects: [ 1 ]
activities:
    - start_date: "2025-09-23"
      title: Python Practice
      num: 4
      type: activity
      draft: 0
      url: /activities/python-practice
    - start_date: "2025-09-30"
      title: Team Preferences
      type: activity
      draft: 0
      num: 5
      url: https://docs.google.com/document/d/1vD70DFplPXg6YxEaYDHPFGWznhVuDlgH/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
    - start_date: "2025-10-02"
      title: Project 1 Setup
      num: 6
      type: activity
      draft: 0
      url: /activities/project01-setup
questions:
    - <span class="badge-dark">general</span> What does "shifting left" mean?
    - <span class="badge-dark">testing</span> What are some of the benefits of automated testing? 
    - <span class="badge-dark">testing</span> What are some of the limits of automated testing? 
    - <span class="badge-dark">testing</span> What are the different test "sizes"? Why are these distinctions important? 
    - <span class="badge-dark">testing</span> What is meant by "nondeterminism" in testing? 
    - <span class="badge-dark">testing</span> What are some important qualities of a testing suite? 
    - <span class="badge-dark">testing</span> What are some considerations that go into writing testable code? 
    - <span class="badge-dark">testing</span> What is the difference between an interpreted and a compiled language? 
    - <span class="badge-dark">static analysis</span> What languages are interpreted? What languages are compiled?
    - <span class="badge-dark">static analysis</span> What do we mean by "static"? 
    - <span class="badge-dark">static analysis</span> What are some examples of static analysis tools? 
    - <span class="badge-dark">static analysis</span> What are some of the benefits of doing static analysis? 
    - <span class="badge-dark">static analysis</span> What are some of the challenges / limitations of static analysis? 
    - <span class="badge-dark">CI</span> What is continuous integration? 
    - <span class="badge-dark">CI</span> What are some of the key benefits and headaches (i.e. tradeoffs) of continuous integration?
    - <span class="badge-dark">CI</span> Can you still use CI if you're working on a really big feature that’s not ready for prime time?
    - <span class="badge-dark">CI</span> What happens in the "presubmit" phase?
    - <span class="badge-dark">CI</span> What is release candidate testing? How is it similar / different from the "presubmit" phase?
---