// کلاس دشمن

class Enemy extends GameObject {
    constructor(x, difficulty) {
        super(x, -30, 30, 30);
        this.baseSpeed = this.getSpeedByDifficulty(difficulty);
        this.velocityY = 0;
        this.gravity = 500;
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
        // رسم دشمن (مربع)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // رسم چشم‌ها
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 7, this.y + 10, 6, 6);
        ctx.fillRect(this.x + 17, this.y + 10, 6, 6);
    }
    
    update(deltaTime) {
        // سقوط با گرانش
        this.velocityY += this.gravity * deltaTime;
        this.y += this.velocityY * deltaTime;
    }
}
