---
layout: syllabus
title: Syllabus
permalink: /syllabus/
course: "CSCI 338: Software Engineering"
term: "Spring 2025"
prerequisites: "CSCI 202 and CSCI 235"
time: "Tu, Th 3:15 PM - 4:55 PM"
location: "RRO Rm. 217"
instructor_name: "Dr. Sarah Van Wart"
instructor_email: "svanwart@unca.edu"
instructor_pronouns: "she / her"
office_hours: "Mo, We, Fr 3:30 PM - 4:30 PM"
instructor_location: "RRO Rm. 220"
---

{:.info}
> ## Acknowledgements
> This course was designed in partnership with <a href="https://semmy.me/" target="_blank">Dr. Semmy Purewal</a>. We are very grateful to Semmy for bringing his industry knowledge to this class and helping the next generation of software engineers here at UNC Asheville learn from it. 

## About the Course
Welcome to CSCI 338! Taking this course gives you the opportunity to work on a collaborative software development project while learning some of the tools, methods, and processes that are widely used in industry. We will be using some specific programming languages and libraries to explore various "big ideas" in software engineering. That said, the focus of this course is on the ***processes and tools*** that will enable you to build software that is ***scalable and maintainable over time*** (versus learning particular languages / libraries). Drawing from <a href="https://abseil.io/resources/swe-book" target="_blank">Software Engineering at Google</a> (one of the books we will use in this course), we will explore three categories of considerations:

1. **Culture** -- How people on teams can work well together; document and share knowledge; prioritize technical, social, and business goals; cultivate a curious, open, and critical perspective on their work; and measure the benefits and costs of technical decisions.
1. **Process** -- How to actually go about writing code, including coming up with style guides and coding conventions, doing code reviews, documenting your code, writing tests, deprecating features, and breaking down ideas into concrete features and tasks (so that you can make clear and manageable progress).
1. **Tools** -- Using different software tools to improve how your team manages their codebase. This includes tools for version control, building and compiling your system (particularly important for larger systems), managing dependencies, and ensuring that you are continuously integrating and deploying code changes.

By the end of this course, our hope is that you will view software engineering as set of tools and strategies for managing uncertainty, change, and competing priorities -- versus a fixed list of rules that you follow religiously. How software development proceeds depends on your goals, the constraints you are under, and the information and tools you have at your disposal. Given this, the more holistically you think about evaluating different trade-offs and choices, the more effective you will become.

<!-- topics and labs here -->
{% include schedule-very-simple.html %}

## Course Format
The course format includes a mix of assigned readings, lectures, labs, projects, quizzes, and exams. We will generally try to use our Tuesday class time to discuss a "big idea" in software engineering, and our Thursday class time to complete hands-on labs. It is your responsibility to keep up-to-date on class material and announcements, as the schedule is subject to change. This includes material presented and announcements made in class, via email, or on Moodle.

### Class Participation
Class meetings will be in person. Most class sessions have accompanying readings, which you will be expected to complete before class. Please do your best to be physically and mentally present, and to share your knowledge and experience with one another. 

### Projects
Over the course of the semester, you will be working with your classmates on a collaborative software development project. During the first half of the semester, you will be assigned 1-2 features that you will need to implement and deploy to the class's shared codebase (individual assignments). During the second half of the semester, you will be working with one or more of your classmates to design, build, and test a feature that you come up with as a team. 

Our hope is that the experience will help you develop more perspective around how software teams organize their work, make decisions, onboard new developers, introduce new features, etc.

{:.blockquote-no-margin}
> **Note:** I am still figuring out how we will be organizing the projects. The current plan (described above) may change.


### Labs
Labs are intended to be completed during class on Thursdays (unless otherwise specified), so that we can help you with any questions (or configuration issues) you make have. Each lab is designed to give you practice with a tool, technique, or workflow relevant to building collaborative software.

### Exams
There will also be a midterm and a final exam to assess your understanding of some of the methods we are learning about (e.g., version control, tradeoffs, CI/CD, managing trade-offs, navigating constraints and uncertainty, dependency management, etc.).


## Course Expectations
* You will come to class prepared and ready to engage in an intellectual discussion about the readings.
* You will complete all assignments on time and with interest, engagement, and intellectual curiosity.
* You will bring your unique expertise, perspectives, and experiences to class and share them with others, so that we might all gain from your perspectives.
* You will respect and seek to understand the unique perspectives and experiences of others.
* You will give your classmates the benefit of the doubt (about their competence and intentions) and can expect the same from them.
* All work that you submit will be your own original work; you will cite others’ work where appropriate.

## Course Materials & Resources

### Books
We will be reading selected chapters from  <a href="https://abseil.io/resources/swe-book" target="_blank">Software Engineering at Google</a>. There is a free copy of the book online, or you can order a hardcopy. 

