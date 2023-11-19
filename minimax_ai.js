// minimax_ai.js

// Constants for moves
const MOVES = ["left", "right", "up", "down"];

function startMinimaxAI() {
    const intervalId = setInterval(() => {
        let bestMove = minimax(board, 3, true); // Adjust the depth as needed

        // Perform the corresponding move
        performMove(bestMove);

        // Set a new tile after each move
        setTwo();

        // Check for game over after each move
        if (isGameOver()) {
            console.log("Minimax AI Game Over!");
            clearInterval(intervalId);
        }

        // Update the score display
        document.getElementById("score").innerText = score;
    }, 500); // Adjust the interval as needed
}

function minimax(board, depth, maximizingPlayer) {
    // Terminal condition: Check if the given depth is 0 or game over
    if (depth === 0 || isGameOver()) {
        // Evaluate the current state using the PERFECT_SNAKE heuristic
        return evaluateHeuristic(board);
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;

        // Iterate over all possible moves
        for (let move of MOVES) {
            let newBoard = simulateMove(board, move);
            let eval = minimax(newBoard, depth - 1, false);
            maxEval = Math.max(maxEval, eval);
        }

        return maxEval;
    } else {
        let minEval = Infinity;

        // Iterate over all possible moves
        for (let move of MOVES) {
            let newBoard = simulateMove(board, move);
            let eval = minimax(newBoard, depth - 1, true);
            minEval = Math.min(minEval, eval);
        }

        return minEval;
    }
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
            slideLeft(newBoard);
            break;
        case "right":
            slideRight(newBoard);
            break;
        case "up":
            slideUp(newBoard);
            break;
        case "down":
            slideDown(newBoard);
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


document.addEventListener("keyup", (e) => {
    if (e.code === "KeyM") {
        // Start the Minimax AI when the 'm' key is pressed
        startMinimaxAI();
    }
});
