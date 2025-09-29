import React from 'react'
import { View } from 'react-native'

const Obstacle = (props: any) => {
  const { position, size, type } = props
  const [x, y] = position
  const { width, height } = size

  // Different obstacle types for variety
  const getObstacleStyle = () => {
    switch (type) {
      case 'asteroid':
        return 'bg-gray-500 border-2 border-gray-400'
      case 'debris':
        return 'bg-orange-600 border-2 border-orange-400'
      case 'crystal':
        return 'bg-purple-600 border-2 border-purple-400'
      default:
        return 'bg-gray-500 border-2 border-gray-400'
    }
  }

  return (
    <View
      className={`absolute ${getObstacleStyle()}`}
      style={{
        left: x - width / 2,
        top: y - height / 2,
        width: width,
        height: height,
        borderRadius: type === 'crystal' ? 8 : width / 2,
        transform: [{ rotate: `${(x + y) * 0.5}deg` }], // Slight rotation for visual variety
      }}
    >
      {/* Inner glow effect */}
      <View
        className={`absolute inset-1 opacity-40 ${
          type === 'asteroid'
            ? 'bg-gray-300'
            : type === 'debris'
              ? 'bg-orange-300'
              : 'bg-purple-300'
        }`}
        style={{
          borderRadius: type === 'crystal' ? 4 : '50%',
        }}
      />

      {/* Surface details */}
      {type === 'asteroid' && (
        <>
          <View className="absolute top-1 left-2 w-2 h-2 bg-gray-600 rounded-full opacity-60" />
          <View className="absolute bottom-2 right-1 w-1 h-1 bg-gray-300 rounded-full" />
        </>
      )}

      {type === 'debris' && (
        <>
          <View className="absolute top-2 left-1 w-1 h-3 bg-orange-400 opacity-80" />
          <View className="absolute bottom-1 right-2 w-2 h-1 bg-yellow-500 opacity-60" />
        </>
      )}

      {type === 'crystal' && (
        <>
          <View className="absolute top-1 left-1 right-1 h-0.5 bg-purple-300 opacity-80" />
          <View className="absolute bottom-1 left-1 right-1 h-0.5 bg-purple-300 opacity-80" />
        </>
      )}
    </View>
  )
}

export default Obstacle
