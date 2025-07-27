---
layout: two-column
title: "Windows Subsystem for Linux (WSL)"
parent: resources
type: resource
category: "Code Editors"
---

The **Windows Subsystem for Linux** (WSL) lets Windows users run a GNU/Linux environment -- including most command-line tools, utilities, and applications -- directly on Windows, unmodified, without the overhead of a traditional virtual machine or dualboot setup.

## Overview & Installation Instructions
* <a href="https://www.youtube.com/watch?v=cJWhyycbPyA" target="_blank">Video Tutorial for Configuring WSL</a> (highly recommended -- short and to the point)
* <a href="https://learn.microsoft.com/en-us/windows/wsl/about" target="_blank">About</a>
* <a href="https://learn.microsoft.com/en-us/windows/wsl/basic-commands" target="_blank">Installation / Configuration</a>

## Basic Installation Workflow
1. From powershell, install wsl:<br> `wsl --install`
    * This should install WSL and the default Ubuntu distribution of Linux.
    * It should prompt you to create a username and a password. **Write your username and password down** so you don't forget it.
2. Verify that a Linux distribution has been installed by typing:<br> `wsl --list --verbose`
3. Now you can run bash commands!
4. To shutdown your wsl instance, just type:<br>`wsl --shutdown`


