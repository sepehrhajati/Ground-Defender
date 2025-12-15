// Score Management Class


class ScoreManager {
    constructor() {
        this.currentScore = 0;
        this.highScore = this.loadHighScore();
        this.difficulty = 'easy';
    }
    
    incrementScore(points = 10) {
        this.currentScore += points;
        this.updateDisplay();
        
        // Check for new record
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
        }
    }
    
    reset() {
        this.currentScore = 0;
        this.updateDisplay();
    }
    
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }
    
    saveHighScore() {
        const data = {
            score: this.highScore,
            difficulty: this.difficulty,
            date: new Date().toISOString()
        };
        localStorage.setItem('groundDefenderHighScore', JSON.stringify(data));
    }
    
    loadHighScore() {
        const data = localStorage.getItem('groundDefenderHighScore');
        if (data) {
            const parsed = JSON.parse(data);
            return parsed.score || 0;
        }
        return 0;
    }
    
    updateDisplay() {
        const scoreElement = document.getElementById('score');
        const highScoreElement = document.getElementById('high-score');
        const menuHighScore = document.getElementById('menu-high-score');
        
        if (scoreElement) scoreElement.textContent = this.currentScore;
        if (highScoreElement) highScoreElement.textContent = this.highScore;
        if (menuHighScore) menuHighScore.textContent = this.highScore;
    }
    
    isNewRecord() {
        return this.currentScore === this.highScore && this.currentScore > 0;
    }
}
