import React, { useState } from 'react'
import { View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'

interface JoystickProps {
  onMove: (direction: { x: number; y: number }) => void
  size?: number
  position?: { bottom: number; left: number }
}

const Joystick: React.FC<JoystickProps> = ({
  onMove,
  size = 120,
  position = { bottom: 50, left: 50 },
}) => {
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 })
  const maxDistance = size / 2 - 20 // Maximum distance knob can move from center

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent

    // Calculate distance from center
    const distance = Math.sqrt(
      translationX * translationX + translationY * translationY
    )

    // Limit knob movement to circle boundary
    let newX = translationX
    let newY = translationY

    if (distance > maxDistance) {
      const angle = Math.atan2(translationY, translationX)
      newX = Math.cos(angle) * maxDistance
      newY = Math.sin(angle) * maxDistance
    }

    setKnobPosition({ x: newX, y: newY })

    // Normalize values between -1 and 1
    const normalizedX = newX / maxDistance
    const normalizedY = newY / maxDistance

    onMove({ x: normalizedX, y: normalizedY })
  }

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === 5) {
      // ENDED
      setKnobPosition({ x: 0, y: 0 })
      onMove({ x: 0, y: 0 })
    }
  }

  return (
    <View
      style={{
        position: 'absolute',
        bottom: position.bottom,
        left: position.left,
        width: size,
        height: size,
      }}
    >
      {/* Joystick Base */}
      <View
        className="bg-gray-600 bg-opacity-50 rounded-full border-2 border-gray-400"
        style={{
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Joystick Knob */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            className="bg-white rounded-full border-2 border-gray-300"
            style={{
              width: 40,
              height: 40,
              transform: [
                { translateX: knobPosition.x },
                { translateY: knobPosition.y },
              ],
            }}
          />
        </PanGestureHandler>
      </View>
    </View>
  )
}

export default Joystick
