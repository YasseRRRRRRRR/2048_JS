// ai.js

function startAI() {
    // Function to start the AI playing the game
    const intervalId = setInterval(() => {
        // Generate a random move
        let randomMove = Math.floor(Math.random() * 4); // 0: Left, 1: Right, 2: Up, 3: Down

        // Perform the corresponding move
        switch (randomMove) {
            case 0:
                slideLeft();
                break;
            case 1:
                slideRight();
                break;
            case 2:
                slideUp();
                break;
            case 3:
                slideDown();
                break;
        }

        // Set a new tile after each move
        setTwo();
        
        // Check for game over after each move
        if (isGameOver()) {
            // Perform actions when the game is over for the AI
            console.log("AI Game Over!");

            // Optionally, reset the game or display a message
            resetGame(); // Add a function to reset the game
            // Alternatively, display a message
            // alert("AI Game Over! The game has been reset."); 

            // Stop the AI interval
            clearInterval(intervalId);
        }

        // Update the score display
        document.getElementById("score").innerText = score;
    }, 500); // Adjust the interval as needed
}

function resetGame() {
    // Add code to reset the game
    // You can reinitialize the board, score, and any other necessary variables
    setGame();
}


document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        // Start the AI when the space bar is pressed
        startAI();
    }
});
