import React, { useState, useEffect, useRef } from 'react';
import './DinoGame.css';

const DinoGame = () => {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('dinoHighScore') || 0)
  );
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const characterRef = useRef(null);
  const gameContainerRef = useRef(null);
  const obstaclesRef = useRef([]);
  const gameStateRef = useRef({
    characterY: 0,
    velocityY: 0,
    obstacles: [],
    gameSpeed: 6,
    spawnRate: 0.015,
    frameCount: 0,
  });

  // Game constants
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -15;
  const GROUND_LEVEL = 250;
  const CHARACTER_SIZE = 50;
  const OBSTACLE_WIDTH = 30;
  const OBSTACLE_HEIGHT = 50;
  const MAX_GAME_SPEED = 15;

  // Load high score on mount
  useEffect(() => {
    const saved = localStorage.getItem('dinoHighScore');
    if (saved) {
      setHighScore(parseInt(saved));
    }
  }, []);

  // Handle jump
  const handleJump = () => {
    if (!gameActive || isJumping || gameOver) return;
    
    setIsJumping(true);
    gameStateRef.current.velocityY = JUMP_STRENGTH;
  };

  // Keyboard and touch handlers
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!gameActive && !gameOver) {
          startGame();
        } else {
          handleJump();
        }
      }
    };

    const handleClick = () => {
      if (!gameActive && !gameOver) {
        startGame();
      } else if (gameActive) {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    gameContainerRef.current?.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      gameContainerRef.current?.removeEventListener('click', handleClick);
    };
  }, [gameActive, isJumping, gameOver]);

  // Start game
  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setIsJumping(false);
    gameStateRef.current = {
      characterY: 0,
      velocityY: 0,
      obstacles: [],
      gameSpeed: 6,
      spawnRate: 0.015,
      frameCount: 0,
    };
    obstaclesRef.current = [];
  };

  // Restart game
  const restartGame = () => {
    setGameActive(false);
    setGameOver(false);
    setScore(0);
    setIsJumping(false);
    gameStateRef.current = {
      characterY: 0,
      velocityY: 0,
      obstacles: [],
      gameSpeed: 6,
      spawnRate: 0.015,
      frameCount: 0,
    };
    obstaclesRef.current = [];
    setTimeout(() => startGame(), 100);
  };

  // Main game loop
  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = setInterval(() => {
      const state = gameStateRef.current;

      // Update character position (gravity + jump)
      state.velocityY += GRAVITY;
      state.characterY += state.velocityY;

      if (state.characterY >= GROUND_LEVEL) {
        state.characterY = GROUND_LEVEL;
        state.velocityY = 0;
        setIsJumping(false);
      }

      // Spawn obstacles
      if (Math.random() < state.spawnRate) {
        obstaclesRef.current.push({
          id: Date.now(),
          x: 800,
        });
      }

      // Update obstacles
      obstaclesRef.current = obstaclesRef.current.filter((obstacle) => {
        obstacle.x -= state.gameSpeed;
        return obstacle.x > -OBSTACLE_WIDTH;
      });

      // Collision detection
      obstaclesRef.current.forEach((obstacle) => {
        const characterX = 100;
        const characterBottom = state.characterY + CHARACTER_SIZE;
        const obstacleRight = obstacle.x + OBSTACLE_WIDTH;

        if (
          characterX < obstacleRight &&
          characterX + CHARACTER_SIZE > obstacle.x &&
          characterBottom > GROUND_LEVEL
        ) {
          setGameActive(false);
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('dinoHighScore', score.toString());
          }
        }
      });

      // Increase difficulty
      state.frameCount++;
      if (state.frameCount % 200 === 0) {
        state.gameSpeed = Math.min(state.gameSpeed + 0.5, MAX_GAME_SPEED);
        state.spawnRate = Math.min(state.spawnRate + 0.002, 0.04);
      }

      // Update score
      setScore((prev) => prev + 1);

      // Update character ref position
      if (characterRef.current) {
        characterRef.current.style.bottom = `${state.characterY}px`;
      }

      // Update obstacles
      const obstacleElements = document.querySelectorAll('.obstacle');
      obstacleElements.forEach((element, index) => {
        if (obstaclesRef.current[index]) {
          element.style.left = `${obstaclesRef.current[index].x}px`;
        }
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameActive, score, highScore]);

  return (
    <div className="dino-game-wrapper">
      <div className="dino-game-container" ref={gameContainerRef}>
        {/* Score Display */}
        <div className="score-display">
          <div className="score-item">
            <span className="score-label">Score</span>
            <span className="score-value">{score.toLocaleString()}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Best</span>
            <span className="score-value">{highScore.toLocaleString()}</span>
          </div>
        </div>

        {/* Game Arena */}
        <div className="game-arena">
          {/* Character (Fox) */}
          <div
            className={`character ${isJumping ? 'jumping' : ''}`}
            ref={characterRef}
          >
            <svg
              viewBox="0 0 100 100"
              width="50"
              height="50"
              className="fox-svg"
            >
              {/* Fox body with glass effect */}
              <defs>
                <linearGradient id="foxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#ff4500', stopOpacity: 0.9 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main body */}
              <ellipse
                cx="50"
                cy="60"
                rx="25"
                ry="28"
                fill="url(#foxGradient)"
                filter="url(#glow)"
              />

              {/* Head */}
              <circle
                cx="50"
                cy="35"
                r="22"
                fill="url(#foxGradient)"
                filter="url(#glow)"
              />

              {/* Ears */}
              <polygon
                points="35,15 30,0 40,10"
                fill="url(#foxGradient)"
                filter="url(#glow)"
              />
              <polygon
                points="65,15 70,0 60,10"
                fill="url(#foxGradient)"
                filter="url(#glow)"
              />

              {/* Snout */}
              <ellipse
                cx="50"
                cy="38"
                rx="12"
                ry="10"
                fill="#ffa366"
                opacity="0.8"
              />

              {/* Eyes - glowing effect */}
              <circle cx="45" cy="32" r="3" fill="#00ff88" opacity="0.9" />
              <circle cx="55" cy="32" r="3" fill="#00ff88" opacity="0.9" />
              <circle cx="45" cy="32" r="1.5" fill="#ffffff" />
              <circle cx="55" cy="32" r="1.5" fill="#ffffff" />

              {/* Tail */}
              <path
                d="M 65 70 Q 80 75 85 60"
                stroke="url(#foxGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Running legs (simplified) */}
              <rect x="42" y="80" width="4" height="12" fill="url(#foxGradient)" rx="2" />
              <rect x="54" y="80" width="4" height="12" fill="url(#foxGradient)" rx="2" />
            </svg>
          </div>

          {/* Obstacles */}
          {obstaclesRef.current.map((obstacle) => (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}px`,
              }}
            >
              <div className="obstacle-inner"></div>
            </div>
          ))}

          {/* Ground line */}
          <div className="ground-line"></div>
        </div>

        {/* Start overlay */}
        {!gameActive && !gameOver && (
          <div className="overlay start-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title">🦊 Fox Runner</h2>
              <p className="overlay-text">Press SPACE or Click to Start</p>
              <div className="controls-hint">
                <p>Jump over obstacles to survive</p>
                <p className="control-text">SPACEBAR or CLICK to Jump</p>
              </div>
            </div>
          </div>
        )}

        {/* Game over overlay */}
        {gameOver && (
          <div className="overlay game-over-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title">Game Over</h2>
              <div className="final-stats">
                <div className="stat-box">
                  <span className="stat-label">Final Score</span>
                  <span className="stat-number">{score.toLocaleString()}</span>
                </div>
                {score === highScore && score > 0 && (
                  <div className="stat-box highlight">
                    <span className="stat-label">🎉 New Record!</span>
                  </div>
                )}
                <div className="stat-box">
                  <span className="stat-label">Best Score</span>
                  <span className="stat-number">{highScore.toLocaleString()}</span>
                </div>
              </div>
              <button className="restart-button" onClick={restartGame}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DinoGame;
