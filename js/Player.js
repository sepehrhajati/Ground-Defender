// Player Class


class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 40, 40);
        this.speed = 800; // pixels per second
        this.velocityY = 0;
        this.isJumping = false;
        this.jumpPower = -400;
        this.gravity = 1000;
        this.groundY = y;
        this.color = '#4ECDC4';
    }
    
    draw(ctx) {
        // Draw player (triangle)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // Draw weapon
        ctx.fillStyle = '#FFA07A';
        ctx.fillRect(this.x + this.width / 2 - 3, this.y - 10, 6, 10);
    }
    
    update(deltaTime, canvasWidth) {
        // Apply gravity
        if (this.y < this.groundY) {
            this.velocityY += this.gravity * deltaTime;
            this.y += this.velocityY * deltaTime;
            
            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.velocityY = 0;
                this.isJumping = false;
            }
        }
        
        // Constrain movement within Canvas
        this.x = Utils.clamp(this.x, 0, canvasWidth - this.width);
    }
    
    moveLeft(deltaTime) {
        this.x -= this.speed * deltaTime;
    }
    
    moveRight(deltaTime) {
        this.x += this.speed * deltaTime;
    }
    
    jump() {
        if (!this.isJumping) {
            this.velocityY = this.jumpPower;
            this.isJumping = true;
        }
    }
    
    shoot() {
        return new Bullet(this.x + this.width / 2 - 3, this.y - 10);
    }
}
