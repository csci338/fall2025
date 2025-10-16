---
layout: two-column
title: AsyncIO Activity
type: activity
---

## Objective
Python’s asyncio library enables concurrent execution, which is important when you're waiting around for things to finish. To explore this idea, let's simulate a café where multiple customers place orders, and the barista prepares drinks concurrently.

{:.info}
> ### Scenario
> The café has one barista who prepares drinks. Without asyncio, the barista can only handle one order at a time:
> * Takes Alice’s order → Makes Alice’s Latte → Hands it to Alice.
> * Takes Bob’s order → Makes Bob’s Espresso → Hands it to Bob.
> * Takes Charlie’s order → Makes Charlie’s Cappuccino → Hands it to Charlie.
>
> In other words, they can only start making the next drink after finishing the current one. However, with asyncio, the barista can start preparing drinks as soon as the order is placed.

## 1. Get Situated / Pull Down the Files
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


## 2. Run Processes Demos

### Race Condition Script
First, run the `processes_race_condition.py` script on your computer using python (make sure you're in the right directory).

    > The counter should have been 2,000, but it wasn't! Why?!
    >
    > When multiple processes or threads access shared data simultaneously without proper synchronization, they can interfere with each other in unexpected ways. This is called a race condition:
    > * Process A reads the current value (e.g., counter = 5)
    > * Process B reads the same value (counter = 5)
    > * Process A increments and writes back (counter = 6)
    > * Process B increments and writes back (counter = 6) ❌
    >
    > Result: Both processes thought they incremented the counter, but it only increased by 1 instead of 2!
    {:.info}

### Synchronized Script
1. Next, run the `processes_without_race_condition.py` script on your computer using python (make sure you're in the right directory).
    * The counter should actually be 2,000 now. Why? Note the use of locks.

##  3. Asyncio and Coroutines

### Synchronous Version (no asyncio)
Within the `asyncio-activity` directory you just made, add the following code to the `cafe_sync.py` file (I recommend that you do this within VS code, but it's up to you):

Paste in the following code:

```py
# paste code here
import time

def prepare_drink(customer, drink):
    print(f"{customer} ordered a {drink}.")
    time.sleep(2)  # Simulates time to make the drink
    print(f"{customer}'s {drink} is ready!")

def main():
    customers = [("Alice", "Latte"), ("Bob", "Espresso"), ("Charlie", "Cappuccino")]
    
    print("Starting orders...\n")
    
    # The for loop creates an array of coroutines – but does not invoke the functions yet:
    # After the for loop runs, the array looks something like this:
    for customer, drink in customers:
        prepare_drink(customer, drink)

    # When this line is hit, all drink preparations are completed
    print("\nAll orders completed!")

if __name__ == "__main__":
    main()
```

Then run it. Note that each drink takes 2 seconds. Hence, the total time is ~6 seconds (3 drinks × 2 seconds)

###  Synchronous Version (with asyncio)
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
    
    # The for loop creates an array of coroutines – but does not invoke the functions yet:
    # After the for loop runs, the array looks something like this:
    # [<coroutine object prepare_drink(...)>, <coroutine object prepare_drink(...)>, ...]
    tasks = []
    for customer, drink in customers:
        tasks.append(prepare_drink(customer, drink))
    
    # This line tells asyncio to schedule all those coroutines to run concurrently, 
    # and then wait until all of them complete.
    await asyncio.gather(*tasks)

    # When this line is hit, all drink preparations are completed
    print("\nAll orders completed!")

if __name__ == "__main__":
    asyncio.run(main())
```

Run this file, and note:

* All drinks are prepared concurrently.
* The total time = ~2 seconds (instead of ~6).


## 4. Answer the following questions
Optional - Can do for extra credit. Answer the questions in `answers.md` and make a pull request.
* What was the key difference between the two versions?
* When would you want to use something like this?
* In the **asynchronous** version of the code, what do the  following commands do (feel free to use GenAI, but articulate the results in your own words)?
    * `asyncio.run(main())`
    * `await asyncio.gather(*tasks)`