### Software
This course will utilize many different software packages, libraries, and tools (all free), including the ones listed below. You will probably need around 5GB of disk space to run these programs. Installing and configuring programming software can be a hassle, but it is part of the process of developing your working computing knowledge. We will help you. 

{:.compact}
* <a href="https://code.visualstudio.com/download" target="_blank">Visual Studio Code</a>
* <a href="https://github.com/git-guides/install-git" target="_blank">Git and the Github Client</a>

### Other Course Resources
We will also be compiling a list of cheatsheets, online tutorials, and documentation pages on the course [Readings and Resources](../resources/) page.

### Acknowledgements
These course materials were developed collaboratively by Sarah Van Wart and Semmy Purewal.

## Grading
Your course grade is calculated based on projects, labs, exams, and attendance / participation:

{:.small}
| **Labs** | 30% |
| **Projects** | 40% |
| **Attendance & Participation** | 10% |
| **Midterm Exam** | 20% |

### Labs
Labs will be graded according to the following scale (from 0-3 points):

| 0pts | Not attempted | Assignment not submitted. |
| 1pt | Check Minus | Assignment attempted but less than half of it was completed correctly. |
| 2pts | Check | Most of the assignment was completed. |
| 3pts | Check Plus | Assignment fully completed and works as expected. |

**Late labs will not be accepted.**

### Projects
Projects involve building part of a larger system, and will be graded according to a rubric. We will be using a code review workflow for assessment. Here is how the process will work:

#### Code Reviews
1. You will submit your work as a series of pull requests (PR) on or before the due date.
1. I will do a code review and either ask for changes or accept your changes. 
    * If your PR is accepted, you're done and will receive full credit for your work.
    * Otherwise, you will need to implement the requested changes and re-submit before the deadline.

#### Code Review Resubmissions and Late Work
* All late submissions will incur a 15% penalty. 
* If you anticipate not being able to complete your feature on time, please talk to the instructor as soon as possible (just as you would if this were your job).
 
### Participation
In this class, participation is defined as:

1. [8%] Attendance – "Half of life is just showing up."
2. [2%] Engaging with the course ideas and with your peers, including completing the readings and participating in the discussions and activities, and performance on the quizzes.

We will take attendance. You may miss **two** class sessions – no questions asked – without a grade penalty. Any additional absences (beyond your two “freebies”) will impact your participation grade (and more to the point, your capacity to productively engage with the class).

### Exams
Exams will be graded according to how thoroughly you answer the questions and drawing from the principles and readings covered of the course.

## Course Policies

### General
* No food, no drinks, and no water inside the classroom. If you need to eat or drink, please step outside the classroom (away from the computers) to do so.
* Be respectful of others during classroom discussions and presentations.
* We may have the occasional remote class session.

### Academic Honesty
In the past, there have been a few unfortunate instances in which students have presented work other than their own. Here are some guidelines to help you understand what is and is not appropriate. Please do no hesitate to contact the instructors if you have any questions about these guidelines.

#### Labs
Helping other students with their in-class labs is allowed and encouraged, but each student should type their own solution unless otherwise specified in the lab instructions.

#### Projects
* You are allowed and encouraged to discuss general approaches to solving problems, but all work you submit must be your own (no "outsourcing").
* Uploading materials from this course to websites that sell such content to students is prohibited by UNCA’s academic integrity policies, and may also put you at risk for violating copyright policies in UNCA’s Student Conduct Code.

#### Using Outside Tools and Materials
In this class, we encourage you to explore the broader Internet for tutorials, code samples, new coding techniques, libraries, etc. That said, you must *acknowledge all sources contributing to your work.*  If you receive any assistance from any source (Internet, peer, social media, ChatGPT, etc.), please describe your source and that source’s contribution(s). If you have any questions about this, please don't hesitate to contact the instructors.

Students violating the academic honesty policy on an assignment will receive a grade of 0 on that assignment for the first offense, and will receive a grade of "F" in the course for the second offense. This will apply to all students involved in the violation, including both the source student and the copying student. It is your responsibility to ensure that your work is not used by other students.

All cases of academic dishonesty will be reported to the Assistant Provost.

### ChatGPT Policy (adapted from Boston University)

#### Students shall...
* Give credit to AI tools whenever used, even if only to generate ideas rather than usable text or code.
* When using AI tools on assignments, add an appendix showing:
    1. the entire exchange, highlighting the most relevant sections
    2. a description of precisely which AI tools were used (e.g. ChatGPT private subscription version, CoPilot, etc.)
    3. an explanation of how the AI tools were used (e.g. to generate ideas, understand functions or coding ideas, etc.)
    4. an account of why AI tools were used (e.g. to save time, to to stimulate thinking, to handle mounting stress, to clarify prose, to experiment for fun, etc.).
* **Not use AI tools during in-class examinations or quizzes** unless explicitly permitted and instructed.
* Use AI tools wisely and intelligently, aiming to deepen understanding of subject matter and to support learning.

