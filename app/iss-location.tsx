import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

interface ISSPosition {
  latitude: number
  longitude: number
  timestamp: number
}

const MapView = ({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>ISS Location</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        // Initialize map
        var map = L.map('map').setView([${latitude}, ${longitude}], 2);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Custom ISS icon
        var issIcon = L.divIcon({
          className: 'iss-icon',
          html: '<div style="background: red; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px red;"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        
        // Add ISS marker
        var issMarker = L.marker([${latitude}, ${longitude}], {icon: issIcon}).addTo(map);
        issMarker.bindPopup('<b>International Space Station</b><br>Lat: ${latitude.toFixed(4)}<br>Lng: ${longitude.toFixed(4)}');
        
        // Center map on ISS
        map.setView([${latitude}, ${longitude}], 2);
      </script>
    </body>
    </html>
  `

  return (
    <WebView
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  )
}

export default function ISSLocation() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchISSPosition = async () => {
    try {
      const response = await fetch(
        'https://api.wheretheiss.at/v1/satellites/25544'
      )
      const data = await response.json()

      if (data.latitude !== undefined && data.longitude !== undefined) {
        setIssPosition({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          timestamp: Math.floor(Date.now() / 1000),
        })
        setLoading(false)
      }
    } catch (err) {
      console.error('Error fetching ISS position:', err)
      setError('Failed to fetch ISS position')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchISSPosition()
    // Update position every 5 seconds
    const interval = setInterval(fetchISSPosition, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">Loading ISS position...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error || !issPosition) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg text-center">
            {error || 'No ISS data available'}
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <MapView
        latitude={issPosition.latitude}
        longitude={issPosition.longitude}
      />
    </SafeAreaView>
  )
}
