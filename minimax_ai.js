// minimax_ai.js
let minimaxIntervalId;
let minimaxAIFlag = false;
let minimaxSpeed = 500; // Initial speed in milliseconds

// Constants for moves
const MOVES = ["left", "right", "up", "down"];

// ...

function startMinimaxAI() {
    minimaxIntervalId = setInterval(() => {
        let { eval, bestMove } = minimax(board, 3, true); // Adjust the depth as needed

        // Perform the corresponding move
        performMove(bestMove);
        updateKeyColor(mapMoveToArrowKey(bestMove));

        // Set a new tile after each move
        setTwo();

        // Check for game over after each move
        if (isGameOver()) {
            console.log("Minimax AI Game Over!");
            clearInterval(minimaxIntervalId);
        }

        // Update the score display
        document.getElementById("score").innerText = score;
    }, 500); // Adjust the interval as needed
}
function minimax(board, depth, maximizingPlayer) {
    // Terminal condition: Check if the given depth is 0 or game over
    if (depth === 0 || isGameOver()) {
        // Evaluate the current state using the PERFECT_SNAKE heuristic
        return { eval: evaluateHeuristic(board), bestMove: null };
    }

    let bestEval = maximizingPlayer ? -Infinity : Infinity;
    let bestMove = null;

    // Iterate over all possible moves
    for (let move of MOVES) {
        let newBoard = simulateMove(board, move);
        let eval = minimax(newBoard, depth - 1, !maximizingPlayer).eval;

        if ((maximizingPlayer && eval > bestEval) || (!maximizingPlayer && eval < bestEval)) {
            bestEval = eval;
            bestMove = move;
        }
    }

    return { eval: bestEval, bestMove: bestMove };
}

function evaluateHeuristic(board) {
    // Simple heuristic: Sum of values on the board
    let sum = 0;
    for (let row of board) {
        for (let cell of row) {
            sum += cell;
        }
    }
    return sum;
}

function simulateMove(board, move) {
    // Simulate the given move on a copy of the board
    let newBoard = JSON.parse(JSON.stringify(board));
    switch (move) {
        case "left":
            simulateSlideLeft(newBoard);
            break;
        case "right":
            simulateSlideRight(newBoard);
            break;
        case "up":
            simulateSlideUp(newBoard);
            break;
        case "down":
            simulateSlideDown(newBoard);
            break;
    }
    return newBoard;
}

function performMove(move) {
    // Perform the given move on the actual game board
    switch (move) {
        case "left":
            slideLeft();
            break;
        case "right":
            slideRight();
            break;
        case "up":
            slideUp();
            break;
        case "down":
            slideDown();
            break;
    }
}

function simulateSlideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        updateTilesForRow(r);
    }
}

function simulateSlideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        updateTilesForColumn(c, row);
    }
}

function simulateSlideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        updateTilesForRow(r);
    }
}

function simulateSlideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        updateTilesForColumn(c, row);
    }
}

function updateTilesForRow(r) {
    for (let c = 0; c < columns; c++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = board[r][c];
        updateTile(tile, num);
    }
}

function updateTilesForColumn(c, row) {
    for (let r = 0; r < rows; r++) {
        board[r][c] = row[r];
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = board[r][c];
        updateTile(tile, num);
    }
}

function stopMinimaxAI() {
    clearInterval(minimaxIntervalId);
    minimaxAIFlag = false; // Reset the flag
}

function mapMoveToArrowKey(move) {
    const arrowKeys = ["left", "up", "right", "down"];
    return arrowKeys[move];
}
