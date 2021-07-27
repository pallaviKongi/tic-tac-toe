let gameStatus = document.getElementById("game-status");
let gameActive = true;
let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winningMessage = () => `Game Over! Player ${currentPlayer} won`;
const drawMessage = () => "The Game ended in a draw";
const currentPlayerTurn = () => `Its ${currentPlayer}'s turn`;

gameStatus.innerHTML = currentPlayerTurn();

const handlePlayerChange = () => {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameStatus.innerHTML = currentPlayerTurn();
};

const handleCellPlayed = (cellClicked, cellIndex) => {
  gameState[cellIndex] = currentPlayer;
  cellClicked.innerHTML = currentPlayer;
};

const handleResultValidation = () => {
  let gameWon = false;
  let winningBlock = [];
  /* check if any player won the game */
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];
    if (a == "" || b == "" || c == "") {
      continue;
    } else if (a == b && b == c) {
      winningBlock = winCondition;
      gameWon = true;
      break;
    }
  }
  if (gameWon) {
    gameStatus.innerHTML = winningMessage();
    gameActive = false;
    for (let i = 0; i < winningBlock.length; i++) {
      document
        .querySelector(`#block_${winningBlock[i]}`)
        .classList.add("winningBlock");
    }
    return;
  }
  /* check if the game ended in a draw */
  let drawGame = !gameState.includes("");
  if (drawGame) {
    gameStatus.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handleCellClick = (e) => {
  const cellClicked = e.target;
  const cellIndex = parseInt(cellClicked.getAttribute("data-cell-index"));
  if (gameState[cellIndex] !== "" || !gameActive) return;

  handleCellPlayed(cellClicked, cellIndex);
  handleResultValidation();
};

const handleResetGame = () => {
  window.location.reload();
};

document
  .querySelectorAll(".block")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

document.querySelector(".reset_btn").addEventListener("click", handleResetGame);
