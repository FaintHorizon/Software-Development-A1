// ---- Setting Variables ----
let numberOfCharacters = 0;
let maxAttempts = 0;
let gameNumber = [];
let currentGuess = [];
let attemptNumber = 0;
let gameStarted = false;
let gameOver = false;

// ---- Getting HTML Elements ----
const numberBoxes = document.getElementById("numberBoxes");
const guessGrid = document.getElementById("guessGrid");
const gameMessage = document.getElementById("gameMessage");
const difficultyButtons = document.querySelectorAll(".difficulty-button");
const keypadButtons = document.querySelectorAll(".keypad-button");
const deleteButton = document.querySelector(".delete-button");
const enterButton = document.querySelector(".enter-button");

// ---- Starting Page ----
gameMessage.textContent = "Select a difficulty to start the game.";
setKeypadEnabled(false);

// ---- Difficulty Buttons ----
difficultyButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let difficulty = button.textContent.trim().toLowerCase();
        if (difficulty === "easy") {
            numberOfCharacters = 3;
            maxAttempts = 5;
        }

        else if (difficulty === "medium") {
            numberOfCharacters = 5;
            maxAttempts = 5;
        }

        else if (difficulty === "hard") {
            numberOfCharacters = 7;
            maxAttempts = 5;
        }

        startGame();
    });
});

// ---- Start Game ----
function startGame() {
    gameNumber = [];
    currentGuess = [];
    attemptNumber = 0;
    gameStarted = true;
    gameOver = false;
    generateGameNumber();
    createNumberBoxes();
    guessGrid.innerHTML = "";

    setKeypadEnabled(true);
    enterButton.disabled = true;
    gameMessage.textContent =
        "Guess the " + numberOfCharacters +
        " digit number. You have " + maxAttempts +
        " attempts.";
}

// ---- Generate Hidden Number ----
function generateGameNumber() {
    while (gameNumber.length < numberOfCharacters) {
        let number = Math.floor(Math.random() * 10);
        if (!gameNumber.includes(number)) {
            gameNumber.push(number);
        }
    }
}

// ---- Create Number Boxes ----
function createNumberBoxes() {
    numberBoxes.innerHTML = "";
    for (let i = 0; i < numberOfCharacters; i++) {
        let box = document.createElement("div");
        box.classList.add(
            "number-box",
            "d-flex",
            "align-items-center",
            "justify-content-center"
        );
        numberBoxes.appendChild(box);
    }
}

// ---- Number Buttons ----
keypadButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        if (!gameStarted || gameOver) {
            return;
        }
        if (currentGuess.length < numberOfCharacters) {
            let number = Number(button.textContent.trim());
            currentGuess.push(number);
            updateNumberBoxes();
        }
    });
});

// ---- Update Number Boxes ----
function updateNumberBoxes() {
    for (let i = 0; i < numberBoxes.children.length; i++) {
        if (i < currentGuess.length) {
            numberBoxes.children[i].textContent = currentGuess[i];
        }
        else {
            numberBoxes.children[i].textContent = "";
        }
    }

    // Enter is only enabled when all boxes are filled
    enterButton.disabled =
        currentGuess.length !== numberOfCharacters;
}

// ---- Delete Button ----
deleteButton.addEventListener("click", function() {
    if (!gameStarted || gameOver) {
        return;
    }
    if (currentGuess.length > 0) {
        currentGuess.pop();
        updateNumberBoxes();
    }
});

// ---- Enter Button ----
enterButton.addEventListener("click", function() {
    if (!gameStarted || gameOver) {
        return;
    }
    if (currentGuess.length === numberOfCharacters) {
        checkGuess();
    }
});

// ---- Check Guess ----
function checkGuess() {
    let results = [];
    let usedNumbers = [];
    // First check numbers in the correct position
    for (let i = 0; i < numberOfCharacters; i++) {
        if (currentGuess[i] === gameNumber[i]) {
            results[i] = "correct";
            usedNumbers[i] = true;
        }
        else {
            results[i] = "incorrect";
            usedNumbers[i] = false;
        }
    }

    // Then check numbers that are in the wrong position
    for (let i = 0; i < numberOfCharacters; i++) {
        if (results[i] === "correct") {
            continue;
        }
                for (let j = 0; j < numberOfCharacters; j++) {
            if (
                !usedNumbers[j] &&
                currentGuess[i] === gameNumber[j]
            ) {
                results[i] = "wrong-position";
                usedNumbers[j] = true;
                break;
            }
        }
    }
    addGuessRow(results);
    attemptNumber++;

    // Grey out numbers that are not in the hidden number
    for (let i = 0; i < currentGuess.length; i++) {
        if (!gameNumber.includes(currentGuess[i])) {
            disableKeypadButton(currentGuess[i]);
        }
    }

    // Check if every number is correct
    let allCorrect = true;
    for (let i = 0; i < results.length; i++) {
        if (results[i] !== "correct") {
            allCorrect = false;
        }
    }
    if (allCorrect) {
        winGame();
    }
    else if (attemptNumber >= maxAttempts) {
        loseGame();
    }
    else {
        currentGuess = [];
        updateNumberBoxes();
        gameMessage.textContent =
            "Attempt " + (attemptNumber + 1) +
            " of " + maxAttempts + ".";
    }
}

// ---- Add Guess To Grid ----
function addGuessRow(results) {
    let row = document.createElement("div");
    row.classList.add(
        "d-flex",
        "justify-content-center",
        "gap-2",
        "mb-2"
    );

    for (let i = 0; i < numberOfCharacters; i++) {
        let box = document.createElement("div");
        box.classList.add(
            "number-box",
            "d-flex",
            "align-items-center",
            "justify-content-center"
        );
        box.textContent = currentGuess[i];
        box.classList.add(results[i]);
        row.appendChild(box);
    }
    guessGrid.appendChild(row);
}

// ---- Disable Incorrect Keypad Number ----
function disableKeypadButton(number) {
    keypadButtons.forEach(function(button) {
        let buttonNumber = Number(button.textContent.trim());
        if (buttonNumber === number) {
            button.disabled = true;
        }
    });
}


// ---- Enable / Disable Keypad ----
function setKeypadEnabled(enabled) {
    keypadButtons.forEach(function(button) {
        button.disabled = !enabled;
    });
    deleteButton.disabled = !enabled;
    enterButton.disabled = !enabled;
}

// ---- Win Game ----
function winGame() {
    gameOver = true;
    setKeypadEnabled(false);
    gameMessage.innerHTML =
        "<h2>You Win!</h2>" +
        "<p>You guessed the number!</p>" +
        "<button id='playAgainButton' class='enter-button btn mt-2'>" +
        "Play Again" +
        "</button>";
    addPlayAgainButton();
}

// ---- Lose Game ----
function loseGame() {
    gameOver = true;
    setKeypadEnabled(false);
    gameMessage.innerHTML =
        "<h2>Game Over</h2>" +
        "<p>The number was " + gameNumber.join("") + "</p>" +
        "<button id='playAgainButton' class='enter-button btn mt-2'>" +
        "Play Again" +
        "</button>";
    addPlayAgainButton();
}

// ---- Play Again ----
function addPlayAgainButton() {
    const playAgainButton =
        document.getElementById("playAgainButton");
    playAgainButton.addEventListener("click", function() {
        startGame();
    });
}