# 🎮 Ground Defender

A 2D platformer shooter game built with vanilla JavaScript and HTML5 Canvas.

![Game Banner](https://img.shields.io/badge/Game-Ground%20Defender-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 About

Ground Defender is a fast-paced arcade-style game where you defend your ground from falling enemies. Enemies spawn from the sky and fall with realistic gravity physics. Your mission: shoot them down before they reach you!

## ✨ Features

- 🎮 **Three Difficulty Levels**: Easy, Medium, and Hard
- 🏆 **High Score System**: Tracks your best performance with LocalStorage
- ⚡ **Realistic Physics**: Gravity simulation and collision detection
- 🎨 **Clean Design**: Minimalist UI with smooth animations
- ⏸️ **Pause/Resume**: Take a break anytime with ESC key
- 📱 **Responsive**: Optimized canvas rendering

## 🕹️ How to Play

### Controls
- **Arrow Left/Right** (← →): Move player
- **Arrow Up** (↑) or **Space**: Jump
- **Space**: Shoot
- **ESC**: Pause game

### Game Rules
1. Choose your difficulty level
2. Enemies fall from the sky with gravity
3. Shoot them before they hit you or the ground
4. Survive as long as possible and beat your high score!
5. One hit = Game Over

## 🚀 Play Online

**[▶️ Play Ground Defender](https://sepehrhajati.github.io/Ground-Defender/)**

Try it now in your browser - no installation required!

## 💻 Run Locally

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server

### Installation

1. Clone the repository

```bash
git clone https://github.com/sepehrhajati/Ground-Defender.git
cd Ground-Defender
```

2. Open with a local server (recommended)

Using Python 3

```bash
python -m http.server 8000
```

Using Node.js

```bash
npx http-server
Or simply open index.html in your browser
```


3. Navigate to `http://localhost:8000` in your browser

## 🛠️ Technology Stack

- **HTML5** - Structure and Canvas element
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Game logic and OOP architecture
- **Canvas API** - 2D graphics rendering
- **LocalStorage API** - Score persistence


## 🎨 Game Architecture

The game follows Object-Oriented Programming principles with a clean class hierarchy:

- **GameObject** (Abstract base class)
  - Player
  - Enemy
  - Bullet
- **GameEngine** (Manages game loop and state)
- **InputHandler** (Processes keyboard events)
- **ScoreManager** (Handles scoring and persistence)

## 🎮 Gameplay Screenshots

### Main Menu
Select your difficulty and start your defense!

### In-Game Action
Fast-paced shooting and dodging mechanics.

### Game Over
Track your progress and beat your high score!

## 🔮 Future Enhancements

- [ ] Power-ups and special weapons
- [ ] Multiple enemy types with unique behaviors
- [ ] Boss battles
- [ ] Sound effects and background music
- [ ] Online leaderboard
- [ ] Mobile touch controls
- [ ] Multiplayer mode

## 📊 Technical Highlights

- **Efficient Rendering**: Optimized Canvas API usage for smooth 60 FPS gameplay
- **Delta Time**: Frame-rate independent physics calculations
- **Collision Detection**: AABB (Axis-Aligned Bounding Box) algorithm
- **State Management**: Clean separation of game states (Menu, Running, Paused, Game Over)
- **Object Pooling**: Memory-efficient entity management
- **Modular Design**: Separated concerns with dedicated classes

## 🐛 Known Issues

None at the moment! If you find any bugs, please open an issue.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sepehr Hajati**

- GitHub: [@sepehrhajati](https://github.com/sepehrhajati)

## 🙏 Acknowledgments

- Built with passion for classic arcade games
- Inspired by Space Invaders and similar retro shooters
- Special thanks to the open-source community

---

**Enjoy the game! 🎮**

*If you like this project, please give it a ⭐ on GitHub*

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/sepehrhajati/Ground-Defender?style=social)
![GitHub forks](https://img.shields.io/github/forks/sepehrhajati/Ground-Defender?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/sepehrhajati/Ground-Defender?style=social)

---

**Made with ❤️ and JavaScript**