import { MovementSystem } from '@/lib/Movement'
import { CollisionSystem, ObstacleSystem } from '@/lib/ObstacleSystem'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Arena from './Arena'
import HUD from './HUD'
import Joystick from './Joystick'
import Player from './Player'

const { width, height } = Dimensions.get('window')

const Game = () => {
  const gameEngineRef = useRef<any>(null)
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(100)

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 10)
    }, 10000)

    return () => clearInterval(scoreInterval)
  }, [])

  const handleJoystickMove = (direction: { x: number; y: number }) => {
    if (gameEngineRef.current) {
      const entities = gameEngineRef.current.state.entities
      if (entities.player) {
        const speedMultiplier = 1 // <-- adjust this to make player faster
        entities.player.velocity = {
          x: direction.x * speedMultiplier,
          y: direction.y * speedMultiplier,
        }
      }
    }
  }

  return (
    <Arena>
      <HUD score={score} health={health} />
      <GameEngine
        ref={gameEngineRef}
        style={{ flex: 1 }}
        systems={[MovementSystem, ObstacleSystem, CollisionSystem]}
        entities={{
          player: {
            position: [width / 2, height / 2],
            velocity: { x: 0, y: 0 },
            momentum: { x: 0, y: 0 },
            renderer: Player,
          },
        }}
      />
      <Joystick
        onMove={handleJoystickMove}
        position={{ bottom: 80, left: 40 }}
      />
    </Arena>
  )
}

export default Game
