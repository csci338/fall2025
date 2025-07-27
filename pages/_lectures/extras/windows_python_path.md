### {{num}}. If you have a Windows machine
If you have a Windows Machine, there are (at least) two ways to ensure that python3 and PIP work when you run them from the command prompt. Note: this is an either -or- thing (e.g. you shouldn’t have to do Option 2 unless Option 1 doesn’t work).

#### Option 1: Run the Installer Again
In our opinion, the easiest way to get python to work on your command prompt is to run the Python3 installer again and make sure that the checkbox at the very bottom that says Add Python 3.x to PATH is checked:

<img class="large frame" src="/fall2021/assets/images/lectures/01-command-prompt-windows-installer.png" />

#### Option 2: Go to System Preferences and Manually Add the PATH

To go this route, you will complete three steps:
##### Step 1
Search for Edit the System Environment Variables (see below):

<img class="medium frame" src="/fall2021/assets/images/lectures/02-environment-variables.png" />

##### Step 2
You will then click the Environment Variables button in the Control Panel:

<img class="small frame" src="/fall2021/assets/images/lectures/03-environment-variables.png" />

##### Step 3

Finally, you will add the \Scripts folder in their Python installation to their path (see 3rd screenshot). This looks different on everyone’s machine, so you will have to make sure that this PATH corresponds to your Python3 installation. This screenshot below is pertains to Cooper’s path (one of the course TAs), but yours will look different.

<img class="medium frame" src="/fall2021/assets/images/lectures/04-environment-variables.png" />

<!-- #### Option 3: 

One of the peer mentors suggested that you can also try running PIP by issuing this command at the command line:

```python
python3 -m pip NAME_OF_MODULE
``` -->
