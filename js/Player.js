// کلاس بازیکن

class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 40, 40);
        this.speed = 800; // پیکسل در ثانیه
        this.velocityY = 0;
        this.isJumping = false;
        this.jumpPower = -400;
        this.gravity = 1000;
        this.groundY = y;
        this.color = '#4ECDC4';
    }
    
    draw(ctx) {
        // رسم بازیکن (مثلث)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // رسم سلاح
        ctx.fillStyle = '#FFA07A';
        ctx.fillRect(this.x + this.width / 2 - 3, this.y - 10, 6, 10);
    }
    
    update(deltaTime, canvasWidth) {
        // اعمال گرانش
        if (this.y < this.groundY) {
            this.velocityY += this.gravity * deltaTime;
            this.y += this.velocityY * deltaTime;
            
            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.velocityY = 0;
                this.isJumping = false;
            }
        }
        
        // محدود کردن حرکت در Canvas
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
