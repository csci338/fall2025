---
layout: two-column
title: The Command Line
parent: resources
type: resource
category: "Code Editors"
---

## 10 reasons to know how to use the command line
1. You can SSH (Secure Shell) into any server in the world without installing special software / clients.
1. It allows you greater control over your system's functions (creating files and folders, changing permissions, running executables, creating shortcuts / symlinks).
1. Many advanced system functions don't have a GUI interface (or the GUI isn't any easier to use!).
1. It's faster (once you get the hang of it).
1. You can bundle system commands into scripts tailored to specific use cases (and configure when and how they run).
1. It allows you to easily stop and start services and processes (e.g., database servers, web servers, system tasks).
1. Most package managers (e.g., `npm`, `pip`, `gem`, `brew`, `apt-get`, `yum`) require them for tracking / organizing dependencies (which you need when building software).
1. Even if you use a GUI for git, you'll eventually have to use the command line for advanced features (and debugging).
1. Allows you to easily configure and replicate your operating system environment across different machines.
1. You'll need bash skills for your CS jobs (no matter what kind of shop you're in).


## Useful References
In this course, we will be using bash. Bash is a Unix shell and command language that runs natively on Mac, Linux, and Unix operating systems. If you are a Windows user, you will be using WSL (see below) to run a GNU/Linux environment.

### Using Linux Commands on Windows via WSL
If you are a Windows user, [please install WSL](wsl) in order to practice using the bash commands in a Linux environment. 

