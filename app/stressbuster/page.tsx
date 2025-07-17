"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
}

export default function StressBusterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameOver">("menu")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const gameLoopRef = useRef<number>()

  // Game objects
  const [player, setPlayer] = useState({
    x: 50,
    y: 200,
    width: 40,
    height: 40,
    velocityY: 0,
    isJumping: false,
  })

  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [gameSpeed, setGameSpeed] = useState(2)

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("stressbuster-highscore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("stressbuster-highscore", score.toString())
    }
  }, [score, highScore])

  const resetGame = useCallback(() => {
    setPlayer({
      x: 50,
      y: 200,
      width: 40,
      height: 40,
      velocityY: 0,
      isJumping: false,
    })
    setObstacles([])
    setScore(0)
    setGameSpeed(2)
  }, [])

  const startGame = useCallback(() => {
    resetGame()
    setGameState("playing")
  }, [resetGame])

  const jump = useCallback(() => {
    if (gameState === "playing" && !player.isJumping) {
      setPlayer((prev) => ({
        ...prev,
        velocityY: -12,
        isJumping: true,
      }))
    }
  }, [gameState, player.isJumping])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        if (gameState === "menu" || gameState === "gameOver") {
          startGame()
        } else {
          jump()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState, startGame, jump])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    const gameLoop = setInterval(() => {
      // Update player physics
      setPlayer((prev) => {
        let newY = prev.y + prev.velocityY
        let newVelocityY = prev.velocityY + 0.6
        let newIsJumping = prev.isJumping

        // Ground collision
        if (newY >= 250 - prev.height) {
          newY = 250 - prev.height
          newVelocityY = 0
          newIsJumping = false
        }

        return {
          ...prev,
          y: newY,
          velocityY: newVelocityY,
          isJumping: newIsJumping,
        }
      })

      // Update obstacles
      setObstacles((prev) => {
        const newObstacles = prev
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - gameSpeed,
          }))
          .filter((obstacle) => obstacle.x > -obstacle.width)

        // Add new obstacles
        if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].x < 800 - 300) {
          newObstacles.push({
            x: 800,
            height: 40 + Math.random() * 20,
            width: 20,
            y: 250,
            passed: false,
          })
        }

        return newObstacles
      })

      // Update score and game speed
      setObstacles((prev) => {
        const newObstacles = prev.map((obstacle) => {
          if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
            setScore((s) => s + 1)
            return { ...obstacle, passed: true }
          }
          return obstacle
        })
        return newObstacles
      })

      // Increase game speed gradually
      setGameSpeed((prev) => Math.min(prev + 0.001, 5))
    }, 16) // ~60 FPS

    return () => clearInterval(gameLoop)
  }, [gameState, gameSpeed, player.x])

  // Collision detection
  useEffect(() => {
    if (gameState !== "playing") return

    const checkCollision = () => {
      for (const obstacle of obstacles) {
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y + player.height > 250 - obstacle.height
        ) {
          setGameState("gameOver")
          break
        }
      }
    }

    checkCollision()
  }, [player, obstacles, gameState])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#87CEEB" // Sky blue
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw ground
    ctx.fillStyle = "#90EE90" // Light green
    ctx.fillRect(0, 250, canvas.width, canvas.height - 250)

    // Draw clouds
    ctx.fillStyle = "#FFFFFF"
    for (let i = 0; i < 3; i++) {
      const x = ((i * 300 + ((Date.now() / 50) % 900)) % (canvas.width + 100)) - 100
      ctx.beginPath()
      ctx.arc(x, 50 + i * 20, 20, 0, Math.PI * 2)
      ctx.arc(x + 25, 50 + i * 20, 25, 0, Math.PI * 2)
      ctx.arc(x + 50, 50 + i * 20, 20, 0, Math.PI * 2)
      ctx.fill()
    }

    if (gameState === "playing") {
      // Draw player (simple rectangle with face)
      ctx.fillStyle = "#4A90E2"
      ctx.fillRect(player.x, player.y, player.width, player.height)

      // Draw simple face
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(player.x + 8, player.y + 8, 6, 6) // Left eye
      ctx.fillRect(player.x + 26, player.y + 8, 6, 6) // Right eye
      ctx.fillRect(player.x + 12, player.y + 24, 16, 4) // Mouth

      // Draw obstacles (cacti)
      ctx.fillStyle = "#228B22"
      obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        // Add some cactus details
        ctx.fillRect(obstacle.x - 5, obstacle.y + 10, 8, 15)
        ctx.fillRect(obstacle.x + obstacle.width - 3, obstacle.y + 15, 8, 10)
      })
    }

    // Draw game state text
    ctx.fillStyle = "#333333"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"

    if (gameState === "menu") {
      ctx.fillText("Press SPACE or ↑ to Start!", canvas.width / 2, canvas.height / 2)
      ctx.font = "16px Arial"
      ctx.fillText("Jump over the cacti to score points", canvas.width / 2, canvas.height / 2 + 30)
    } else if (gameState === "gameOver") {
      ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2)
      ctx.font = "16px Arial"
      ctx.fillText("Press SPACE or ↑ to Restart", canvas.width / 2, canvas.height / 2 + 30)
    }

    // Draw score
    ctx.fillStyle = "#333333"
    ctx.font = "bold 20px Arial"
    ctx.textAlign = "left"
    ctx.fillText(`Score: ${score}`, 20, 30)
    ctx.fillText(`High Score: ${highScore}`, 20, 55)
  }, [player, obstacles, gameState, score, highScore])

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-4 sm:py-6 md:py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">StressBuster Game</h1>
          <p className="text-lg text-gray-600 mb-6">
            Take a break and play this simple jumping game to relieve stress!
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Dino Jump Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={800}
                height={300}
                className="border-2 border-gray-300 rounded-lg cursor-pointer max-w-full"
                onClick={() => {
                  if (gameState === "menu" || gameState === "gameOver") {
                    startGame()
                  } else {
                    jump()
                  }
                }}
              />
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-600">Current Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{highScore}</div>
                  <div className="text-sm text-gray-600">High Score</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => {
                    if (gameState === "menu" || gameState === "gameOver") {
                      startGame()
                    } else {
                      jump()
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {gameState === "menu" ? "Start Game" : gameState === "gameOver" ? "Play Again" : "Jump!"}
                </Button>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Controls:</strong> Press SPACE, ↑ arrow key, or click to jump
                </p>
                <p>
                  <strong>Goal:</strong> Jump over the cacti to score points
                </p>
                <p>
                  <strong>Tip:</strong> The game gets faster as your score increases!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Feeling stressed? Take a few minutes to play and clear your mind! 🎮</p>
        </div>
      </div>
    </main>
  )
}
