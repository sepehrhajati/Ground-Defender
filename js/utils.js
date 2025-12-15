// توابع کمکی

const Utils = {
    // تولید عدد تصادفی
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // تولید رنگ تصادفی
    randomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    // محدود کردن مقدار بین min و max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
};
