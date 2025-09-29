import React from 'react'
import { View } from 'react-native'

const Player = (props: any) => {
  const { position } = props
  const [x, y] = position

  return (
    <View
      className="w-12 h-12 absolute"
      style={{
        left: x - 24,
        top: y - 24,
      }}
    >
      {/* Spaceship body */}
      <View className="w-full h-full bg-blue-400 rounded-full border-2 border-cyan-300 shadow-lg">
        {/* Engine glow effect */}
        <View className="absolute inset-1 bg-blue-300 rounded-full opacity-60" />
        {/* Cockpit */}
        <View className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-200 rounded-full border border-cyan-400" />
      </View>
    </View>
  )
}

export default Player
