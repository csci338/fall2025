---
layout: module
title: "Package & Dependency Management"
type: topic
num: 4
draft: 0
start_date: 2025-02-11
description: >
   When developing software, it is common to rely on dependencies -- code that has been developed by other people. However, <em>your code</em> isn't the only code that changes. Dependencies (and their dependencies, and their dependencies' dependencies) also evolve over time as new features are added and bugs are patched. Given this, in this unit we will examine some tools, approaches, and considerations for managing code dependencies. We will also experiment with a few different dependency management tools, such as npm, poetry, and apt.

slides: 
    - start_date: "2025-02-11"
      num: 6
      draft: 0
      type: lecture
      title: Package & Dependency Management
      url: https://docs.google.com/presentation/d/1hNrQ73xwDzFbMB9lK633KoodLb_FOIza/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true
labs: [5]
readings:
    - start_date: "2025-02-11"
      title: Chapter 21. Dependency Management
      type: reading
      url: https://abseil.io/resources/swe-book/html/ch21.html
      required: 1
    - start_date: "2025-02-11"
      title: How one programmer broke the internet by deleting a tiny piece of code.
      type: reading
      url: https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code
      required: 1
    - start_date: "2025-02-11"
      title: NPM’s "everything" debacle.
      type: reading
      url: https://socket.dev/blog/when-everything-becomes-too-much
      required: 1
    - start_date: "2025-02-11"
      title: Havoc Pennington's 2017 blog post
      type: reading
      url: https://blog.ometer.com/2017/01/10/dear-package-managers-dependency-resolution-results-should-be-in-version-control/
      notes: Outlines the problems with non-exact dependency resolution
    - start_date: "2025-02-11"
      title: Facebook's blog post upon the release of yarn
      type: reading
      url: https://engineering.fb.com/2016/10/11/web/yarn-a-new-package-manager-for-javascript/
      notes: How did Facebook solve some of the dependency resolution challenges noted in our other readings?

questions:
    - What do we mean by "dependency management"?
    - What happened in the "leftpad" debacle? What happened in the "everything" debacle? Why should we care?
    - What are the trade-offs associated with relying on dependencies?
    - What should you consider before adding a new dependency to your software project?
    - What are some challenges with upgrading dependencies?
    - What are some dependencies that we have used in this class?
    - What are some common features of a good dependency management system?
    - What is the purpose of the Poetry lock file and the package.json lock file?
    - > 
        Different dependency management systems are used for different parts of the software stack. What are some examples of dependency managers that are used for: <em>operating systems</em>, <em>software languages (e.g., python, node.js, ruby, etc.</em>, <em>server configuration</em>?

---