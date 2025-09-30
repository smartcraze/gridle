import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface APODData {
  copyright?: string
  date: string
  explanation: string
  hdurl?: string
  media_type: 'image' | 'video'
  service_version: string
  title: string
  url: string
}

const { width } = Dimensions.get('window')

export default function NASAAPODScreen() {
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAPOD = async () => {
    try {
      // For now using DEMO_KEY, you can replace with your actual API key
      const apiKey = 'PcPVSPkBu7y8o6lOr8Z4WyA0nzF3IoIC2FxsbldZ'
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      )
      const data = await response.json()

      if (data.error) {
        setError(data.error.message || 'Failed to fetch NASA APOD')
      } else {
        setApodData(data)
      }
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch NASA APOD')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPOD()
  }, [])

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">
            Loading NASA Picture of the Day...
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error || !apodData) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-lg text-center">
            {error || 'No data available'}
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4 py-2">
        {/* Title */}
        <Text className="text-white text-2xl font-bold text-center mb-2">
          {apodData.title}
        </Text>

        {/* Date */}
        <Text className="text-gray-400 text-center mb-4">
          {new Date(apodData.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        {/* Image or Video */}
        {apodData.media_type === 'image' ? (
          <View className="mb-4">
            <Image
              source={{ uri: apodData.url }}
              style={{
                width: width - 32,
                height: (width - 32) * 0.75,
                borderRadius: 8,
              }}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View className="mb-4 bg-gray-800 rounded-lg p-4">
            <Text className="text-white text-center">
              Video content available at: {apodData.url}
            </Text>
          </View>
        )}

        {/* Copyright */}
        {apodData.copyright && (
          <Text className="text-gray-400 text-sm text-center mb-4">
            © {apodData.copyright.trim()}
          </Text>
        )}

        {/* Explanation */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-2">
            Description
          </Text>
          <Text className="text-gray-300 text-base leading-6">
            {apodData.explanation}
          </Text>
        </View>

        {/* Footer */}
        <View className="mb-4 pt-4 border-t border-gray-700">
          <Text className="text-gray-500 text-center text-sm">
            NASA Astronomy Picture of the Day
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
