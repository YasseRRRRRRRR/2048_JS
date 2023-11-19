

var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    // test
    // board = [
    //         [32, 2, 32, 2],
    //         [64, 2, 2, 128],
    //         [4, 4, 1024, 8],
    //         [32, 64, 128, 128]
    //     ];
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerHTML = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}




document.addEventListener("keyup", (e) => {
    if (e.code == "KeyA" && isMoveLeft()) {
        updateKeyColor("left");
        slideLeft();
        setTwo();
        stopAllAIs();
    }
    else if (e.code == "KeyD" && isMoveRight()) {
        updateKeyColor("right");
        slideRight();
        setTwo();
        stopAllAIs();
    }
    else if (e.code == "KeyW" && isMoveUp()) {
        updateKeyColor("up");
        slideUp();
        setTwo();
        stopAllAIs();
    }
    else if (e.code == "KeyS" && isMoveDown()) {
        updateKeyColor("down");
        slideDown();
        setTwo();
        stopAllAIs();
    }
    else if (e.code === "KeyE") {
        stopRandomAI();
        // Increase the speed by reducing the interval
        minimaxSpeed = Math.max(0, minimaxSpeed - 50);
        console.log(`Minimax AI Speed increased! New speed: ${minimaxSpeed} milliseconds`);
        // Restart the Minimax AI with the new speed
        clearInterval(minimaxIntervalId);
        startMinimaxAI();
    }
    else if (e.code === "KeyQ") {
        stopMinimaxAI();
        // Increase the speed by reducing the interval
        aiSpeed = Math.max(100, aiSpeed - 50);
        console.log(`AI Speed increased! New speed: ${aiSpeed} milliseconds`);
        // Restart the AI with the new speed
        clearInterval(randomIntervalId);
        startAI();
    }
    else if (e.code == "Space") {
        // Stop both AIs if "t" is pressed
        stopAllAIs();
    }
    else if (e.code == "KeyR") {
        // Stop both AIs if "t" is pressed
        location.reload();
    }

    document.getElementById("score").innerText = score;

    isGameOver();
})

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}



function slideLeft() {
    updateKeyColor("left");
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    // updateKeyColor("left");
}


function slideRight() {
    updateKeyColor("right");
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    // updateKeyColor("right");
}

function slideUp() {
    updateKeyColor("up");
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    // updateKeyColor("up");
}

function slideDown() {
    updateKeyColor("down");
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    // updateKeyColor("down");
}
function isGameOver() {
    // Check if there are any empty tiles
    if (hasEmptyTile()) {
        return false;
    }

    // Check for possible moves in all directions
    return !(isMoveLeft() || isMoveRight() || isMoveUp() || isMoveDown());
}

function isMoveLeft() {
    for (let r = 0; r < rows; r++) {
        for (let c = 1; c < columns; c++) {
            if (board[r][c] === board[r][c - 1] || board[r][c - 1] === 0) {
                return true;
            }
        }
    }
    return false;
}

function isMoveRight() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] === board[r][c + 1] || board[r][c + 1] === 0) {
                return true;
            }
        }
    }
    return false;
}

function isMoveUp() {
    for (let r = 1; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === board[r - 1][c] || board[r - 1][c] === 0) {
                return true;
            }
        }
    }
    return false;
}

function isMoveDown() {
    for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === board[r + 1][c] || board[r + 1][c] === 0) {
                return true;
            }
        }
    }
    return false;
}

function stopAllAIs() {
    // Stop all AIs and reset corresponding flags
    stopRandomAI();
    stopMinimaxAI();
}

function updateKeyColor(direction) {
    console.log("Updating key color for direction:", direction);
    // Remove the background color from all arrow keys
    const arrowKeys = document.querySelectorAll(".arrow_keys");
    arrowKeys.forEach(key => key.style.backgroundColor = "");

    // Set the background color for the corresponding arrow key
    const arrowKey = document.getElementById(direction);
    if (arrowKey) {
        arrowKey.style.backgroundColor = "yellow"; // Set your desired color


        setTimeout(() => {
            arrowKey.style.backgroundColor = "";
        }, 150);
    }
}