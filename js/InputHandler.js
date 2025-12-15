// کلاس مدیریت ورودی کیبورد

class InputHandler {
    constructor() {
        this.keys = new Map();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys.set(e.key, true);
            
            // جلوگیری از اسکرول با فلش‌ها و Space
            if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys.set(e.key, false);
        });
    }
    
    isKeyPressed(key) {
        return this.keys.get(key) === true;
    }
    
    reset() {
        this.keys.clear();
    }
}
