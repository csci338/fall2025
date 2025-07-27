---
layout: assignment-two-column
title: AsyncIO
type: lab
abbreviation: Lab 7
draft: 1
points: 6
num: 7
start_date: 2025-03-20
due_date: 2025-03-26
---

## Set Up
Before you begin, get the latest code from <a href="https://github.com/csci338/class-exercises-fall2025" target="_blank">class-exercises-fall2025</a>. 
* If you are a Windows user, you will do this lab (and all subsequent work in this class) using the WSL terminal.

**On GitHub:**
* Sync the latest changes from the class version of `class-exercises-fall2025` to your copy of the repo on GitHub.

**On your local computer:**
* Make sure that all of your changes from the last lab are staged and committed.
* Checkout your main branch: `git checkout main`
* Pull down the latest changes: `git pull`
    * If you did it correctly, you will notice that a new `lab07` folder has been created.
* Create a new branch called lab07-b: `git checkout -b lab07-b`
* Verify that you're on your new branch: `git branch`

## Docker Stuff
Once you've created your `lab07-b` branch, open the `lab07` folder in your code editor and take a look at the `Dockerfile` and `docker-compose.yml`. You will notice that we're using many of the same techniques that we have been using in previous labs and in project 1, namely:
* Configuring a working directory (`lab07`) that can be shared with the container 
* Using a `pyproject.toml` file to define the dependencies
* Ensuring that the bash terminal is active and running when the containers starts

One new thing we're also doing this time is automatically installing all of our poetry dependencies when the container starts.


Now, let's build and start the container in detached mode, and run the crawler:

```bash
# Build and start the container in detached mode
docker compose up -d  

# Hop onto the container's bash terminal:
docker exec -it lab07-crawler-1 bash

# run the crawler:
poetry run python crawler.py
```


When you successfully run the program, you'll see output that looks something like this.

```
visiting https://new.cs.unca.edu
crawlSync took 0.369 seconds to complete.
```

Our goal is to do this asynchronously to reduce the amount of time it
takes it to run. We'll complete a couple tasks before this to get the
hang of the code.

As usual, you will answer the questions to this lab in the `answers.md` file (within the `lab07` folder).

{:.info}
> ## Goal of this lab: letting Sarah know about HTTP links
> HTTP is essentially deprectated on the web in favor of HTTPS. In
> general, we shouldn't be linking to non-HTTPS addresses. When running
> the crawler code, you'll see a lot of lines that look something like
> this:

```
WARNING: found non-encrypted link http://catalog.unca.edu/
```

We want to give Sarah a list of these links so she can correct
them. It's not enough to know the link itself, though. To make her job
easier, let's give here a list with the page, and then the associated
http links found on the page. Modify the code to produce the list. For
example, it might look something like this:

```
https://new.cs.unca.edu
  http://www.ashevillechamber.org/economic-development
  http://catalog.unca.edu/

https://new.unca.edu/student-life/
  http://catalog.unca.edu/
```

Write a new function that generates this list programatically and call
it. Put the output in the `answers.md` file.

## Adding Parent

Each `UrlToCrawl` object has a "url" and a "depth" associated with
it. Let's create another property, called "parent." This will track
the "parent" link, or how we got to the current link.

Add this property to the class, and populate it via the
constructor. Then modify the code so that value is tracked and
returned as part of the `__str__` method.

## Getting Ready for Async

We'll need to import a new dependency to do asynchronous HTTPS
requests. We'll use the `aiohttp` library. Go ahead and install that
via poetry and then add it to your imports at the top. (You've created
a `check` script and are running it after each change to confirm your
imports are sorted, right?)

Here's a basic function to get you started. In your `Crawler` class,
we'll add a function called `_fetchAsync`.

```python
    async def _fetchAsync(self, url):
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                return await resp.text()
```

This will allow you to do a non-blocking HTTPS request. Go ahead and
test it out with some sample code in your `main` function. Maybe
something like this.

```python
    result = await Crawler("https://new.cs.unca.edu")._fetchAsync(
        "https://new.cs.unca.edu"
    )
    print(result)
```

Make sure this is working correctly.


## Visiting in Batches

Now we want to create a new function called `visitAsync` that is the
same as `visitSync` but fires off requests in parallel. It should work
roughly like this.


