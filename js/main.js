// نقطه شروع برنامه

let game;

// اجرا پس از بارگذاری کامل صفحه
window.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Ground Defender Loading...');
    
    // ایجاد instance از بازی
    game = new GameEngine();
    
    // نمایش high score در منو
    game.scoreManager.updateDisplay();
    
    console.log('✅ Game Ready!');
});

// جلوگیری از Scroll با کلیدها
window.addEventListener('keydown', (e) => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
});
