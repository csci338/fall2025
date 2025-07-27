---
layout: assignment-two-column
title: "Intro to Docker"
type: lab
draft: 0
points: 6
abbreviation: Lab 4
show_schedule: 1
num: 4
start_date: 2025-02-06
due_date: 2025-02-12

---

## 1. Background
* <a href="https://learn.microsoft.com/en-us/training/modules/intro-to-docker-containers/" target="_blank">What is Docker?</a>

## 2. Install Docker
### Mac
You can either install the binary from the Docker website or use `brew` (brew instructions below):

```shell
brew install --cask docker  # use "cask" b/c it's a system-level package
# verify version:
docker --version
```

Next, run the Docker service by looking for `Docker.app` using Spotlight (magnifying glass). Once it starts, go back to the Terminal and issue:

```shell
# install hello world container:
docker run hello-world
```

You should see that it outputs a message similar to the one shown below to the command line:

{:#f1}
#### Figure 1
Docker output after running `docker run hello-world`:

```shell
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
70f5ac315c5a: Pull complete 
Digest: sha256:dcba6daec718f547568c562956fa47e1b03673dd010fe6ee58ca806767031d1c
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm64v8)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

### Windows
Follow the instructions on Microsoft's website: <a href="https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers#install-docker-desktop" target="_blank">https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers#install-docker-desktop</a>. 

Then, activate WSL and type the following into your WSL shell:

```shell
docker run hello-world
```

You should see output similar to the output above ([Figure 1](#f1))

## 3. FAQs
### What is a container?
A container is an isolated process (process that can't interact w/any other parts of your OS) that runs on a host machine (i.e., your laptop).
* It can run on any machine (and be easily ported to the cloud)
* It's isolated from any other containers and processes
* Created from "images" (OS configurations), and can be stopped, started, or deleted
* Source: <a href="https://docs.docker.com/get-started/" target="_blank">https://docs.docker.com/get-started/</a>

### What is an image?
"A running container uses an isolated filesystem. This isolated filesystem is provided by an image, and the image must contain everything needed to run an application - all dependencies, configurations, scripts, binaries, etc. The image also contains other configurations for the container, such as environment variables, a default command to run, and other metadata."

* Source: <a href="https://docs.docker.com/get-started/" target="_blank">https://docs.docker.com/get-started/</a>

### Docker Cheatsheet
This just lists the commands we'll be using in today's tutorial:

#### Images

| **docker images** | Lists available images |
| **docker rmi `<your-image-id>`** | Removes an image |
| **<a href="https://hub.docker.com/search?q=&type=image&image_filter=official" target="_blank">Docker Hub Image registry</a>** | Shows you all the available pre-defined images |

#### Containers

| **docker build .** | Builds a container from a Dockerfile in the current directory (`.`) | 
| **docker build -t `<name-of-container>` .** | Builds a container from a Dockerfile in the current directory (`.`) and tags it with the name `my-container` | 
| **docker run `<name-of-container>`** | Creates and runs a new container from an image (including images in the <a href="https://hub.docker.com/search?q=&type=image&image_filter=official" target="_blank">Docker Hub Image registry</a>) |
| **docker ps** | Lists Docker processes that are currently running |
| **docker stop `<pid>`** | Stops Docker container from running (by process id) | 
| **docker start `<pid>`** | Starts Docker container from running (by process id) | 
| **docker rm `<pid>`** | Deletes Docker container from running (by process id) | 
| **docker exec -it `<pid>` sh** | Runs a shell inside a running Docker container |
| **docker exec -it `<pid>` python** | Runs python inside a Docker container (provided that python is installed) |


## 4. Your Tasks

For this week's lab, you will be completing the "Getting Started" Docker Tutorial. 

{:.info}
> ### Before you begin, get the latest code from `class-exercises-fall2025`
> **On GitHub:**
> * Sync the latest changes from the class version of class-exercises-fall2025 to your copy of the repo.
>
> **On your local computer:** 
> * Make sure that all of your changes from the last lab are staged and committed.
> * Checkout your main branch: `git checkout main`
> * Pull down the latest changes: `git pull`
> * Create a new branch called lab04-b: `git checkout -b lab04-b`
> * Verify that you're on your new branch: `git branch`
> * After going through the lab, answer the questions in the `lab04/answers.md` file.


### Begin the Docker Tutorial
Begin the Docker tutorial as follows:
1. Ensure that Docker is running
1. Open the command prompt
1. Run the following command: `docker run -dp 80:80 docker/getting-started`
1. Open <a href="http://localhost" target="_blank">http://localhost</a> in your browser to complete the tutorial.
1. Complete the following sections (note that #4 and #9 are optional):
    1. Getting Started
    1. Our Application
    1. Updating Our App
    1. *Sharing Our App (Optional)*
    1. Persisting our DB
    1. Using Bind Mounts
    1. Multi-Container Apps
    1. Using Docker Compose
    1. *Image Building Best Practices (Optional)*
1. Answer the questions in the `class-exercises-fall2025/lab04/answers.md` file.


## What to Turn In
After answering all of the questions in your `class-exercises-fall2025/labo04/answers.md` file...

1. Make sure that your app folder is inside of your lab04 folder (including your Dockerfile and docker-compose.yml files).
2. Then, stage, commit, and push the `lab04-b` branch of your `class-exercises-fall2025` repo to GitHub.
3. Create a Pull Request (but do not merge your pull request -- that doesn't happen until Sarah reviews it).
4. Paste a link to your pull request in the Lab04 submission