const gamegrid = document.getElementById("container")

const game = (() => {
    let players = [
        {
            id: 1,
            name: "Player 1",
            turn: true,
            wins: 0,
            changeName() {
                this.name = prompt("Player name:")
            }
        },
        {
            id: 2,
            name: "Player 2",
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
                        alert(players[0].name)
                    } else if (a === 2) {
                        game.lastWinner = players[1].name;
                        players[1].wins++;
                        game.victory = true;
                        alert(players[1].name)
                    }
                }
            }
        }

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
        players[0].turn = true;
        players[1].turn = false;
        game.lastWinner = null;
        game.victory = false;
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

                if (game.victory) {
                    alert(game.lastWinner)
                }
            })
        })();

    return { value }
}

const resetBtn = document.getElementById("reset").addEventListener("click", () => {
    game.reset()
})