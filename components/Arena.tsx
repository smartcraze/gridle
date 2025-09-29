import React from 'react'
import { Dimensions, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const generateStars = (num: number) => {
  return Array.from({ length: num }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
  }))
}

const animateStars = (stars: { x: number; y: number }[], speed = 0.5) => {
  return stars.map((star) => {
    let newY = star.y + speed
    if (newY > height) newY = 0
    return { ...star, y: newY }
  })
}

const stars = animateStars(generateStars(100))

const Arena = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="w-full h-full bg-black">
      {stars.map((star, i) => (
        <View
          key={i}
          className="bg-white rounded-full"
          style={{
            width: 2,
            height: 2,
            position: 'absolute',
            left: star.x,
            top: star.y,
          }}
        />
      ))}
      {children}
    </View>
  )
}

export default Arena