### Environment files
Environment files set environment variables on your operating system. This allows you to configure shortcuts and run scripts on startup. Here are some relevant resources for configuring these files:
* [Bash startup files loading order](https://medium.com/@rajsek/zsh-bash-startup-files-loading-order-bashrc-zshrc-etc-e30045652f2e)
* Sample `.zshrc` customizations you can make: Check out [Semmy's GitHub repo](https://github.com/semmypurewal/dotfiles/blob/master/zsh).

## Cheatsheet of Useful Bash Commands
The following commands are taken from [this bash cheat sheet](https://github.com/RehanSaeed/Bash-Cheat-Sheet) by [@RehanSaeed](https://github.com/RehanSaeed)


### Command History
```bash
history
```

### Navigating Directories

```bash
pwd                       # Print current directory path
ls                        # List directories
ls -a|--all               # List directories including hidden
ls -l                     # List directories in long form
ls -l -h|--human-readable # List directories in long form with human readable sizes
ls -t                     # List directories by modification time, newest first
cd foo                    # Go to foo sub-directory
cd                        # Go to home directory
cd ~                      # Go to home directory
cd -                      # Go to last directory
cd ..                     # Go up one directory
cd ../..                  # Go up two directories
cd foo/bar                # Go into the foo sub-directory, then go into the bar sub-directory
cd ../foo/bar             # Go up one directory, then into foo, then into bar
stat foo.txt              # List size, created and modified timestamps for a file
stat foo                  # List size, created and modified timestamps for a directory
tree                      # List directory and file tree
tree -a                   # List directory and file tree including hidden
tree -d                   # List directory tree
```

### Reading Files

```bash
cat foo.txt            # Print all contents
less foo.txt           # Print some contents at a time (g - go to top of file, SHIFT+g, go to bottom of file, /foo to search for 'foo')
head foo.txt           # Print top 10 lines of file
tail foo.txt           # Print bottom 10 lines of file
open foo.txt           # Open file in the default editor
wc foo.txt             # List number of lines words and characters in the file
```

### Creating Directories & Files

```bash
touch foo.txt                   # Create file or update existing files modified timestamp
touch foo.txt bar.txt           # Create multiple files
touch {foo,bar}.txt             # Create multiple files
touch test{1..3}                # Create test1, test2 and test3 files
touch test{a..c}                # Create testa, testb and testc files

mktemp                          # Create a temporary file

mkdir foo                        # Create a directory
mkdir foo bar                    # Create multiple directories
mkdir -p|--parents foo/bar       # Create nested directory
mkdir -p|--parents {foo,bar}/baz # Create multiple nested directories

mktemp -d|--directory            # Create a temporary directory
```

### Copying & Moving Files & Directories

```bash
cp -R|--recursive foo bar                               # Copy directory
mv foo ../.                                             # Moves a directory up one level
mv foo bar                                              # Renames a directory
cp foo.txt bar.txt                                      # Copy file
mv foo.txt bar.txt                                      # Move file
```

### Deleting Directories & Files

```bash
rmdir foo                        # Delete empty directory
rm -r|--recursive foo            # Delete directory including contents
rm -r|--recursive -f|--force foo # Delete directory including contents, ignore nonexistent files and never prompt

```bash
rm foo.txt                       # Delete file
rm -f|--force foo.txt            # Delete file, ignore nonexistent files and never prompt
```

### Standard Output, Standard Error and Standard Input

```bash
echo "foo" > bar.txt       # Overwrite file with content
echo "foo" >> bar.txt      # Append to file with content

ls exists 1> stdout.txt    # Redirect the standard output to a file
ls noexist 2> stderror.txt # Redirect the standard error output to a file
ls 2>&1 out.txt            # Redirect standard output and error to a file
ls > /dev/null             # Discard standard output and error

read foo                   # Read from standard input and write to the variable foo
```

### Finding Text within Files

```bash
grep 'foo' ./bar.txt                         # Search for 'foo' in file 'bar.txt'
grep 'foo' ./bar -r|--recursive              # Search for 'foo' in directory 'bar'
grep 'foo' ./bar -R|--dereference-recursive  # Search for 'foo' in directory 'bar' and follow symbolic links
grep 'foo' ./bar -l|--files-with-matches     # Show only files that match
grep 'foo' ./bar -L|--files-without-match    # Show only files that don't match
grep 'Foo' ./bar -i|--ignore-case            # Case insensitive search
grep 'foo' ./bar -x|--line-regexp            # Match the entire line
grep 'foo' ./bar -C|--context 1              # Add N line of context above and below each search result
grep 'foo' ./bar -v|--invert-match           # Show only lines that don't match
grep 'foo' ./bar -c|--count                  # Count the number lines that match
grep 'foo' ./bar -n|--line-number            # Add line numbers
grep 'foo' ./bar --colour                    # Add colour to output
```

### Finding Files

Find binary files for a command. The following uses the `wget` package as an example, but any binary file could be used (e.g., `ruby`, `python`, `bash`, `git`, `java`, etc.)

```bash
type wget                                  # Find the binary
which wget                                 # Find the binary
whereis wget                               # Find the binary, source, and manual page files
```


### Replace in Files

```bash
sed 's/fox/bear/g' foo.txt               # Replace fox with bear in foo.txt and output to console
sed 's/fox/bear/gi' foo.txt              # Replace fox (case insensitive) with bear in foo.txt and output to console
sed 's/red fox/blue bear/g' foo.txt      # Replace red with blue and fox with bear in foo.txt and output to console
sed 's/fox/bear/g' foo.txt > bar.txt     # Replace fox with bear in foo.txt and save in bar.txt
sed 's/fox/bear/g' foo.txt -i|--in-place # Replace fox with bear and overwrite foo.txt
```

### Symbolic Links

```bash
ln -s|--symbolic foo bar            # Create a link 'bar' to the 'foo' folder
ln -s|--symbolic -f|--force foo bar # Overwrite an existing symbolic link 'bar'
ls -l                               # Show where symbolic links are pointing
```

### File Permissions

| # | Permission              | rwx | Binary |
| - | -                       | -   | -      |
| 7 | read, write and execute | rwx | 111    |
| 6 | read and write          | rw- | 110    |
| 5 | read and execute        | r-x | 101    |
| 4 | read only               | r-- | 100    |
| 3 | write and execute       | -wx | 011    |
| 2 | write only              | -w- | 010    |
| 1 | execute only            | --x | 001    |
| 0 | none                    | --- | 000    |

For a directory, execute means you can enter a directory.

| User | Group | Others | Description                                                                                          |
| -    | -     | -      | -                                                                                                    |
| 6    | 4     | 4      | User can read and write, everyone else can read (Default file permissions)                           |
| 7    | 5     | 5      | User can read, write and execute, everyone else can read and execute (Default directory permissions) |

- u - User
- g - Group
- o - Others
- a - All of the above

```bash
ls -l /foo.sh            # List file permissions
chmod +100 foo.sh        # Add 1 to the user permission
chmod -100 foo.sh        # Subtract 1 from the user permission
chmod u+x foo.sh         # Give the user execute permission
chmod g+x foo.sh         # Give the group execute permission
chmod u-x,g-x foo.sh     # Take away the user and group execute permission
chmod u+x,g+x,o+x foo.sh # Give everybody execute permission
chmod a+x foo.sh         # Give everybody execute permission
chmod +x foo.sh          # Give everybody execute permission
```


## What is sudo?
<img src="https://imgs.xkcd.com/comics/sandwich.png" />

Sudo is a command line utility that provides a way to temporarily grant users or user groups privileged access to system resources so that they can run commands that they cannot run under their regular accounts. Only accounts listed in the system's "sudoers" file are granted privileged access. On Macs and PCs, accounts that have administrator privileges are typically also added to the sudoers file.

* Read more [here](https://www.techtarget.com/searchsecurity/definition/sudo-superuser-do).