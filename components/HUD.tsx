import React from 'react'
import { Text, View } from 'react-native'

interface HUDProps {
  score: number
  health: number
}

const HUD: React.FC<HUDProps> = ({ score, health }) => {
  return (
    <View className="absolute top-12 left-0 right-0 flex-row justify-between px-6 z-10">
      {/* Score */}
      <View className="bg-black bg-opacity-50 px-4 py-2 rounded-lg border border-cyan-400">
        <Text className="text-cyan-300 text-lg font-bold">Score: {score}</Text>
      </View>

      {/* Health Bar */}
      <View className="bg-black bg-opacity-50 px-4 py-2 rounded-lg border border-red-400">
        <Text className="text-red-300 text-lg font-bold">
          Health: {health}%
        </Text>
        <View className="w-20 h-2 bg-gray-600 rounded-full mt-1">
          <View
            className="h-full bg-red-500 rounded-full"
            style={{ width: `${health}%` }}
          />
        </View>
      </View>
    </View>
  )
}

export default HUD
