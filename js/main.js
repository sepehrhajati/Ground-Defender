// Application Entry Point


let game;


// Execute after full page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Ground Defender Loading...');
    
    // Create game instance
    game = new GameEngine();
    
    // Show high score in menu
    game.scoreManager.updateDisplay();
    
    console.log('✅ Game Ready!');
});


// Prevent scrolling with keys
window.addEventListener('keydown', (e) => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
});
