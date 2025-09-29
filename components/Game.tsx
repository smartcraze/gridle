import { MovementSystem } from '@/lib/Movement'
import React, { useRef } from 'react'
import { Dimensions } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Arena from './Arena'
import Joystick from './Joystick'
import Player from './Player'

const { width, height } = Dimensions.get('window')

const Game = () => {
  const gameEngineRef = useRef<any>(null)

  const handleJoystickMove = (direction: { x: number; y: number }) => {
    if (gameEngineRef.current) {
      const entities = gameEngineRef.current.state.entities
      if (entities.player) {
        entities.player.velocity = direction
      }
    }
  }

  return (
    <Arena>
      <GameEngine
        ref={gameEngineRef}
        style={{ flex: 1 }}
        systems={[MovementSystem]}
        entities={{
          player: {
            position: [width / 2, height / 2],
            velocity: { x: 0, y: 0 },
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
