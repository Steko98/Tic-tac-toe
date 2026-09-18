const gamegrid = document.getElementById("container")
let gameOverlay = document.getElementById("game-over")

const game = (() => {
    let players = [
        {
            id: 1,
            name: "Player One",
            turn: true,
            wins: 0,
            changeName() {
                this.name = prompt("Player name:")
            }
        },
        {
            id: 2,
            name: "Player Two",
            turn: false,
            wins: 0,
            changeName() {
                this.name = prompt("Player name:")
            }
        }
    ]

    const gameboard = (() => {
        const rows = 3;
        const columns = 3;
        let board = [];

        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                let cell = CreateCell(players, board, i, j);
                board[i][j] = cell;
            }
        }

        return board
    })();

    let lastWinner;
    let victory = false;

    let announce = document.createElement("p")
    let p1Wins = document.getElementById("p1-wins")
    let p2Wins = document.getElementById("p2-wins")

    let p1Name = document.getElementById("p1-name")
    let p2Name = document.getElementById("p2-name")
    let p1Btn = document.getElementById("change-p1").addEventListener("click", () => {
        players[0].changeName()
        p1Name.textContent = players[0].name;
    })
    let p2Btn = document.getElementById("change-p2").addEventListener("click", () => {
        players[1].changeName()
        p2Name.textContent = players[1].name;
    })

    const winCondition = (board, players) => {

        let combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        let boardCopy = board.flat()

        for (let comb of combinations) {
            let a = boardCopy[comb[0]].value
            let b = boardCopy[comb[1]].value
            let c = boardCopy[comb[2]].value

            if (a !== 0 && b !== 0 && c !== 0) {
                if (a === b && b === c) {

                    if (a === 1) {
                        game.lastWinner = players[0].name;
                        players[0].wins++;
                        game.victory = true;
                        announce.classList.add("p1")
                    } else if (a === 2) {
                        game.lastWinner = players[1].name;
                        players[1].wins++;
                        game.victory = true;
                        announce.classList.add("p2")
                    }

                    gameOverlay.classList.remove("hide")
                    announce.textContent = `${game.lastWinner} won!`
                    gameOverlay.appendChild(announce)
                    p1Wins.textContent = `Wins: ${players[0].wins}`
                    p2Wins.textContent = `Wins: ${players[1].wins}`
                }
            }
        }

        (() => {
            if (game.victory === false) {
                let drawCheck = [];
                boardCopy.forEach((element) => {
                    if (element.value === 0) {
                        drawCheck.push(0);
                    } else {
                        return
                    }
                })
                if (drawCheck.includes(0)) {
                    return
                } else {
                    game.victory = true;
                    announce.textContent = "It's a draw!"
                    gameOverlay.classList.remove("hide")
                    gameOverlay.appendChild(announce)
                }
            }
        })();

        return victory;

    }

    const reset = () => {
        game.gameboard.forEach(row => {
            row.forEach(cell => {
                cell.value = 0;
            })
        })
        let cells = document.getElementsByClassName("cell")
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
            if (cells[i].classList.contains("p1")) {
                cells[i].classList.remove("p1")
            } else if (cells[i].classList.contains("p2")) {
                cells[i].classList.remove("p2")
            }
        }
        if (announce.classList.contains("p1")) {
            announce.classList.remove("p1")
        } else if (announce.classList.contains("p2")) {
            announce.classList.remove("p2")
        }
        players[0].turn = true;
        players[1].turn = false;
        game.lastWinner = null;
        game.victory = false;
        gameOverlay.classList.add("hide")
    }

    return { players, gameboard, reset, winCondition, lastWinner };
})();

function CreateCell(players, board, i, j) {

    this.value = 0,

        (() => {
            const cell = document.createElement("div");
            cell.setAttribute("id", `${i}${j}`)
            cell.classList.add("cell")
            gamegrid.appendChild(cell)
            cell.addEventListener("click", () => {
                if (board[i][j].value === 0) {
                    if (players[0].turn) {
                        board[i][j].value = 1;
                        cell.textContent = "X";
                        cell.classList.add("p1")
                        players[1].turn = true;
                        players[0].turn = false;
                    } else {
                        board[i][j].value = 2;
                        cell.textContent = "O";
                        cell.classList.add("p2")
                        players[0].turn = true;
                        players[1].turn = false;
                    }
                }

                game.winCondition(board, players);
            })
        })();

    return { value }
}

const resetBtn = document.getElementById("reset").addEventListener("click", () => {
    game.reset()
})