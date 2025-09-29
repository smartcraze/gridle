import React from 'react'
import { View } from 'react-native'

const Player = (props: any) => {
  const { position } = props
  const [x, y] = position

  return (
    <View
      className="w-12 h-12 bg-red-500 absolute rounded-full border-2 border-white"
      style={{
        left: x - 24,
        top: y - 24,
      }}
    />
  )
}

export default Player
