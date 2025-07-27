/**
 *
 * @param {boolean} condition - expression that represents the assertion.
 * @param {string} message - message that prints to the screen when the assertion is run.
 * @returns {boolean} - indicating whether the assertion passed.
 */
export function assertPrint(condition, message) {
    if (condition) {
        console.log("✅ Success:", message);
        return true;
    } else {
        console.log("❌ Failure:", message);
        return false;
    }
}

/**
 *
 * @param {Array} allTests - array of test function definitions. Each function definition should return true if the test passes and false otherwise.
 * @description Runs all of the tests in the array and prints a summary
 * of how many of the tests passed.
 * @example
 * function test1() {
 *    return true; // some test condition
 * }
 * function test2() {
 *    return false; // some test condition
 * }
 * runAllTests([test1, test2]);
 */
export function runAllTests(allTests) {
    console.log("----------------------------------------------------");
    let successes = 0;
    allTests.forEach((test) => {
        successes += test();
    });

    console.log("----------------------------------------------------");
    if (successes == allTests.length) {
        console.log(`\n🎉 Horray! All ${successes} tests pass!\n`);
    } else {
        console.error(
            "\n😬 Only ",
            successes,
            "out of",
            allTests.length,
            "tests passed.\n"
        );
    }
}
