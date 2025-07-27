---
layout: assignment-two-column
title: Code Editors
type: lab
draft: 0
points: 6
abbreviation: Lab 1
num: 1
start_date: 2025-01-16
due_date: 2025-01-22
---

## Introduction
Welcome to your first CSCI 338 lab! The goal of today's lab is to get you a little more comfortable doing "configuration things," including working on the command line, configuring your command line environment, and working with command line code editors. You will complete the following tasks:
1. [Set-Up](#setup)
1. [VS Code Exercises](#vscode)
1. [Command Line Exercises](#command-line)
1. [OS Environment Exercises](#dot-files)
1. [Vim / Emacs Exercises](#vim-emacs)

**I have curated a list of useful resources on the [course resources page](../resources/).** Please see the "Command Line" and "Code Editors" sections:

{:#setup}
## Part 1. Set-Up
1. Install [VS Code](https://code.visualstudio.com/download) if it isn't already installed on your machine.
1. **If you are a Windows user,** [follow these instructions to install WSL and a Linux distribution](/fall2025/resources/wsl) (Windows Subsystem for Linux). Once you're done, verify your installation by opening a WSL terminal and typing `pwd`.
    * Note: please read / watch the instructions for WSL carefully. If you skip steps, you will likely have to rebuild / reinstall your Linux distro, so going slower will save you time in the long run.
1. Create a directory called `csci338`
    * If you are a windows user, you will create that directory within your ***home directory within your WSL instance.*** (e.g., `/Users/your_username`).
    * If you are a Mac user, you can create your `csci338` directory anywhere except for in your Downloads directory.


{:#vscode}
## Part 2. VS Code Exercises

### 2.1. Install VS Code and Extensions
Please install the following VS Code Extensions:
* Live Server (by Ritwick Dey)
* Prettier (by Prettier should have the blue "verified" badge)
* Prettier ESLint (by Rebecca Vest)

To install VS Code Extensions:
* From within VS Code, open the extensions window by clicking the extensions icon (looks like 4 squares on the gray, left-hand bar).
* Search for the extension name using the search textbox.
* When you find the extension, install it.

### 2.2. Configuration Tasks

#### Configuring Prettier
Configure "Format on Save" using Prettier by modifying `settings.json` file (a configuration file used to customize your VS Code Editor). To find `settings.json`, type Shift + CMD + P (MacOS) or Shift + CTRL + P (Windows) and then type `settings.json` in the search textbox that appears. Then, add the following code to `settings.json` within the curly braces. Note that in JSON, each key-value pair must be separated by a comma or else there will be syntax errors:

```json
"editor.formatOnSave": true,
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

You can read more about configuring "Format on Save" using Prettier [here](https://www.robinwieruch.de/how-to-use-prettier-vscode/), but this blog has a typo (`"editor.formatOnSave": true,` should have a trailing comma).

When you're done, test that the "format on save" functionality works by creating a `test.js` JavaScript file with following code:

```js
function foo(a, b) {const c=a+b; const d = c**2; return c+d;}
```

When you save the file, it should be autoformatted as follows:

```js
function foo(a, b) {
    const c = a + b;
    const d = c ** 2;
    return c + d;
}
```

Before Moving On, Verify that VS Code autoformats when you save.


{:#command-line}
## Part 3. Complete the Command Line Exercises
Please complete the following command line exercises with the help of the [Command Line Reference](../resources/command-line) that has been compiled for you. Feel free to collaborate with your classmates!

### 3.1 Open a Terminal
* If you are a Mac user, open the Terminal program
* If you are a Windows user, open WSL

### 3.2. Navigation
1. Figure out which directory you're in (use `pwd`)
    * Windows users: if you type `explorer.exe` from within WSL, it should open a Windows Explorer window to show you where your WSL files are located.
1. Navigate to the folder where you plan to save your coursework (use `cd`). <br>**Pro-tips**:
    * If any of your folder names have spaces, you'll have to surround the path with quotes
    * Use the tab key to autocomplete the path
    * Use the up and down keys to revive old commands
    * Use the `history` command to see the commands you've issued in the past

### 3.3. Create
1. Navigate to the `csci338` you made in Part 1 on the Terminal.
1. Create a directory called `lab01` within `csci338` (use `mkdir`)
1. Navigate into the `lab01` directory you just made.
1. Create a new file called `index.html` (use `touch`)
1. Create another new file called `style.css` (use `touch`)
1. Copy the Google homepage locally as follows: `curl https://www.google.com > google-home.html`

If you did everything correctly, you should have a directory structure that looks like this:

```bash
csci338
    ├── google-home.html
    ├── index.html
    └── style.css
```

### 3.4. List
1. Verify that the two new files exist in your current directory (use `ls`)
1. List all of the files and folders in your home (use `ls ~`)
1. List all of the files and folders on your home directory including hidden files (use `ls -la`)
1. List all of the files and folders in your home recursively, Try: 
    * `tree ~ -La 1`
    * `tree ~ -La 2`
    * `tree ~`

    If `tree` is not installed, see if you can figure out how to install it. On WSL:

    ```
    sudo apt-get update
    sudo apt-get install tree
    ```

    On Mac:

    ```
    brew install tree
    ```

           

### 3.5. Read
1. Read the contents of the `google-home.html` file you just created (use `cat`)
1. Inspect the file using some of the other read commands (e.g., `less`, `head`, `tail`, open wc).
    * **Pro-tip**: For `less`, `head`, and `tail`, use the space bar to scroll down, and "q" to quit

### 3.6. Write
1. Append the sentence "Hello World" to the contents of the `index.html` file (`echo "Hello World" >> index.html`).
1. Do it again.
1. Read the contents of `index.html` (use `cat`)
1. Now replace the contents of `index.html` with "Goodbye" (`echo "Goodbye" > index.html`)
1. Read the contents of `index.html` (use `cat`)
1. You can also use the `>>` and `>` operators to direct the output of the terminal to a non-existant file: `echo 'Yo yo' > new.txt`
1. Read 'new.txt' (use cat)
1. Now remove it (rm new.txt)
1. Make sure you understand the difference between `>>` and `>`?

### 3.7. Move & Copy
1. Copy a directory and all subdirectories (try: `cp -r my_folder copy_of_my_folder`)
1. Copy a file (try: `cp foo.txt bar.txt`)
1. Rename a file (try: `mv bar.txt bar1.txt`)
1. Move a file to a parent directory (try `mv bar.txt ../.`)

### 3.8. Search
Use grep to search for files for strings / text...
1. To find the word "Goodbye" in your current directory or any descendents (try: `grep "Goodbye" ./ -r`)
1. To find the word "goodbye" -- case insensitive -- in your current directory or any descendents (try: `grep "goodbye" ./ -ri`)
1. To find the word "goodbye" -- case insensitive -- anywhere in your home directory or its descendents (try: `grep "goodbye" ~ -ri`)

### 3.9. Make a bash script
You can also combine multiple commands into a bash script (use the `.sh` extension). Let's make a bash script that sets up a basic web app in your current directory. Try the following:
* Create a script called `start-web-prj.sh`
* Add the following lines of code to the script:

```bash
#!/bin/bash

# Prompt the user for the folder name
read -p "Enter the folder name: " DIR_NAME

# 1. Create a new directory if it doesn't already exist
if [ -d "$DIR_NAME" ]; then
    echo "Directory '$DIR_NAME' already exists. Exiting."
    exit 1
else
    mkdir "$DIR_NAME"
    echo "Directory '$DIR_NAME' created."
fi

# 2. Navigate into it
cd "$DIR_NAME" || { echo "Failed to navigate into $DIR_NAME. Exiting."; exit 1; }

# 3. Create a new starter index.html file
echo '''
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css" />
    <title>Hello World</title>
</head>

<body>
    <h1>Hello World</h1>
    <p>Your starter file.</p>
</body>

</html>
''' > index.html
echo "index.html created."

# 4. Create a new starter styles.css file
echo '''
body * {
    box-sizing: border-box;
}
body {
    font-family: Arial, sans-serif;
}
''' > styles.css

echo "styles.css created."

# 5. Navigate back to the original directory
cd ..

# 6. Optional: Open the index.html file in a web browser
#    Try one of these commands:

# wslview "$DIR_NAME/index.html"   # WSL
# open "$DIR_NAME/index.html"  # macOS
```

When you're done, execute the script as follows:

`bash ./start-web-prj.sh`

Take a look at the new `src` folder (and nested files) that were created by typing: `tree .`

Now, open the HTML file you just made in a new browser by typing one of the following commands from the command line:

* Mac Users: `open my_new_folder/index.html`
* WSL Users: `wslview my_new_folder/index.html`
* Linux Users: `xdg-open my_new_folder/index.html`

And finally, open the folder you just made in VS Code:

`code .`

If that didn't work and you're on a Mac, see <a href="https://stackoverflow.com/questions/29955500/code-is-not-working-in-on-the-command-line-for-visual-studio-code-on-os-x-ma" target="_blank">this Stack Overflow post</a>.


> ### Before Moving On, Verify That...
>
>{:.checkbox-list}
> * You have practiced working with the following commands:
>    * cat (read)
>    * cd (change directories)
>    * tree (list files and subdirectories)
>    * touch (create new empty file)
>    * ls (list files)
>    * rm (delete a file)
>    * mv (rename a file)
>    * cp (copy a file)
>    * history (view recent bash commands)
>    * `>>` (append operator)
>    * `>` (overwrite operator)
>    * grep (search)
>    * running a bash script: `bash ./start-web-prj.sh`
>    {:.compact}
>
> * You can open VS Code from the command line
> * Your file structure looks like the file structure below:

```bash
csci338
└── lab01
    ├── google-home.html
    ├── index.html
    ├── my_new_folder
    │   ├── index.html
    │   └── style.css
    ├── start-web-prj.sh
    └── style.css
```

{:#dot-files}
## Part 4. OS Environment Exercises
In Linux-style operating systems, you can create shortcuts, aliases, and customizations by editing your `.zshrc` file in your home directory. From your command line, please navigate to your home directory and try making an alias to your `csci338` directory:
* To learn more about how to create an alies, see this resource: <a href="https://medium.com/@email2smohanty/the-significance-of-bashrc-or-zshrc-configuration-file-49fa31c5da17" target="_blank">The Significance of .bashrc or .zshrc Configuration File</a>
* If you did it correctly, when you type: `338` on the command line, you should be put into the `csci338` directory. 
* Hint: Here is what Sarah's `.zshrc` entry looks like:<br>`alias 338='cd /Users/svanwart/unca/csci338'`

Before moving on, verify that when you type `338` on the command line, it automatically jumps you to the `csci338` directory

{:#vim-emacs}
## Part 5. Vim / Emacs Exercises

Using either [vim](../resources/vim) or [emacs](../resources/emacs):

1. Open a file from the command line
2. Edit it
3. Save it
4. Exit the editor

## What do I turn in?
Under Lab 1, paste a dump of all of the relevant command line history commands that you used today (type `history` on the command line, copy it, and paste it into the Moodle).

### What to study / have done after completing this lab...
* If you are a Windows user, make sure your WSL is installed and configured
* Make sure your VS code editor is set up.
* Make sure you know some basic shell commands, and specifically how to navigate, search, create, delete, copy, read, and move files. Here are some sample quiz / exam questions: <a href="https://docs.google.com/document/d/1cBdqsCEobdzdNiGrISZip3Xm45bs0VgfWyM9rJM7M8A/edit?usp=sharing" target="_blank">Sample command line quiz questions</a>
* Make sure you know how to open, edit, save, and exit either vim or emacs.
