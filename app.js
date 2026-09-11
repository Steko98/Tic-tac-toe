const gamegrid = document.getElementById("container")

function CreateCell(players, board, i, j) {

    this.id = `${i}${j}`

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
                        players[1].turn = true;
                        players[0].turn = false;
                    } else {
                        board[i][j].value = 2;
                        cell.textContent = "O";
                        players[0].turn = true;
                        players[1].turn = false;
                    }
                }
            })
        })();

    return { value }
}

function Game() {
    let players = [
        {
            name: "Player One",
            turn: true,
            wins: 0,
        },
        {
            name: "Player Two",
            turn: false,
            wins: 0,
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

    console.log(players)
    console.log(gameboard)

    return players, gameboard;
}

Game();