// script.js

const board = document.querySelector(".game-board");

// Emoji icons (pairs)
const icons = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let cards = [...icons, ...icons]; // duplicate for pairs

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Render cards
cards.forEach(icon => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.icon = icon;
  card.textContent = icon;
  board.appendChild(card);
});

// Game logic
let firstCard = null;
let secondCard = null;
let lockBoard = false;

board.addEventListener("click", e => {
  const clicked = e.target;
  if (!clicked.classList.contains("card") || lockBoard) return;
  if (clicked === firstCard) return; // same card clicked

  clicked.classList.add("flip");

  if (!firstCard) {
    firstCard = clicked;
    return;
  }

  secondCard = clicked;
  checkMatch();
});

function checkMatch() {
  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  if (isMatch) {
    firstCard = null;
    secondCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 800);
  }
}
