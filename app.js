const gamegrid = document.getElementById("container")

function CreateCell(board, i, j) {

    this.id = `${i}${j}`

    this.value = 0,

    (() => {
        const cell = document.createElement("div");
        cell.setAttribute("id", `${i}${j}`)
        cell.classList.add("cell")
        gamegrid.appendChild(cell)
        cell.addEventListener("click", ()=>{
            board[i][j].value = 1;
            cell.textContent = "1";
        })
    })();

    return {value}
}

function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            let cell = CreateCell(board,i,j);
            board[i][j] = cell;
        }
    }

    return board
}