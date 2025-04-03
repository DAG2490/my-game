// Get the canvas and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player settings
let playerWidth = 50;
let playerHeight = 50;
let playerX = canvas.width / 2 - playerWidth / 2;
let playerY = canvas.height - playerHeight - 10;
let playerSpeed = 5;

// Obstacle settings
let obstacles = [];
let obstacleWidth = 50;
let obstacleHeight = 50;
let obstacleSpeed = 5;

// Score settings
let score = 0;

// Handle player movement
let keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Update game state
function update() {
    // Move the player
    if (keys['ArrowLeft'] && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys['ArrowRight'] && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
    if (keys['ArrowUp'] && playerY > 0) {
        playerY -= playerSpeed;
    }
    if (keys['ArrowDown'] && playerY < canvas.height - playerHeight) {
        playerY += playerSpeed;
    }

    // Add new obstacles
    if (Math.random() < 0.02) {  // Adjust the rate at which obstacles spawn
        let obstacleX = Math.random() * (canvas.width - obstacleWidth);
        obstacles.push({ x: obstacleX, y: 0 });
    }

    // Move obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;
    }

    // Check for collision
    for (let i = 0; i < obstacles.length; i++) {
        if (
            playerX < obstacles[i].x + obstacleWidth &&
            playerX + playerWidth > obstacles[i].x &&
            playerY < obstacles[i].y + obstacleHeight &&
            playerY + playerHeight > obstacles[i].y
        ) {
            alert('Game Over! Final Score: ' + score);
            resetGame();
            return;
        }
    }

    // Update the score
    score++;

    // Increase difficulty over time
    if (score % 100 === 0) {
        playerSpeed += 0.1;
        obstacleSpeed += 0.1;
    }
}

// Draw the game
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacleWidth, obstacleHeight);
    }

    // Draw the player
    ctx.fillStyle = "red";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

    // Display score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Reset game state
function resetGame() {
    playerX = canvas.width / 2 - playerWidth / 2;
    playerY = canvas.height - playerHeight - 10;
    playerSpeed = 5;
    obstacleSpeed = 5;
    obstacles = [];
    score = 0;
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
