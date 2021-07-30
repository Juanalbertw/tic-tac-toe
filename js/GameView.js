export default class GameView {
  constructor() {
    console.log("init game view");
  }

  updateBoard(game, mode) {
    this.updateTurn(game, mode);
    const winningCombination = game.findWinningCombinations();
    if (winningCombination) {
      let winner = game.turn.toLowerCase();
      document.querySelector(
        `.player-${winner}`
      ).innerHTML = `<span>Player ${game.turn}</span>
          <div class="confetti">
            <img src="./confetti.png" alt="" />
          </div>`;
    } else {
      document.querySelector(".player-x").innerHTML = "<span>Player X</span>";
      document.querySelector(".player-o").innerHTML = "<span>Player O</span>";
    }

    for (let i = 0; i < game.board.length; i++) {
      const tile = document.querySelector(`.board-tile[data-index='${i}']`);

      tile.classList.remove("tile-winner");

      let tileType = game.board[i] === "X" ? "tile-x" : "tile-o";

      // dark mode
      if (mode !== "light") {
        tileType = tileType.concat("-dark");

        // use className attribute to replace all existing classes with one or more new classes
        document.getElementById("restart").className = "restart-dark";

        for (let i = 0; i < 9; i++) {
          document.getElementById(`board-tile-${i}`).style.background =
            "#292c35";
          document
            .getElementById(`board-tile-${i}`)
            .classList.add("board-tile-dark");
        }
      } else {
        document.getElementById("restart").className = "restart";

        for (let i = 0; i < 9; i++) {
          document.getElementById(`board-tile-${i}`).style.background = "white";
          document
            .getElementById(`board-tile-${i}`)
            .classList.remove("board-tile-dark");
        }
      }

      tile.innerHTML = `<span class="${tileType}">${
        game.board[i] ? game.board[i] : ""
      }</span>`;

      if (winningCombination && winningCombination.includes(i)) {
        tile.classList.add("tile-winner");
      }
    }
  }

  updateTurn(game, mode) {
    let playerX = document.querySelector(".player-x");
    let playerO = document.querySelector(".player-o");
    playerX.classList.remove("active");
    playerO.classList.remove("active");
    playerX.classList.remove("active-dark");
    playerO.classList.remove("active-dark");

    if (mode === "light") {
      if (game.turn == "X") {
        playerX.classList.add("active");
      } else {
        playerO.classList.add("active");
      }
    } else {
      if (game.turn == "X") {
        playerX.classList.add("active-dark");
      } else {
        playerO.classList.add("active-dark");
      }
    }
  }
}