#### I (Sarah) shall...
* Seek to understand the strengths and weaknesses or AI tools for teaching and learning, to optimize their value for student learning.
* Impose a significant penalty for:
    1. using code that you do not understand and/or cannot clearly explain.
    2. low-energy or unreflective reuse of material generated by AI tools and/or merely reproducing the output from AI tools.
    3. using antiquated language features or antipatterns (e.g., using "var," using floats or tables for page layouts, etc.).

#### This policy recognizes that...
* This policy depends on goodwill, a sense of fairness, and honorable character.
* This policy takes account of the existence of subscription versions of AI tools, which are not affordable for some students; the policy may need to be revised as the differences between subscription and free versions become better understood.
* This policy may be revised in light of other policies and novel technological developments in AI tools.
 

### Class Cancellation Policy
If a class meeting is canceled or due dates are moved due to inclement weather or any other reason, we will inform you via campus email (ending with unca.edu).

## University Policies

### Office of Accessibility & Academic Accommodations
UNC Asheville is committed to providing an inclusive experience, accessible learning environments and equal opportunity to individuals with disabilities in accordance with the Americans with Disabilities Act (ADA) and Section 504 of the Rehabilitation Act. 

If you are a student experiencing barriers to access or full participation in this course on the basis of a disability, contact the Office of Accessibility to apply for reasonable accommodations and discuss available resources. You may contact the Office of Accessibility at academicaccess@unca.edu or 828-251-6292. 

Students are responsible for discussing their Letter of Accommodations (LOA) with their faculty. Students and faculty are encouraged to discuss the LOA as early in the semester as possible to allow for extended access to accommodations. However, students may disclose a disability at any point in the semester. Accommodations are not retroactive and are activated when the LOA is discussed.  

### Promoting Gender Equity, Addressing Sexual Misconduct
UNC Asheville is dedicated to cultivating and maintaining a safe, respectful, and inclusive environment, free from harassment and discrimination. We strive to ensure that all have equal access to the educational and employment opportunities the University provides. If you or someone you know has been affected by sex-based harassment or sexual misconduct, including sexual assault, dating or domestic violence, or stalking, please know that help and support are available. UNC Asheville strongly encourages all members of the community to take action, seek support, and report incidents of sexual harassment to the Title IX Office.  You may contact the Title IX Office or Heather Lindkvist, the Title IX Coordinator, directly at 828.232.5658 or via titleix@unca.edu or learn more by visiting the Title IX website.

As a faculty member, I am a “responsible employee” and private resource. This means that if you share any information or discuss an incident with me regarding sexual or gender-based harassment, I must disclose this information to the Title IX Coordinator. Our goal is to ensure you are aware of the range of options available to you and have access to the resources you may need. 

If you wish to speak with a confidential resource, contact University Health and Counseling Services at 828.251.6520. Off-campus confidential resources include Our Voice (24-Hour Hotline at 828.255.7576) and Helpmate (24-Hour Hotline at 828.254.0516).

### Academic Alerts
Faculty at UNC Asheville have access to an Academic Alert system. The purpose of this system is to support communication with students about their progress in courses, especially if there are concerns (e.g., academic difficulty, attendance problems). Professors use the Alert system because they are invested in their students’ success. Entering an academic alert is a great way to supplement open conversations between instructors and students about how students can improve their academic performance. 

When a faculty member submits an alert that expresses a concern, the student receives outreach from their academic advisor or the team in the Office of Academic Advising. Students are no longer receiving automated notification emails when an alert is submitted. It is in the student's best interest to address the alert quickly, as students who do so are more likely to earn credit for the course. Questions about the Academic Alert system can be directed to Anne Marie Roberts (amrober1@unca.edu) in the Academic Success Center.


### Mental Health Support
As a student, you may experience a range of challenges that can interfere with learning, such as stressful life events, experiences of anxiety and/or depression, self-harm, substance use, and/or unusual difficulty with ordinary life activities. The increased stress of school can also make existing mental health struggles more difficult to manage. Support is available and treatment can help. Learn more about the confidential mental health services UNC Asheville provides to support student success at [https://www.unca.edu/life/health-counseling/](https://www.unca.edu/life/health-counseling/).

The Health and Counseling Center is located at 118 W.T. Weaver Boulevard. Appointments can be made by calling 828-251-6520. A UNC Asheville counselor on call is available after 5 p.m. and on weekends; the counselor on call can be accessed by calling the UNCA Campus Police dispatcher at 828-251-6710. Additionally available after hours and on weekends, call the Bulldog Health Link at 1-888-267-3675, where you can get immediate support for mental health, medical consultation, concern for a friend, and/or community resources. In case of an emergency, you can also call RHA’s Mental Health Mobile Crisis Unit at 1-888-573-1006.