```python
    results = await Crawler("https://new.cs.unca.edu").visitAsync(
        ["https://new.cs.unca.edu", "https://www.example.com"]
    )

    print([str(url_to_crawl) for url_to_crawl in results])
```

This should print out the full UrlToCrawl objects that are returned by
the method.

Like the synchronous version, this should check to see if the url has
already been visited, and only visit the url if it has not. Similarly,
it should mark any newly visited urls as visited.

As discussed in class, we should use `asyncio.gather` for this. One
easy approach to this is to create a list of coroutines, perhaps like
this:

```
coros = [ self._fetchAsync(url) for url in urls_to_visit ]
bodies = await asyncio.gather(*coros)
```

Now we'll need to run `_extractLinks` on all of the resulting bodies.

## Async Crawling

Once we're happy with the `visitAsync` method, we can move on to the
`crawlAsync` method. In addition to accepting a `max_depth` argument,
the function should allow for a `batch_size` to be set as part of the
calling arguments. It should default to 5.

The code itself, should either pull out the next `batch_size` elements
from the queue, or all the remaining elements if there is not enough
to fill the batch. Then you'll calls `_visitAsync` on those urls.

## Testing

How can you test this to confirm that the results of the synchrounous
call and the asynchronous call are the same? Come up with a solution,
even if it's a partially manual solution. Describe your approach and
add any supporting information in your `answers.md` file.

You should be able to time the resulting function in the same way we
timed the original synchronous one.

```python
    start_time = time.time()
    Crawler("https://new.cs.unca.edu").crawlAsync(max_depth=2, batch_size=5)
    elapsed_time = time.time() - start_time
    print(f"crawlAsync took {elapsed_time:.3f} seconds to complete.")
```

Experiment with the batch size and see how it impacts the
results. Show the results in your `answers.md` file.

## Submitting

Create a pull request against the main Software Engineering repository
and mention us in a comment.

## Tips

### Batch Your Requests

This is the code that crawls synchronously.

```python
        while len(self._queue) > 0 and self._queue[0].depth < max_depth:
            link_to_visit = self._queue.popleft()
            next_links = self.visitSync(link_to_visit)
            self._queue.extend(next_links)

            if len(self._queue) > 0:
                print(f"next: {str(self._queue[0])}")
```

We'll do something similar in the async version, but we'll do the
requests in batches. To build the batches, you can grab out a slice of
the array in Python.

A slice is pretty straight-forward. You just specify the starting
index in the array, the ending index in the array, or both. Here's an
example from an interactive session I had with the Python REPL. You
can experiment by simply running the `python` (or the `python3`)
command from the command line.

```python
>>> l = [1,2,3,4,5,6,7]
>>> l[:5]
[1, 2, 3, 4, 5]
>>> l[3:]
[4, 5, 6, 7]
>>> l[2:5]
[3, 4, 5]
>>>l[2:20]
[3, 4, 5, 6, 7]
```

Note that the last slice requests indices beyond the end of the list,
but it only returns up to the end of the list. This is helpful.

How can we use this to build batches? Maybe something like this.

```python
        while len(self._queue) > 0 and self._queue[0].depth < max_depth:
            # for each iteration, we'll build a batch instead of doing
            # a single request

            # get a slice of length at most batch size
            links_to_visit = list(self._queue)[0:batch_size]

            # pop those links off the front of the queue
            for i in range(len(links_to_visit)) self._queue.popleft()

            # now we visit those urls
            next_links = await visitAsync(links_to_visit)
```


### Use Python's Spread Operator

This is a brief explanation of the code above that looks like this.

```python
coros = [ self._fetchAsync(url) for url in urls_to_visit ]
bodies = await asyncio.gather(*coros)
```

You'll ultimately want to create an array of coroutines, and then send
that into `asyncio.gather`. Unfortunately, the API for `gather` does
not accept an array. But you can convert an array of elements into
individual arguments by using Python's spread operator, which is an
`*`.

Consider this method.

```python
def add(a, b):
    return a + b
```

Now suppose you have an array of two numbers.

```
args = [1, 2]
```

You can call add with those args using the spread operator.

```
print(add(*args))
# This will print 3
```