import Game from "./Game.js";
import GameView from "./GameView.js";

const checkbox = document.getElementById("checkbox");

let mode = "light";

checkbox.addEventListener("change", () => {
  // change the theme of the website
  document.body.classList.toggle("dark");
  mode = mode === "light" ? "dark" : "light";
  gameView.updateBoard(game, mode);
});

let game = new Game();
let gameView = new GameView();

document.querySelector(".restart").addEventListener("click", () => {
  onRestartClick();
});

let tiles = document.querySelectorAll(".board-tile");
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    onTileClick(tile.dataset.index);
  });
});

function onTileClick(i) {
  // make a move
  game.makeMove(i);
  // update board
  gameView.updateBoard(game, mode);
}

function onRestartClick() {
  game = new Game();
  gameView.updateBoard(game, mode);
}

gameView.updateBoard(game, mode);
