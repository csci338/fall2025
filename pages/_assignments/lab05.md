---
layout: assignment-two-column
title: "Understanding Package Managers"
type: lab
draft: 1
points: 6
abbreviation: Lab 5
num: 5
start_date: 2025-09-18
due_date: 2025-09-24

---

## Objective
The objective of this lab is to help you understand the concept of package management and to  gain hands-on experience with various package managers, including:

1. Your OS package manager:
    * Mac: `brew` (Homebrew)
    * WSL / Linux: `apt-get` (APT)
2. `poetry` (Python) - Everyone
3. `npm` (Node.js) - Everyone

By the end of the lab, you should understand how to install, update, remove, and manage dependencies using these package managers. Learn more about each of these package managers on each project's website:
- [Homebrew Documentation](https://brew.sh)
- [APT Documentation](https://manpages.debian.org/bullseye/apt/apt.8.en.html)
- [Poetry Documentation](https://python-poetry.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)


{:.info}
> ## Before you begin
> Before you begin, get the latest code from class-exercises-fall2025
>
> **On GitHub:**
>
> * Sync the latest changes from the class version of `class-exercises-fall2025` to your copy of the repo.
>
> **On your local computer:**
> * Make sure that all of your changes from the last lab are staged and committed.
> * Checkout your main branch: `git checkout main`
> * Pull down the latest changes: `git pull`
>     * If you did it correctly, you will notice that a new `lab05` folder has been created.
> * Create a new branch called lab05: `git checkout -b lab05-b`
> * Verify that you’re on your new branch: `git branch`
> * You are going to do some coding / package manager activities within your `class-exercises-fall2025/lab05` directory
> * After going through the lab, be sure to answer the questions in `lab05/answers.md`.


{:#p1a}
## Part 1(a): Homebrew (brew)
> If you are a Windows user, skip this section and jump to [Part 1(b)](#p1b).

**Homebrew** is a package manager for macOS that simplifies the installation of software.

### 1.1. Installing a Package
1. Open a terminal and check if you already have `brew` installed by typing: `brew`
2. If Homebrew is not already installed, install it by following the official installation instructions (see <a href="https://brew.sh/" target="_blank">https://brew.sh/</a> for more info):<br><br>
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Once Homebrew is installed, use it to install `wget`:<br><br>
   ```bash
   brew install wget
   ```
4. Verify the installation by running:<br><br>
   ```bash
   wget --version
   ```
5. Now that wget is installed, try coping a file from the Internet to your current working directory as follows: <br><br>
    ```bash
    wget https://www.google.com
    ```

    If it worked, an `index.html` file should have been copied to your local directory. Use the `cat` command to view it. Then remove it using the `rm` command.

6. Finally, list all of the packages that brew manages on your Mac as follows:
    ```bash
    brew list
    ```

### 1.2. Updating and Removing Packages
1. Update all installed packages using:<br><br>
   ```bash
   brew update
   ```
2. Uninstall `wget`:<br><br>
   ```bash
   brew uninstall wget
   ```
3. Test that it worked by running the same `wget` command again. It should throw an error: <br><br>
    ```bash
    wget https://www.google.com
    ```
4. Now reinstall `wget`:<br><br>
    ```bash
   brew install wget
   ```
5. Test that it worked by running the same `wget` command again. The Google `index.html` should again be in your working directory (go ahead and delete it once you've verified it's in there).


{:#p1b}
## Part 1(b): APT (apt-get)
> If you are a Mac user skip this section (but make sure you completed [Part 1(a)](#p1a)).

**APT** is a package management system used by Debian-based Linux distributions (e.g., Ubuntu).

### 1.1. Installing a Package
1. Open a terminal in a Debian-based Linux environment.
2. Update the local package index:<br><br>
   ```bash
   sudo apt-get update
   ```
3. Install the `curl` package:<br><br>
   ```bash
   sudo apt-get install curl
   ```
4. Verify the installation:<br><br>
   ```bash
   curl --version
   ```

5. Use curl to save the Google Homepage in your current directory:<br><br>
   ```bash
   curl https://www.google.com > google.html
   ```

If it worked, an `google.html` file should have been created to your local directory. Use the `cat` command to view it. Then remove it using the `rm` command.

### 1.2. Updating and Removing Packages
1. Upgrade all installed packages:
   ```bash
   sudo apt-get upgrade
   ```
2. Remove the `curl` package:
   ```bash
   sudo apt-get remove curl
   ```
3. Test that it worked by running the same `curl` command again. It should throw an error: <br><br>
    ```bash
    curl https://www.google.com > google.html
    ```
4. Now reinstall `wget`:<br><br>
    ```bash
  sudo apt-get install curl
   ```
5. Test that it worked by running the same `curl` command again. `google.html` should again be in your working directory (go ahead and delete it once you've verified it's in there).


{:#p2}
## Part 2 (Everyone): Poetry (Python)
**Poetry** is a dependency manager for Python projects that handles dependencies and packaging.

### 3. Creating a Python Project with Poetry
1. Verify that you're on a local branch called `lab05-b` (`git branch`). If you're not, jump to the top and re-read the "Before You Begin" section.
1. Check if poetry is already installed by typing `poetry` at your Terminal / WSL command prompt.
3. If it's not, install Poetry:<br><br>
   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```
4. Verify the installation:<br><br>
   ```bash
   poetry --version
   ```
    * If you get an error, you will need to add your poetry installation to your path file. See <a href="" target="_blank">this StackOverflow post</a>. It will probably tell you to run this command:
      ```
      export PATH="$HOME/.local/bin:$PATH"
      ```
5. Navigate to your `class-exercises-fall2025/lab05` directory.
6. From within the `lab05` directory, create a new Python project using Poetry:<br><br>
   ```bash
   poetry new poetry-demo
   cd poetry-demo
   ```

   Your file structure should look like the one below:
   ```bash
    class-exercises-fall2025
    ├── .git
    ├── .gitignore
    ├── README.md
    ├── lab03
    │   └── answers.md
    ├── lab04
    │   └── answers.md
    └── lab05
        ├── answers.md
        ├── node-demo
        └── poetry-demo
   ```

### 4. Adding Dependencies
1. Add a dependency, e.g., `requests`, to the project:<br><br>
   ```bash
   poetry add requests
   ```
2. Check that the `requests` package was added to `pyproject.toml` and installed:<br><br>
   ```bash
   poetry show
   ```

### 5. Running the Project in a Virtual Environment
Create a new file in your `poetry-demo` folder called `lab05-experiments.py`. Paste the following starter code inside of it:

```py
import requests

def main():
    print("hello world")
    # user_agent makes it seem like the request is coming from a web browser (versus a bot)
    user_agent = {'User-agent': 'Mozilla/5.0'}
    response = requests.get("https://new.cs.unca.edu/", headers=user_agent)
    print(response.content)

if __name__ == "__main__":
    main()
```

Now, run this file on the command line using the python virtual environment you just made:

```bash
poetry run python lab05-experiments.py
```

It should have outputted the web page from the URL given to the screen.

Now run the same python file again (outside of your virtual environment):

```bash
python3 lab05-experiments.py
```
You should see an error because `requests` and `bs4` are not installed for your system-level python installation.

### 6. Install more dependencies + modify your code
Now we are going to make the beginnings of a simple web crawler that extracts all of the links from the <a href="https://new.cs.unca.edu/" target="_blank">https://new.cs.unca.edu/</a> page, using another package called beautiful soup. To do this, you will install "Beautiful Soup" -- a python module with various utilities that makes it easy to extract items from web pages. Please do the following:

1. Install the `bs4` package using poetry
2. Modify the `main` function inside of `lab05-experiments.py` so that it only output the URLs of any links on the CS homepage.

If you wrote your code correctly, this should be the output (there should be around 85 links total):

```bash
https://unca.edu
https://new.unca.edu/admission/apply/
/
https://new.cs.unca.edu/our-mission/
https://new.cs.unca.edu/our-programs/
https://new.cs.unca.edu/computer-systems-major/
...
```

#### Hints:
* Make sure you import Beautiful soup at the top of your python file:<br><br>
    ```py
from bs4 import BeautifulSoup
    ```
* Create a BeautifulSoup object from the HTML:<br><br>
    ```py
soup = BeautifulSoup(response.content, 'html.parser')
    ```
* Use the built-in BeautifulSoup functions to extract all of the links. Feel free to ask Google or Chat GPT something like: "How to I extract URLs using beautiful soup?"


### 7. Removing Dependencies
1. Remove the `requests` and `bs4` packages from the project:<br><br>
   ```bash
   poetry remove requests
   poetry remove bs4
   ```
2. Try running your python script again:<br><br>
    ```bash
    poetry run python lab05-experiments.py
    ```
    What happened?
3. Add `requests` and `bs4` back:<br><br>
   ```bash
   poetry add requests
   poetry add bs4
   ```
4. Try running your python script again:<br><br>
    ```bash
    poetry run python lab05-experiments.py
    ```
    What happened?

{:#p3}
## Part 3 (Everyone): npm (Node.js)
**npm** is the default package manager for Node.js. It helps manage project dependencies. Before you begin, check to see whether node is already installed by running the following on the command line:

```
node -v
```
* If your version of Node is less than version 18x, talk to Sarah. 
* If Node.js is not installed, follow the installation instructions for your respective OS
* Otherwise, skip down to 7

### Installation Instructions 

#### Mac
Use brew:
```bash
brew install node
node -v
```

#### Ubuntu / WSL
Because `apt` has a very outdated node version, you're going to install and use `nvm` (Node.js version manager) to install the latest version of node. Please issue the following commands on your WSL terminal:

```bash
sudo apt-get install -y curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

When you're done, restart your WSL terminal for the changes to take effect, and then install node as follows:

```bash
nvm install node
node -v
```
Source: <a href="https://dev.to/dcodeyt/the-easiest-way-to-install-nodejs-on-wsl-mac-ubuntu-43pp" target="_blank">https://dev.to/dcodeyt/the-easiest-way-to-install-nodejs-on-wsl-mac-ubuntu-43pp</a>


### 8. Initializing a Node.js Project
1. Open a terminal and navigate into the `lab05/node-demo` folder. Note that there are already some files in this folder for a "starter" React project. However, the underlying dependencies are not installed. Then, from within the `node-demo` folder, initialize a new node project using the node package manager:<br><br>
   ```bash
   npm init -y
   ```

   The `npm init` command should have created two new files within `node-demo`: `package.json`. Verify this.

### 9. Install the React and Vite Dependencies
1. Install the `react`, `react-dom`, and `vite` packages through the node package manager as shown below:<br><br>
   ```bash
   npm install react react-dom vite
   ```
2. Verify that the package was installed by checking the `node_modules` folder and `package.json` file. You should also notice that a `package-lock.json` was created.
3. Modify the `package.json` file by replacing the entire "scripts" entry with this one:<br><br>
    ```json
    "scripts": {
        "start": "vite",
        "build": "vite build",
        "serve": "vite preview"
    },
    ```
4. When you're done, issue the following command in the terminal from within your `node-demo` folder: 
    ```bash
    npm start
    ```
    Then navigate to <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a> in your web browser.

    If you did everything correctly, you should see a simple screen that says **Hello world!**

### 10. Add a new dependency
Now that you have a working react app, stop your vite process (Control + C on the Terminal). We will now install a design system package called "Ant", which includes some nice react widgets that we can use to accelerate our development process:

```bash
npm install antd
```

Now, open `src/App.js` and replace the current code with this code:

```jsx
import React, { useState } from "react";
import { Button, Modal } from "antd";
const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    src="https://picsum.photos/400/300"
                    width="400"
                    height="300"
                    style={
                        {
                            width: "100%",
                        }
                    }
                />
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};
export default App;
```

Finally, run your react app again...

```bash
npm start
```
...and then navigate to <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a>.

If you did it correctly, you should see a modal:

<img src="/fall2025/assets/images/labs/lab05/modal.png" class="large" />

If you are new to web development, this modal may not look like much, but building components like modals from scratch is a pain! Thanks to the React components built into the Ant Design System (and there are many other design systems out there), we can just import some packages and hit the ground running!

{:#p4}
## Part 4: Answer the Discussion Questions
Please answer all of the discussion questions in the `class-exercises-fall2025/lab05/answers.md` file.


### Submission
Please verify that you completed the Lab 5 tasks:

{:.checkbox-list}
* You experimented with your operating system's package manager (Part 1)
* You created a python app in poetry that extracts and prints URLs from the UNCA Computer Science homepage (Part 2)
* You have created an interactive modal box using React (Part 3)
* You have answered all of the questions in `answers.md`.

Then, push your `lab05-b` branch to GitHub and make a pull request. Please ensure that the destination (left-hand side) is pointing to the `main` branch of **your repo** and the source (right-hand side) is pointing to the `lab05-b` branch of **your repo**

Paste a link to your pull request in the Moodle submission.
