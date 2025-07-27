export function helloWorld() {
    return "Hello world!";
}

/*
Implement the following logic and return the corresponding message (exactly as it is shown below):
* If one hand is rock and the other is paper, return the string "Paper wins!"
* If one hand is paper and the other is scissors, return the string "Scissors wins!"
* If one hand is scissors and the other is rock, return the string "Rock wins!"
* If both hands are the same (and have valid arguments), return "Tie!"
* If anything other than rock, paper, or scissors are passed in, return "Invalid"
*/
export function rps(hand1, hand2) {
    // finish this code:
    if (hand1 === "rock" && hand2 === "paper") {
        return "Paper wins!";
    } else {
        return "Invalid";
    }
}
