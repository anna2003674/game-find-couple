const startButton = document.getElementById("startGame");
const rulesButton = document.getElementById("rulesButton");
const gameBoard = document.getElementById("gameBoard");
const livesElement = document.getElementById("lives");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const endModal = document.getElementById("endModal");
const closeEndModal = document.getElementById("closeEndModal");
const restartButton = document.getElementById("restartButton");

let flag = false;
let cards = [];
let flippedCards = [];
let matchedCards = [];
let lives = "❤️❤️❤️❤️❤️";
let gameStarted = false;
let symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍"];

function startNewGame() {
  gameBoard.innerHTML = "";
  cards = [];
  flippedCards = [];
  matchedCards = [];
  lives = "❤️❤️❤️❤️❤️";
  livesElement.textContent = lives;
  gameStarted = true;

  let shuffledSymbols = [...symbols, ...symbols].sort(
    () => Math.random() - 0.5
  );

  shuffledSymbols.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.addEventListener("click", () => flipCard(card));
    cards.push(card);
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (
    !gameStarted ||
    flag ||
    card.classList.contains("opened") ||
    card.classList.contains("matched")
  )
    return;

  card.classList.add("opened");
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    flag = true;
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  flippedCards = [];

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);

    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        showEndModal("Поздравляем! Вы выиграли!");
      }, 500);
    }
    setTimeout(() => {
      flag = false;
    }, 500);
  } else {
    lives = lives.substring(0, lives.length - 2);
    livesElement.textContent = lives;

    if (lives == "") {
      setTimeout(() => {
        showEndModal("Вы проиграли! Попробуйте снова.");
      }, 500);
    } else {
      setTimeout(() => {
        card1.classList.remove("opened");
        card2.classList.remove("opened");
        card1.textContent = "";
        card2.textContent = "";
      }, 1000);
    }
    setTimeout(() => {
      flag = false;
    }, 1200);
  }
}

function openModal() {
  modal.style.display = "block";
}

function closeGameRules() {
  modal.style.display = "none";
}

function showEndModal(result) {
  const gameResult = document.getElementById("gameResult");
  gameResult.textContent = result;
  endModal.style.display = "block";
}

function closeEndGameModal() {
  endModal.style.display = "none";
  startNewGame();
}

startButton.addEventListener("click", startNewGame);
rulesButton.addEventListener("click", openModal);
closeModal.addEventListener("click", closeGameRules);
closeEndModal.addEventListener("click", closeEndGameModal);
restartButton.addEventListener("click", startNewGame);
restartButton.addEventListener("click", closeEndGameModal);
startNewGame();
