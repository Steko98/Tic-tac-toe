const gamegrid = document.getElementById("container")

function WinCondition(board) {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0].value === board[i][1].value &&
            board[i][1].value === board[i][2].value 
        ) {
            return true
        } 
    }
    return false;
}

function CreateCell(players, board, i, j) {

    this.id = `${i}${j}`

    this.value = 0,

        (() => {
            const cell = document.createElement("div");
            cell.setAttribute("id", `${i}${j}`)
            cell.classList.add("cell")
            gamegrid.appendChild(cell)
            cell.addEventListener("click", () => {
                for (let row = 0; row < 3; row++) {
                    for (let column = 0; column < 3; column++) {
                        if (board[i][j] === 0) {
                            continue;
                        } else {
                            break
                        }
                    }
                }

                if (board[i][j].value === 0) {
                    if (players[0].turn) {
                        board[i][j].value = 1;
                        cell.textContent = "X";
                        players[1].turn = true;
                        players[0].turn = false;
                        if (WinCondition(board)) {
                            alert("Player 1 Won")
                        }
                    } else {
                        board[i][j].value = 2;
                        cell.textContent = "O";
                        players[0].turn = true;
                        players[1].turn = false;
                        if (WinCondition(board)) {
                            alert("Player 2 Won")
                        }
                    }
                }
            })
        })();

    return { value }
}

const game = (() => {
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

    return { players, gameboard };
})();