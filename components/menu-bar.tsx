import ExploreScreen from '@/app/explore'
import HomeScreen from '@/app/index'
import ISSLocationScreen from '@/app/iss-location'
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
          options={{ title: 'ISS Timeline' }}
        />
        <Drawer.Screen
          name="ISSLocation"
          component={ISSLocationScreen}
          options={{ title: 'Where is ISS?' }}
        />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  )
}
