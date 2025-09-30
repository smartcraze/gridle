import { Tabs } from 'expo-router'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './globals.css'
export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
            title: 'Explore',
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  )
}
