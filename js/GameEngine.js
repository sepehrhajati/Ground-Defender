// Main Game Engine


class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set Canvas Size
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Game State
        this.gameState = 'MENU'; // MENU, RUNNING, PAUSED, GAME_OVER
        this.difficulty = 'easy';
        
        // Entities
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        
        // Managers
        this.inputHandler = new InputHandler();
        this.scoreManager = new ScoreManager();
        
        // Timers
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 2000; // milliseconds
        
        // Animation
        this.lastTime = 0;
        this.animationId = null;
    }
    
    startGame(difficulty) {
        this.difficulty = difficulty;
        this.scoreManager.setDifficulty(difficulty);
        this.scoreManager.reset();
        
        // Set spawn interval based on difficulty
        switch(difficulty) {
            case 'easy':
                this.enemySpawnInterval = 2000;
                break;
            case 'medium':
                this.enemySpawnInterval = 1500;
                break;
            case 'hard':
                this.enemySpawnInterval = 1000;
                break;
        }
        
        // Create Player
        const playerX = this.canvas.width / 2 - 20;
        const playerY = this.canvas.height - 60;
        this.player = new Player(playerX, playerY);
        
        // Clear arrays
        this.enemies = [];
        this.bullets = [];
        
        // Setup UI
        this.showScreen('game-screen');
        document.getElementById('difficulty').textContent = this.getDifficultyText(difficulty);
        this.scoreManager.updateDisplay();
        
        // Start Game Loop
        this.gameState = 'RUNNING';
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
    
    gameLoop(currentTime) {
        if (this.gameState !== 'RUNNING') {
            return;
        }
        
        // Calculate deltaTime (in seconds)
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        // Update
        this.update(deltaTime);
        
        // Render
        this.render();
        
        // Request next frame
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        // Check Input
        this.handleInput(deltaTime);
        
        // Update Player
        this.player.update(deltaTime, this.canvas.width);
        
        // Update Bullets
        this.bullets.forEach(bullet => bullet.update(deltaTime));
        
        // Update Enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime));
        
        // Spawn Enemy
        this.enemySpawnTimer += deltaTime * 1000;
        if (this.enemySpawnTimer >= this.enemySpawnInterval) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
        }
        
        // Check Collisions
        this.checkCollisions();
        
        // Cleanup inactive objects
        this.cleanup();
    }
    
    handleInput(deltaTime) {
        // Movement
        if (this.inputHandler.isKeyPressed('ArrowLeft')) {
            this.player.moveLeft(deltaTime);
        }
        if (this.inputHandler.isKeyPressed('ArrowRight')) {
            this.player.moveRight(deltaTime);
        }
        
        // Jump
        if (this.inputHandler.isKeyPressed('ArrowUp')) {
            this.player.jump();
        }
        
        // Shoot
        if (this.inputHandler.isKeyPressed(' ')) {
            const bullet = this.player.shoot();
            this.bullets.push(bullet);
            // Prevent continuous shooting
            this.inputHandler.keys.set(' ', false);
        }
        
        // Pause
        if (this.inputHandler.isKeyPressed('Escape')) {
            this.pauseGame();
            this.inputHandler.keys.set('Escape', false);
        }
    }
    
    spawnEnemy() {
        const x = Utils.randomInt(0, this.canvas.width - 30);
        const enemy = new Enemy(x, this.difficulty);
        this.enemies.push(enemy);
    }
    
    checkCollisions() {
        // Bullet vs Enemy Collision
        this.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                if (bullet.isActive && enemy.isActive && bullet.checkCollision(enemy)) {
                    bullet.isActive = false;
                    enemy.isActive = false;
                    this.scoreManager.incrementScore(10);
                }
            });
        });
        
        // Enemy vs Player Collision
        this.enemies.forEach(enemy => {
            if (enemy.isActive && enemy.checkCollision(this.player)) {
                this.gameOver();
            }
        });
    }
    
    cleanup() {
        // Remove off-screen bullets
        this.bullets = this.bullets.filter(bullet => 
            bullet.isActive && !bullet.isOutOfBounds(this.canvas.width, this.canvas.height)
        );
        
        // Remove inactive or off-screen enemies
        this.enemies = this.enemies.filter(enemy => {
            if (enemy.y > this.canvas.height) {
                // Enemy reached the bottom = Game Over
                this.gameOver();
                return false;
            }
            return enemy.isActive;
        });
    }
    
    render() {
        // Clear Canvas
        this.ctx.fillStyle = '#0f0f1e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw Ground Line
        this.ctx.strokeStyle = '#4ECDC4';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 50);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 50);
        this.ctx.stroke();
        
        // Draw Player
        this.player.draw(this.ctx);
        
        // Draw Bullets
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        
        // Draw Enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
    }
    
    pauseGame() {
        if (this.gameState === 'RUNNING') {
            this.gameState = 'PAUSED';
            cancelAnimationFrame(this.animationId);
            document.getElementById('pause-overlay').classList.remove('hidden');
        }
    }
    
    resumeGame() {
        if (this.gameState === 'PAUSED') {
            this.gameState = 'RUNNING';
            document.getElementById('pause-overlay').classList.add('hidden');
            this.lastTime = performance.now();
            this.gameLoop(this.lastTime);
        }
    }
    
    gameOver() {
        this.gameState = 'GAME_OVER';
        cancelAnimationFrame(this.animationId);
        
        // Save Score
        this.scoreManager.saveHighScore();
        
        // Show Game Over Screen
        document.getElementById('final-score').textContent = this.scoreManager.currentScore;
        document.getElementById('final-high-score').textContent = this.scoreManager.highScore;
        
        if (this.scoreManager.isNewRecord()) {
            document.getElementById('new-record').classList.remove('hidden');
        } else {
            document.getElementById('new-record').classList.add('hidden');
        }
        
        this.showScreen('gameover-screen');
    }
    
    backToMenu() {
        this.gameState = 'MENU';
        cancelAnimationFrame(this.animationId);
        this.scoreManager.updateDisplay();
        this.showScreen('menu-screen');
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.remove('hidden');
    }
    
    getDifficultyText(difficulty) {
        const texts = {
            'easy': 'Easy 🟢',
            'medium': 'Medium 🟡',
            'hard': 'Hard 🔴'
        };
        return texts[difficulty] || difficulty;
    }
}
