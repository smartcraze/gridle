import Menubar from '@/components/menu-bar'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import './globals.css'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#000000" translucent={false} />
      <Menubar />
    </>
  )
}
