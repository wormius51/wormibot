const boardElement = document.getElementById("puzzle").children[0];
var boardData = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

var lastUser = "";

function updateBoard() {
    let zero = true;
    for (let y = 0; y < boardData.length; y++) {
        for (let x = 0; x < boardData[y].length; x++) {
            let tile = boardElement.children[2 - y].children[x];
            if (boardData[y][x] != 0) {
                zero = false;
               tile.className = "marked";
               tile.children[0].innerHTML = boardData[y][x];
            } else {
                tile.children[0].innerHTML = "";
                tile.className = "";
            }
        }
    }
    if (zero) win();
}

socket.on("right", (data) => {
    lastUser = data;
    for (let y = 0; y < boardData.length; y++) {
        for (let x = boardData[y].length - 2; x >= 0; x--) {
            if (checkDigit(boardData[y][x],5)) continue;
            if (checkDigit(boardData[y][x + 1] + boardData[y][x],3)) continue;
            boardData[y][x + 1] += boardData[y][x];
            boardData[y][x] = 0;
        }
    }
    updateBoard();
});

socket.on("left", (data) => {
    lastUser = data;
    for (let y = 0; y < boardData.length; y++) {
        for (let x = 1; x < boardData[y].length; x++) {
            if (checkDigit(boardData[y][x],5)) continue;
            if (checkDigit(boardData[y][x - 1] + boardData[y][x],3)) continue;
            boardData[y][x - 1] += boardData[y][x];
            boardData[y][x] = 0;
        }
    }
    updateBoard();
});

socket.on("down", (data) => {
    lastUser = data;
    for (let y = 1; y < boardData.length; y++) {
        for (let x = 0; x < boardData[y].length; x++) {
            if (checkDigit(boardData[y][x],5)) continue;
            if (checkDigit(boardData[y - 1][x] + boardData[y][x],3)) continue;
            boardData[y - 1][x] += boardData[y][x];
            boardData[y][x] = 0;
        }
    }
    updateBoard();
});

socket.on("up", (data) => {
    lastUser = data;
    for (let y = boardData.length - 2; y >= 0; y--) {
        for (let x = 0; x < boardData[y].length; x++) {
            if (checkDigit(boardData[y][x],5)) continue;
            if (checkDigit(boardData[y + 1][x] + boardData[y][x],3)) continue;
            boardData[y + 1][x] += boardData[y][x];
            boardData[y][x] = 0;
        }
    }
    updateBoard();
});

function checkDigit(num,digit) {
    if (num < 0) num = -num;
    let numString = num + "";
    for (let i = 0; i < numString.length; i++) {
        if (numString[i] == digit + "") return true;
    }
    return false;
}

function generatePosition(sum) {
    for (let y = 0; y < boardData.length; y++) {
        for (let x = 0; x < boardData[y].length; x++) {
            let num = Math.floor(Math.random() * 100 - 50);
            while (checkDigit(num,3)) {
                num = Math.floor(Math.random() * 100 - 50);
            }
            sum -= num;
            boardData[y][x] = num;
        }
    }
    if (sum != 0) {
        boardData[0][0] += sum;
    }
    updateBoard();
}

generatePosition(0);

function win() {
    socket.emit('win',lastUser);
    generatePosition(0);
}