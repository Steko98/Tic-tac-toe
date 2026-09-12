const gamegrid = document.getElementById("container")

const winCondition = function (board) {
    let winner;
    let victory = false;

    for (let i = 0; i < 3; i++) {
        if (
            board[i][0].value === board[i][1].value &&
            board[i][1].value === board[i][2].value &&
            board[i][0].value != 0
        ) {
            if (board[i][0].value === 1) {
                winner = "player 1"
                victory = true;
            } else {
                winner = "player 2"
                victory = true;
            }
            return { winner, victory }
        }
        if (
            board[0][i].value === board[1][i].value &&
            board[1][i].value === board[2][i].value &&
            board[0][i].value != 0
        ) {
            if (board[0][i].value === 1) {
                winner = "player 1"
                victory = true;
            } else {
                winner = "player 2"
                victory = true;
            }
            return { winner, victory }
        }
    }

    if (
        board[0][0].value === board[1][1].value &&
        board[1][1].value === board[2][2].value &&
        board[0][0].value != 0
    ) {
        if (board[0][0].value === 1) {
            winner = "player 1"
            victory = true;
        } else {
            winner = "player 2"
            victory = true;
        }
        return { winner, victory }
    }
    if (
        board[0][2].value === board[1][1].value &&
        board[1][1].value === board[2][0].value &&
        board[0][2].value != 0
    ) {
        if (board[0][2].value === 1) {
            winner = "player 1"
            victory = true;
        } else {
            winner = "player 2"
            victory = true;
        }
        return { winner, victory }
    }

    return { winner, victory }
}

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
                        players[1].turn = true;
                        players[0].turn = false;
                    } else {
                        board[i][j].value = 2;
                        cell.textContent = "O";
                        players[0].turn = true;
                        players[1].turn = false;
                    }
                }

                if (winCondition(board).victory === true) {
                    alert(`${winCondition(board).winner} won!`)
                }
            })
        })();

    return { value }
}

const game = (() => {
    let players = [
        {
            turn: true,
            wins: 0,
        },
        {
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