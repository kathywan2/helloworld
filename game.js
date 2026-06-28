const board = document.getElementById("puzzle-board");
const statusText = document.getElementById("status");
const shuffleBtn = document.getElementById("shuffle-btn");

let tiles = [];
let emptyIndex = 15; // last tile is empty

function initBoard() {
  tiles = [...Array(15).keys()].map(n => n + 1);
  tiles.push(null); // empty space
  renderBoard();
}

function renderBoard() {
  board.innerHTML = "";
  tiles.forEach((tile, index) => {
    const div = document.createElement("div");
    div.classList.add("tile");
    if (tile === null) {
      div.classList.add("empty");
    } else {
      div.textContent = tile;
      div.addEventListener("click", () => moveTile(index));
    }
    board.appendChild(div);
  });
}

function moveTile(index) {
  const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
  if (validMoves.includes(index)) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    emptyIndex = index;
    renderBoard();
    checkWin();
  }
}

function shuffleBoard() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  emptyIndex = tiles.indexOf(null);
  renderBoard();
}

function checkWin() {
  const isSolved = tiles.slice(0, 15).every((val, i) => val === i + 1);
  if (isSolved) {
    statusText.textContent = "🎉 You solved the puzzle!";
  } else {
    statusText.textContent = "";
  }
}

shuffleBtn.addEventListener("click", shuffleBoard);

initBoard();