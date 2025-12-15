// کلاس پایه برای تمام اشیاء بازی

class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isActive = true;
    }
    
    draw(ctx) {
        // باید در کلاس‌های فرزند Override شود
    }
    
    update(deltaTime) {
        // باید در کلاس‌های فرزند Override شود
    }
    
    checkCollision(otherObject) {
        return (
            this.x < otherObject.x + otherObject.width &&
            this.x + this.width > otherObject.x &&
            this.y < otherObject.y + otherObject.height &&
            this.y + this.height > otherObject.y
        );
    }
    
    isOutOfBounds(canvasWidth, canvasHeight) {
        return (
            this.x + this.width < 0 ||
            this.x > canvasWidth ||
            this.y + this.height < 0 ||
            this.y > canvasHeight
        );
    }
}
