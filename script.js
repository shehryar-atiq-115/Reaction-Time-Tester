const startBtn = document.getElementById("startBtn");
const characterDisplay = document.getElementById("character");
const resultDisplay = document.getElementById("result");
const timeDisplay = document.getElementById("time");
const instruction = document.getElementById("instruction");

let startTime = 0;
let currentChar = "";
let gameActive = false;


function generateCharacter() {
    const isLetter = Math.random() < 0.5;

    if (isLetter) {
        // A-Z
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
        // 0-9
        return Math.floor(Math.random() * 10).toString();
    }
}


startBtn.addEventListener("click", () => {
    resultDisplay.textContent = "";
    timeDisplay.textContent = "";
    instruction.textContent = "Press A for Letter, L for Number";

    gameActive = false;
    characterDisplay.textContent = "...";

    
    setTimeout(() => {
        currentChar = generateCharacter();
        characterDisplay.textContent = currentChar;

        startTime = new Date().getTime();
        gameActive = true;
    }, Math.random() * 2000 + 1000); // 1–3 sec delay
});


document.addEventListener("keydown", (e) => {
    if (!gameActive) return;

    const endTime = new Date().getTime();
    const reactionTime = endTime - startTime;

    let correct = false;

    if (/[A-Z]/.test(currentChar) && e.key.toLowerCase() === "a") {
        correct = true;
    } 
    else if (/[0-9]/.test(currentChar) && e.key.toLowerCase() === "l") {
        correct = true;
    }

    if (correct) {
        resultDisplay.textContent = " Correct!";
        resultDisplay.style.color = "lightgreen";
    } else {
        resultDisplay.textContent = " Wrong!";
        resultDisplay.style.color = " red";
    }

    timeDisplay.textContent = `⏱ Reaction Time: ${reactionTime} ms`;

    gameActive = false;
});