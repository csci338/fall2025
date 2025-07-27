/* 
PLEASE READ CAREFULLY

1. BACKGROUND / SET-UP
----------------------------------------------------------
These tests use the Mocha testing framework.
Mocha offers a set of functions and objects that
organize your tests and make them easier to define 
and write. 

To install mocha, issue the following command on the CLI 
within the "javascript_rps" directory (directory that contains 
the package.json file):

   npm install

This command will read package.json and install all of the dependencies.

2. YOUR TASK
----------------------------------------------------------
You will rewrite the "vanilla" JavaScript tests that 
you just wrote so that they use the Mocha helper
functions. Instead of your functions returning true or 
false, use Node's built-in assert function instead. 
Follow the pattern you see below.

3. RUNNING THE TESTS
----------------------------------------------------------
To run the tests, you must do two things:
1. Modify package.json
    in the scripts section, make sure the test value is set to "mocha":
    
    "scripts": {
        "test": "mocha"
    }

(instead of "node run-tests-vanilla.js").

2. Issue the following command on the CLI from within the 
"javascript_rps" directory:
    
    npm test

Good luck!

*/

import { helloWorld, rps } from "../your-task.js";
import assert from "assert";

describe("Hello World Tests", function () {
    it('returns "Hello world!"', function () {
        assert.equal(helloWorld(), "Hello world!");
    });
});

describe("Rock Paper Scissors Tests", function () {
    it("knows that paper beats rock", function () {
        assert.equal(rps("rock", "paper"), "Paper wins!");
        assert.equal(rps("paper", "rock"), "Paper wins!");
    });

    // add your tests here
    // (but still within this describe function)
});
