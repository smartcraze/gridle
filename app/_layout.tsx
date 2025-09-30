import { Tabs } from 'expo-router'
import { Text, View } from 'react-native'
import 'react-native-reanimated'
import './globals.css'

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'ISS Timeline',
          headerTitleAlign: 'center',
          header: () => (
            <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-100">
              <Text className="text-3xl font-bold text-gray-800 text-center">
                ISS Timeline
              </Text>
              <Text className="text-base text-gray-600 text-center mt-2">
                Journey through the history of the International Space Station
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  )
}
