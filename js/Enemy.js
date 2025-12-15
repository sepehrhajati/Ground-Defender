// Enemy Class


class Enemy extends GameObject {
    constructor(x, difficulty) {
        super(x, -50, 50, 50); // Changed from 30x30 to 50x50
        this.baseSpeed = this.getSpeedByDifficulty(difficulty);
        this.velocityY = 0;
        this.gravity = 200;
        this.color = Utils.randomColor();
        this.damage = 1;
    }
    
    getSpeedByDifficulty(difficulty) {
        switch(difficulty) {
            case 'easy': return 100;
            case 'medium': return 200;
            case 'hard': return 300;
            default: return 150;
        }
    }
    
    draw(ctx) {
        // Draw enemy (square)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw eyes (adjusted for new size)
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 12, this.y + 15, 10, 10);  // Left eye
        ctx.fillRect(this.x + 28, this.y + 15, 10, 10);  // Right eye
        
        // Draw mouth (added for visual appeal)
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 15, this.y + 35, 20, 3);
    }
    
    update(deltaTime) {
        // Fall with gravity
        this.velocityY += this.gravity * deltaTime;
        this.y += this.velocityY * deltaTime;
    }
}
