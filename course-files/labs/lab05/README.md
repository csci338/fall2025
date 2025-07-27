# Lab 5 Setup

## Environment Setup

To run this in its current form, you'll need to make sure you have
python 3.8 or greater and pip installed on your system. There is plenty of
documentation online on how to do that for your specific
environment. Once your setup is complete, you should be able to do
something like this and see roughly the same output:

```
$ python --version
$ pip --version
```

If you're on a Mac, you may need to type:
```
$ python3 --version
$ pip3 --version
```

Once you have those installed, you'll need to install `poetry`
globally. If everything is working you should be able to do this as
follows:

```
$ pip install poetry   # might need to type pip3 install poetry on a mac
```

And once it's correctly installed you should be able to do something
like this:

```
$ poetry --version
Poetry (version 1.6.1)
```

## Dev Setup

Now you're ready to install dependencies. Inside the `src` directory,
you'll use `poetry` to do that.

```
$ poetry install
```

### To Access the Poetry Shell
To access the poetry shell so that you can run commands with the correct python modules installed, do this:

```
$ poetry shell
```

### To Run the Web Server
To run the development server:

```
$ poetry run uvicorn server:app --reload
```

Open your browser and go to localhost:8000 and you should see the app
running. Uvicorn will reload on changes to the server.py file, so you
should be able to make changes and then just reload the page.

### To destroy a poetry dev environment
If you need to delete and recreate a poetry environment, navigate to the folder wher eyour `pyproject.toml` is located and issue the following command:

```
$ poetry env remove python
$ # poetry env remove py          # might need to try this on Windows
$ # poetry env remove python3     # might need to try this on Mac
```