// کلاس دشمن

class Enemy extends GameObject {
    constructor(x, difficulty) {
        super(x, -50, 50, 50); // تغییر از 30×30 به 50×50
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
        // رسم دشمن (مربع)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // رسم چشم‌ها (تنظیم شده برای سایز جدید)
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 12, this.y + 15, 10, 10);  // چشم چپ
        ctx.fillRect(this.x + 28, this.y + 15, 10, 10);  // چشم راست
        
        // رسم دهان (اضافه کردم برای جذاب‌تر شدن)
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 15, this.y + 35, 20, 3);
    }
    
    update(deltaTime) {
        // سقوط با گرانش
        this.velocityY += this.gravity * deltaTime;
        this.y += this.velocityY * deltaTime;
    }
}
