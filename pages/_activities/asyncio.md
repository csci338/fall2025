---
layout: two-column
title: AsyncIO Activity
type: activity
---

## Objective
Python’s asyncio library enables concurrent execution, which is important when you're waiting around for things to finish. To explore this idea, let's simulate a café where multiple customers place orders, and the barista prepares drinks concurrently.

{:.info}
> ## Scenario
> The café has one barista who prepares drinks. Without asyncio, the barista can only handle one order at a time:
> * Takes Alice’s order → Makes Alice’s Latte → Hands it to Alice.
> * Takes Bob’s order → Makes Bob’s Espresso → Hands it to Bob.
> * Takes Charlie’s order → Makes Charlie’s Cappuccino → Hands it to Charlie.
>
> In other words, they can only start making the next drink after finishing the current one. However, with asyncio, the barista can start preparing drinks as soon as the order is placed.

## Get Situated / Pull Down the Files
**On GitHub:** sync your fork of the **class-exercises-fall2025** repo on GitHub.

**On your local machine:**
* Navigate to your `csci338/class-exercises-fall2025` directory
* Check that everything is committed and pushed to your remote branch (some command reminders below):<br><br>
    ```
    git branch
    git status
    git add .
    git commit -m "Message describing your changes"
    ```
* Checkout `main`
* Pull down the latest code (`git pull`). You should see a new `asyncio-activity` folder within your local `class-exercises-fall2025` folder.
* Create a new branch from main called **asyncio-activity-b**: `git checkout -b asyncio-activity-b`


##  Synchronous Version (no asyncio)
Within the `asyncio-activity` directory you just made, add the following code to the `cafe_sync.py` file (I recommend that you do this within VS code, but it's up to you):

Paste in the following code:

```py
import time

def prepare_drink(customer, drink):
    print(f"{customer} ordered a {drink}.")
    time.sleep(2)  # Simulates time to make the drink
    print(f"{customer}'s {drink} is ready!")

def main():
    customers = [("Alice", "Latte"), ("Bob", "Espresso"), ("Charlie", "Cappuccino")]
    
    print("Starting orders...\n")
    for customer, drink in customers:
        prepare_drink(customer, drink)

    print("\nAll orders completed!")

if __name__ == "__main__":
    main()
```

Then run it. Note that each drink takes 2 seconds. Hence, the total time is ~6 seconds (3 drinks × 2 seconds)

##  Synchronous Version (with asyncio)
Now add the following code into `cafe_async.py`:

```python
import asyncio

async def prepare_drink(customer, drink):
    print(f"{customer} ordered a {drink}.")
    await asyncio.sleep(2)  # Simulates time to make the drink
    print(f"{customer}'s {drink} is ready!")

async def main():
    customers = [("Alice", "Latte"), ("Bob", "Espresso"), ("Charlie", "Cappuccino")]
    
    print("Starting orders...\n")
    tasks = [prepare_drink(customer, drink) for customer, drink in customers]
    await asyncio.gather(*tasks)
    
    print("\nAll orders completed!")

if __name__ == "__main__":
    asyncio.run(main())
```

Run this file, and note:

* All drinks are prepared concurrently.
* The total time = ~2 seconds (instead of ~6).


## Answer the following questions in answers.md

* What was the key difference between the two versions?
* When would you want to use something like this?
* In the **asynchronous** version of the code, what do the  following commands do (feel free to use GenAI, but articulate the results in your own words)?
    * `asyncio.run(main())`
    * `await asyncio.gather(*tasks)`

