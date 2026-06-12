const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

let cards = [...letters, ...letters];

const board = document.getElementById("gameBoard");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedPairs = 0;
let timer = 0;
let timerInterval;

// Shuffle Cards
function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

// Timer
function startTimer() {
    clearInterval(timerInterval);

    timer = 0;

    timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timer").textContent = timer;
    }, 1000);
}

// Create Board
function createBoard() {
    board.innerHTML = "";

    shuffleCards();

    cards.forEach(letter => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.dataset.value = letter;

        card.textContent = "?";

        card.addEventListener("click", flipCard);

        board.appendChild(card);
    });

    moves = 0;
    matchedPairs = 0;

    document.getElementById("moves").textContent = moves;
    document.getElementById("matched").textContent = matchedPairs;

    document.getElementById("message").textContent = "";

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    startTimer();
}

// Flip Card
function flipCard() {

    if (
        lockBoard ||
        this === firstCard ||
        this.classList.contains("matched")
    ) {
        return;
    }

    this.textContent = this.dataset.value;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    moves++;
    document.getElementById("moves").textContent = moves;

    checkMatch();
}

// Match Logic
function checkMatch() {

    const isMatch =
        firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        document.getElementById("matched").textContent =
            matchedPairs;

        resetTurn();

        if (matchedPairs === letters.length) {
            gameWon();
        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        }, 1000);
    }
}

// Reset Turn
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Win
function gameWon() {

    clearInterval(timerInterval);

    document.getElementById("message").textContent =
        " Congratulations! You Won!";

    saveRecords();
}

// Save Records
function saveRecords() {

    let bestScore =
        Number(localStorage.getItem("bestScore")) || 0;

    let leastMoves =
        localStorage.getItem("leastMoves");

    let bestTime =
        localStorage.getItem("bestTime");

    let wins =
        Number(localStorage.getItem("wins")) || 0;

    if (matchedPairs > bestScore) {
        localStorage.setItem("bestScore", matchedPairs);
    }

    if (
        leastMoves === null ||
        moves < Number(leastMoves)
    ) {
        localStorage.setItem("leastMoves", moves);
    }

    if (
        bestTime === null ||
        timer < Number(bestTime)
    ) {
        localStorage.setItem("bestTime", timer);
    }

    wins++;

    localStorage.setItem("wins", wins);

    loadRecords();
}

// Load Records
function loadRecords() {

    document.getElementById("bestScore").textContent =
        localStorage.getItem("bestScore") || 0;

    document.getElementById("leastMoves").textContent =
        localStorage.getItem("leastMoves") || 0;

    document.getElementById("bestTime").textContent =
        localStorage.getItem("bestTime") || 0;

    document.getElementById("wins").textContent =
        localStorage.getItem("wins") || 0;
}

// Reset Button
document
    .getElementById("resetBtn")
    .addEventListener("click", createBoard);

loadRecords();
createBoard();
