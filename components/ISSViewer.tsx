import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

export default function ISSViewer() {
  const { width, height } = Dimensions.get('window')

  // Sketchfab embed URL
  const sketchfabUrl =
    'https://sketchfab.com/models/6e289a99dfaa4de3852637696ddaea54/embed'

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: sketchfabUrl }}
        style={{ width, height }}
        allowsFullscreenVideo
        javaScriptEnabled
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // optional: space-like background
  },
})
