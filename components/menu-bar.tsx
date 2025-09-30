import ExploreScreen from '@/app/explore'
import HomeScreen from '@/app/index'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Menubar() {
  const Drawer = createDrawerNavigator()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Drawer.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ title: 'Explore' }}
        />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  )
}
