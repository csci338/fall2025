
## Semmy Notes
TDD: All you need is an assert. Defer framework decisions as long as possible (reduces risk).

Before you do the framework, let’s get the basics.

1. Assertions first…
  * Set up state
  * Run code
  * Check the output and ensure it works
2. Why would you want to use a testing framework (like Mocha)?


## Learning Goals
### JavaScript
* Helping students get acquainted with JavaScript
* Setting up npm, mocha, etc.

### TDD
* Write a failing test first.
* Then implement the feature that fixes the failing test.
* Think about the kinds of things you want to test for (missing data, wrong data types, data out of range).

### Software Construction
* Reading a requirements doc and figuring out how to translate to an implementation plan.
* Introduce functional programming
* Introduce the idea of good API design. What's the right level of abstraction?

## Questions
* Is Mocha the right testing framework to use?

## Ideas for a "Toy Context"
* Make a JavaScript wrapper for querying and displaying artists, tracks, and albums.
    * Part I: No server queries. Just make the widgets to display the information + unit tests.
    * Part II: Do the fetch calls and then display the widget + unit & integration tests.

## Readings
1. Installing Mocha: [https://mochajs.org/#installation](https://mochajs.org/#installation)
1. Unit Testing Tutorial (TODO)
1. Integration Testing Tutorial: [https://www.digitalocean.com/community/tutorials/how-to-test-a-node-js-module-with-mocha-and-assert](https://www.digitalocean.com/community/tutorials/how-to-test-a-node-js-module-with-mocha-and-assert)
1. JavaScript primer: 
    * Language Features
    * Modules
    * Debugging