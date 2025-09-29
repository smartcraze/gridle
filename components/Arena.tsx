import React from 'react'
import { View } from 'react-native'

const Arena = ({ children }: { children?: React.ReactNode }) => {
  return <View className="w-full h-full bg-gray-900">{children}</View>
}

export default Arena
