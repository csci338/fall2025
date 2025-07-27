import { helloWorld, rps } from "./your-task.js";
import { assertPrint, runAllTests } from "./helpers.js";

function testHelloWorld() {
    return assertPrint(
        helloWorld() === "Hello world!",
        'it returns "Hello world!"'
    );
}

function testPaperBeatsRock() {
    return assertPrint(
        rps("rock", "paper") === "Paper wins!",
        "paper beats rock"
    );
}

function testPaperBeatsRockCommutes() {
    return assertPrint(
        rps("paper", "rock") === "Paper wins!",
        "paper beats rock (flipped)"
    );
}

// add more test functions here to exhaustively test your rps function...

// Once you have defined each test function, don't forget to
// add the function definition to the test harness:
runAllTests([testHelloWorld, testPaperBeatsRock, testPaperBeatsRockCommutes]);
