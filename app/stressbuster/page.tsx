"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GameObject {
  x: number
  y: number
  width: number
  height: number
}

interface Obstacle extends GameObject {
  type: "cactus" | "pterodactyl"
}

export default function StressBusterPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<"waiting" | "playing" | "gameOver">("waiting")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const gameLoopRef = useRef<number>()

  // Game variables
  const gameRef = useRef({
    dino: { x: 50, y: 150, width: 44, height: 47, velocityY: 0, isJumping: false, isDucking: false },
    obstacles: [] as Obstacle[],
    clouds: [] as GameObject[],
    gameSpeed: 6,
    groundX: 0,
    frameCount: 0,
  })

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("dinoHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("dinoHighScore", score.toString())
    }
  }, [score, highScore])

  // Draw functions
  const drawDino = (ctx: CanvasRenderingContext2D, dino: any) => {
    ctx.fillStyle = "#535353"

    if (dino.isDucking) {
      // Ducking dinosaur
      ctx.fillRect(dino.x, dino.y + 20, 59, 27)
      // Eye
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(dino.x + 12, dino.y + 25, 4, 4)
      ctx.fillStyle = "#535353"
      // Legs while ducking
      ctx.fillRect(dino.x + 45, dino.y + 40, 6, 7)
      ctx.fillRect(dino.x + 35, dino.y + 40, 6, 7)
    } else {
      // Body
      ctx.fillRect(dino.x, dino.y, 25, 25)
      ctx.fillRect(dino.x + 25, dino.y + 5, 19, 19)

      // Head
      ctx.fillRect(dino.x + 6, dino.y - 6, 6, 6)
      ctx.fillRect(dino.x + 12, dino.y - 8, 13, 8)

      // Eye
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(dino.x + 15, dino.y - 6, 4, 4)
      ctx.fillStyle = "#535353"

      // Legs (animated based on score for running effect)
      const legOffset = Math.floor(score / 10) % 2 === 0 ? 0 : 2
      ctx.fillRect(dino.x + 2 + legOffset, dino.y + 25, 6, 14)
      ctx.fillRect(dino.x + 15 - legOffset, dino.y + 25, 6, 14)

      // Arms
      ctx.fillRect(dino.x + 30, dino.y + 10, 8, 4)

      // Tail
      ctx.fillRect(dino.x - 6, dino.y + 8, 6, 4)
    }
  }

  const drawCactus = (ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.fillStyle = "#535353"
    // Main body
    ctx.fillRect(obstacle.x, obstacle.y, 12, obstacle.height)
    // Arms
    ctx.fillRect(obstacle.x - 6, obstacle.y + 10, 6, 15)
    ctx.fillRect(obstacle.x + 12, obstacle.y + 5, 6, 20)
  }

  const drawPterodactyl = (ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.fillStyle = "#535353"
    // Body
    ctx.fillRect(obstacle.x + 8, obstacle.y + 8, 15, 8)
    // Head
    ctx.fillRect(obstacle.x + 21, obstacle.y + 5, 8, 8)
    // Beak
    ctx.fillRect(obstacle.x + 29, obstacle.y + 8, 4, 3)

    // Wings (animated)
    const wingFlap = Math.floor(Date.now() / 200) % 2
    if (wingFlap === 0) {
      ctx.fillRect(obstacle.x, obstacle.y, 15, 4)
      ctx.fillRect(obstacle.x, obstacle.y + 16, 15, 4)
    } else {
      ctx.fillRect(obstacle.x + 2, obstacle.y + 2, 12, 4)
      ctx.fillRect(obstacle.x + 2, obstacle.y + 14, 12, 4)
    }
  }

  const drawCloud = (ctx: CanvasRenderingContext2D, cloud: GameObject) => {
    ctx.fillStyle = "#f0f0f0"
    // Simple cloud shape
    ctx.fillRect(cloud.x, cloud.y, 46, 14)
    ctx.fillRect(cloud.x + 10, cloud.y - 4, 26, 8)
    ctx.fillRect(cloud.x + 16, cloud.y - 8, 14, 8)
  }

  const drawGround = (ctx: CanvasRenderingContext2D, groundX: number) => {
    ctx.fillStyle = "#535353"
    const groundY = 197
    ctx.fillRect(0, groundY, ctx.canvas.width, 2)

    // Ground pattern
    for (let x = groundX; x < ctx.canvas.width + 20; x += 20) {
      if (x % 40 === 0) {
        ctx.fillRect(x, groundY + 3, 2, 2)
      }
    }
  }

  const drawScore = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#535353"
    ctx.font = "12px monospace"
    ctx.textAlign = "right"

    // High score
    if (highScore > 0) {
      ctx.fillText(`HI ${highScore.toString().padStart(5, "0")}`, ctx.canvas.width - 10, 25)
    }

    // Current score
    ctx.fillText(score.toString().padStart(5, "0"), ctx.canvas.width - 10, 45)
  }

  const checkCollision = (dino: any, obstacle: Obstacle): boolean => {
    const dinoRect = {
      x: dino.x + 4,
      y: dino.isDucking ? dino.y + 20 : dino.y,
      width: dino.isDucking ? 55 : 40,
      height: dino.isDucking ? 25 : 43,
    }

    const obstacleRect = {
      x: obstacle.x + 2,
      y: obstacle.y,
      width: obstacle.width - 4,
      height: obstacle.height,
    }

    return (
      dinoRect.x < obstacleRect.x + obstacleRect.width &&
      dinoRect.x + dinoRect.width > obstacleRect.x &&
      dinoRect.y < obstacleRect.y + obstacleRect.height &&
      dinoRect.y + dinoRect.height > obstacleRect.y
    )
  }

  const gameLoop = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const game = gameRef.current

    // Clear canvas
    ctx.fillStyle = "#f7f7f7"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (gameState === "waiting") {
      // Draw static dino
      drawDino(ctx, game.dino)
      drawGround(ctx, 0)

      // Instructions
      ctx.fillStyle = "#535353"
      ctx.font = "16px monospace"
      ctx.textAlign = "center"
      ctx.fillText("Press SPACE to play", canvas.width / 2, 100)

      return
    }

    if (gameState === "gameOver") {
      // Draw everything static
      drawDino(ctx, game.dino)
      game.obstacles.forEach((obstacle) => {
        if (obstacle.type === "cactus") {
          drawCactus(ctx, obstacle)
        } else {
          drawPterodactyl(ctx, obstacle)
        }
      })
      drawGround(ctx, game.groundX)
      drawScore(ctx)

      // Game over text
      ctx.fillStyle = "#535353"
      ctx.font = "16px monospace"
      ctx.textAlign = "center"
      ctx.fillText("G A M E  O V E R", canvas.width / 2, 100)
      ctx.font = "12px monospace"
      ctx.fillText("Press SPACE to restart", canvas.width / 2, 120)

      return
    }

    // Game playing logic
    game.frameCount++

    // Update dino physics
    if (game.dino.isJumping) {
      game.dino.velocityY += 0.6 // gravity
      game.dino.y += game.dino.velocityY

      if (game.dino.y >= 150) {
        game.dino.y = 150
        game.dino.isJumping = false
        game.dino.velocityY = 0
      }
    }

    // Move ground
    game.groundX -= game.gameSpeed
    if (game.groundX <= -20) {
      game.groundX = 0
    }

    // Generate obstacles
    if (game.frameCount % 90 === 0) {
      const obstacleType = Math.random() > 0.5 ? "cactus" : "pterodactyl"
      const obstacle: Obstacle = {
        x: canvas.width,
        y: obstacleType === "cactus" ? 165 : 120 + Math.random() * 30,
        width: obstacleType === "cactus" ? 17 : 46,
        height: obstacleType === "cactus" ? 35 : 20,
        type: obstacleType,
      }
      game.obstacles.push(obstacle)
    }

    // Generate clouds
    if (game.frameCount % 200 === 0) {
      game.clouds.push({
        x: canvas.width,
        y: 20 + Math.random() * 50,
        width: 46,
        height: 14,
      })
    }

    // Move obstacles
    game.obstacles = game.obstacles.filter((obstacle) => {
      obstacle.x -= game.gameSpeed
      return obstacle.x > -obstacle.width
    })

    // Move clouds
    game.clouds = game.clouds.filter((cloud) => {
      cloud.x -= game.gameSpeed * 0.5
      return cloud.x > -cloud.width
    })

    // Check collisions
    for (const obstacle of game.obstacles) {
      if (checkCollision(game.dino, obstacle)) {
        setGameState("gameOver")
        return
      }
    }

    // Update score
    if (game.frameCount % 6 === 0) {
      setScore((prev) => prev + 1)
    }

    // Increase game speed
    game.gameSpeed = Math.min(6 + Math.floor(score / 100), 13)

    // Draw everything
    game.clouds.forEach((cloud) => drawCloud(ctx, cloud))
    drawGround(ctx, game.groundX)
    drawDino(ctx, game.dino)
    game.obstacles.forEach((obstacle) => {
      if (obstacle.type === "cactus") {
        drawCactus(ctx, obstacle)
      } else {
        drawPterodactyl(ctx, obstacle)
      }
    })
    drawScore(ctx)

    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    gameRef.current = {
      dino: { x: 50, y: 150, width: 44, height: 47, velocityY: 0, isJumping: false, isDucking: false },
      obstacles: [],
      clouds: [],
      gameSpeed: 6,
      groundX: 0,
      frameCount: 0,
    }
  }

  const jump = () => {
    if (gameState === "waiting" || gameState === "gameOver") {
      startGame()
    } else if (gameState === "playing" && !gameRef.current.dino.isJumping) {
      gameRef.current.dino.isJumping = true
      gameRef.current.dino.velocityY = -15
    }
  }

  const duck = (isDucking: boolean) => {
    if (gameState === "playing") {
      gameRef.current.dino.isDucking = isDucking
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        jump()
      } else if (e.code === "ArrowDown") {
        e.preventDefault()
        duck(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") {
        e.preventDefault()
        duck(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [gameState])

  // Start game loop
  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">StressBuster Game</h1>
          <p className="text-xl text-gray-600">Take a break and play the classic dinosaur game!</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Chrome Dinosaur Game</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="border border-gray-300 rounded-lg bg-gray-50 max-w-full"
              onClick={jump}
            />

            <div className="text-center space-y-2">
              <div className="flex justify-center space-x-8 text-sm text-gray-600">
                <span>Score: {score.toString().padStart(5, "0")}</span>
                {highScore > 0 && <span>High Score: {highScore.toString().padStart(5, "0")}</span>}
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  <strong>Controls:</strong>
                </p>
                <p>SPACE or ↑ = Jump | ↓ = Duck | Click = Jump</p>
                <p>Jump over cacti and duck under pterodactyls!</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={jump} variant="outline">
                {gameState === "waiting" ? "Start Game" : gameState === "gameOver" ? "Restart" : "Jump"}
              </Button>
              <Button
                onMouseDown={() => duck(true)}
                onMouseUp={() => duck(false)}
                onMouseLeave={() => duck(false)}
                variant="outline"
                disabled={gameState !== "playing"}
              >
                Duck
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Playing games can help reduce stress and improve mental well-being. Take regular breaks to keep your mind
            fresh!
          </p>
          <Button asChild variant="outline">
            <a href="/check">Back to Stress Analysis</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
