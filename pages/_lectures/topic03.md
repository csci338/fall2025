---
layout: module
title: "Everything As Code (+ Docker)"
type: topic
num: 3
draft: 1
start_date: 2025-02-04
description: >
   In this unit, we will explore the idea of formalizing your entire software stack using code (e.g. operating system configurations, dependencies, documentation, and more). Even if your team is collaborating on the same codebase, if each team member is developing software with a different compiler, interpreter, language version, operating system, etc., you will likely run into conflicts and inconsistencies. Give this, you will learn about why "everything as code" is such an important idea, and some tools and strategies for managing your system stack over time.
slides: 
    - start_date: "2025-02-04"
      num: 5
      draft: 0
      type: lecture
      title: Everything as Code
      url: https://docs.google.com/presentation/d/1PX4H4aqAFtf58dw3Y9gE5DkLDgHXDzYL/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
reading_instructions: >
    Readings are a bit light in this unit because I'm hoping you'll spend your outside-of-class time getting oriented with Docker:
readings: 
    - start_date: "2025-02-04"
      type: reading
      title: Everything as Code
      num: 1
      required: 1
      url: https://youtu.be/HcmPi7-IVQo
      instructions: > 
        Watch Seth Vargo's talk. You can also read the transcript <a href="https://www.hashicorp.com/resources/everything-as-code-the-future-of-ops-tools" target="_blank">here</a>
    - start_date: "2025-02-04"
      type: reading
      title: Docker Wikipedia article
      required: 1
      url: https://en.wikipedia.org/wiki/Docker_(software)
      num: 2
    - start_date: "2025-02-06"
      type: reading
      num: 3
      title: Docker cheat sheet reference
      url: https://docs.docker.com/get-started/docker_cheatsheet.pdf
activities:
    - start_date: "2025-02-04"
      title: Coding Practice
      num: 3
      type: activity
      draft: 0
      url: https://docs.google.com/document/d/1ufrC5XuE2OXPkYuXoPCDfS9ndK3rCKOh/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
labs: [4]
questions:
    - What were servers "back in the day"? What are servers now?
    - What kinds of server challenges do administrators need to be able to handle?
    - What is virtualization? What is containerization? How are they different?
    - What is the difference between declarative and imperative code? What are some examples of each?
    - Besides your application's source code, what other kinds of things should you also represent as code?
    - What are some of the advantages of putting all aspects of your system in terms of code?
    - What is Docker and why is it useful?
    - > 
       Be able to explain the following Docker concepts:
        <em>image</em>, <em>container</em>, <em>volume</em>, <em>bind mount</em>

---

