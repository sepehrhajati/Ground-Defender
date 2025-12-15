// موتور اصلی بازی

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // تنظیم اندازه Canvas
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // State بازی
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
        this.enemySpawnInterval = 2000; // میلی‌ثانیه
        
        // Animation
        this.lastTime = 0;
        this.animationId = null;
    }
    
    startGame(difficulty) {
        this.difficulty = difficulty;
        this.scoreManager.setDifficulty(difficulty);
        this.scoreManager.reset();
        
        // تنظیم فاصله spawn بر اساس سختی
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
        
        // ایجاد Player
        const playerX = this.canvas.width / 2 - 20;
        const playerY = this.canvas.height - 60;
        this.player = new Player(playerX, playerY);
        
        // پاک کردن آرایه‌ها
        this.enemies = [];
        this.bullets = [];
        
        // تنظیم UI
        this.showScreen('game-screen');
        document.getElementById('difficulty').textContent = this.getDifficultyText(difficulty);
        this.scoreManager.updateDisplay();
        
        // شروع Game Loop
        this.gameState = 'RUNNING';
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
    
    gameLoop(currentTime) {
        if (this.gameState !== 'RUNNING') {
            return;
        }
        
        // محاسبه deltaTime (به ثانیه)
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        // Update
        this.update(deltaTime);
        
        // Render
        this.render();
        
        // درخواست فریم بعدی
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        // بررسی Input
        this.handleInput(deltaTime);
        
        // Update Player
        this.player.update(deltaTime, this.canvas.width);
        
        // Update Bullets
        this.bullets.forEach(bullet => bullet.update(deltaTime));
        
        // Update Enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime));
        
        // Spawn دشمن
        this.enemySpawnTimer += deltaTime * 1000;
        if (this.enemySpawnTimer >= this.enemySpawnInterval) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
        }
        
        // بررسی برخوردها
        this.checkCollisions();
        
        // پاک کردن اشیاء غیرفعال
        this.cleanup();
    }
    
    handleInput(deltaTime) {
        // حرکت
        if (this.inputHandler.isKeyPressed('ArrowLeft')) {
            this.player.moveLeft(deltaTime);
        }
        if (this.inputHandler.isKeyPressed('ArrowRight')) {
            this.player.moveRight(deltaTime);
        }
        
        // پرش
        if (this.inputHandler.isKeyPressed('ArrowUp')) {
            this.player.jump();
        }
        
        // شلیک
        if (this.inputHandler.isKeyPressed(' ')) {
            const bullet = this.player.shoot();
            this.bullets.push(bullet);
            // جلوگیری از شلیک مداوم
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
        // برخورد Bullet با Enemy
        this.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                if (bullet.isActive && enemy.isActive && bullet.checkCollision(enemy)) {
                    bullet.isActive = false;
                    enemy.isActive = false;
                    this.scoreManager.incrementScore(10);
                }
            });
        });
        
        // برخورد Enemy با Player
        this.enemies.forEach(enemy => {
            if (enemy.isActive && enemy.checkCollision(this.player)) {
                this.gameOver();
            }
        });
    }
    
    cleanup() {
        // حذف گلوله‌های خارج از صفحه
        this.bullets = this.bullets.filter(bullet => 
            bullet.isActive && !bullet.isOutOfBounds(this.canvas.width, this.canvas.height)
        );
        
        // حذف دشمنان غیرفعال یا خارج از صفحه
        this.enemies = this.enemies.filter(enemy => {
            if (enemy.y > this.canvas.height) {
                // دشمن از پایین خارج شد = Game Over
                this.gameOver();
                return false;
            }
            return enemy.isActive;
        });
    }
    
    render() {
        // پاک کردن Canvas
        this.ctx.fillStyle = '#0f0f1e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // رسم خط زمین
        this.ctx.strokeStyle = '#4ECDC4';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 50);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 50);
        this.ctx.stroke();
        
        // رسم Player
        this.player.draw(this.ctx);
        
        // رسم Bullets
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        
        // رسم Enemies
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
        
        // ذخیره امتیاز
        this.scoreManager.saveHighScore();
        
        // نمایش صفحه Game Over
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
        // پنهان کردن همه صفحات
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // نمایش صفحه مورد نظر
        document.getElementById(screenId).classList.remove('hidden');
    }
    
    getDifficultyText(difficulty) {
        const texts = {
            'easy': 'آسان 🟢',
            'medium': 'متوسط 🟡',
            'hard': 'سخت 🔴'
        };
        return texts[difficulty] || difficulty;
    }
}
