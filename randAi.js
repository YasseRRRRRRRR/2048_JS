// ai.js


let randomAIFlag = false;
let randomIntervalId;
let aiSpeed = 500; // Initial speed in milliseconds

function startAI() {
    randomIntervalId = setInterval(() => {
        // Generate a random move
        let randomMove = Math.floor(Math.random() * 4); // 0: Left, 1: Right, 2: Up, 3: Down

        // Perform the corresponding move
        performMove(getMoveName(randomMove));

        // Set a new tile after each move
        setTwo();

        // Check for game over after each move
        if (isGameOver()) {
            console.log("AI Game Over!");
            clearInterval(randomIntervalId);
        }

        // Update the score display
        document.getElementById("score").innerText = score;
    }, aiSpeed); // Set the interval based on the current speed

    // Listen for the "m" key press to increase AI speed
    document.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(e) {
    if (e.code === "KeyM") {
        // Increase the speed by reducing the interval
        aiSpeed = Math.max(100, aiSpeed - 50);
        console.log(`AI Speed increased! New speed: ${aiSpeed} milliseconds`);
        // Restart the AI with the new speed
        clearInterval(randomIntervalId);
        startAI();
    }
}

// Helper function to convert move number to move name
function getMoveName(move) {
    switch (move) {
        case 0:
            return "left";
        case 1:
            return "right";
        case 2:
            return "up";
        case 3:
            return "down";
    }
}

function stopRandomAI() {
    clearInterval(randomIntervalId);
    randomAIFlag = false; // Reset the flag
}
