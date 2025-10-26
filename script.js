const board = document.querySelector(".game-board");
const restartBtn = document.getElementById("restart");

const icons = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let cards = [];
let firstCard, secondCard;
let lockBoard = false;

function createBoard() {
  board.innerHTML = "";
  const doubled = [...icons, ...icons];
  const shuffled = doubled.sort(() => 0.5 - Math.random());

  shuffled.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-face card-front"></div>
      <div class="card-face card-back">${icon}</div>
    `;
    board.appendChild(card);
    card.addEventListener("click", () => flipCard(card));
  });
}

function flipCard(card) {
  if (lockBoard || card === firstCard) return;
  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  const isMatch =
    firstCard.querySelector(".card-back").textContent ===
    secondCard.querySelector(".card-back").textContent;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 900);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartBtn.addEventListener("click", createBoard);

// Initialize game
createBoard();
