// کلاس گلوله

class Bullet extends GameObject {
    constructor(x, y) {
        super(x, y, 6, 15);
        this.velocity = -500; // به سمت بالا
        this.color = '#FFD700';
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    update(deltaTime) {
        this.y += this.velocity * deltaTime;
    }
}
