const gameCanvas = document.getElementById("gameCanvas");
const gameContext = gameCanvas.getContext("2d");

const userColors = {
    default: "white"
};

const userWidths = {
    default: 5
};

const minWidth = 1;
const maxWidth = 15;

gameCanvas.height = window.innerHeight;
gameCanvas.width = window.innerWidth;

socket.on("paint", paintRequestHandler);
socket.on("clear", clear);

function paintRequestHandler (username, params) {
    if (!params) return;
    let paramsArray = params.split(" ");
    if (paramsArray.length < 4) return;
    if (paramsArray.length > 4) {
        if (isNaN(paramsArray[4])) {
                setColor (username, paramsArray[4]);
            if (paramsArray.length >= 6)
                setWidth(username, paramsArray[5]);
        } else {
            setWidth(username, paramsArray[4]);
            if (paramsArray.length >= 6)
                setColor(username, paramsArray[5]);
        }
    }
    paint(username, paramsArray);
}

function paint (username, paramsArray) {
    let color = userColors[username];
    if (!color)
        color = userColors.default;
    let width = userWidths[username];
    if (!width)
        width = userWidths.default;
    let line = makeLine(paramsArray[0], paramsArray[1],
        paramsArray[2], paramsArray[3], width, color);
    drawLine(line);
}

function setColor (username, color) {
    userColors[username] = color;
}

function setWidth (username, width) {
    if (isNaN(width)) return;
    width *= 1;
    if (width < minWidth) width = minWidth;
    if (width > maxWidth) width = maxWidth;
        userWidths[username] = width;
}

function makeLine(x0, y0, x1, y1, width, color) {
    if (!x0) x0 = x1;
    if (!y0) y0 = y1;
    let line = {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        width: width,
        color: color
    };
    return line;
}

function drawLine (line) {
    gameContext.beginPath();
    gameContext.lineWidth = line.width;
    gameContext.strokeStyle = line.color;
    gameContext.moveTo(line.x0, line.y0);
    gameContext.lineTo(line.x1, line.y1);
    gameContext.stroke();
}

function clear () {
    console.log("clear");
    gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}