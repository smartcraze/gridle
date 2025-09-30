import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Astronaut {
  craft: string
  name: string
}

interface AstronautData {
  people: Astronaut[]
  number: number
  message: string
}

export default function AstronautsScreen() {
  const [astronautData, setAstronautData] = useState<AstronautData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchAstronauts = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/astros.json')
      const data = await response.json()

      if (data.message === 'success') {
        setAstronautData(data)
        setError(null)
      } else {
        setError('Failed to fetch astronaut data')
      }
      setLoading(false)
      setRefreshing(false)
    } catch (err) {
      setError('Failed to fetch astronaut data')
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchAstronauts()
  }

  useEffect(() => {
    fetchAstronauts()
  }, [])

  // Group astronauts by spacecraft
  const groupedAstronauts =
    astronautData?.people.reduce(
      (acc, astronaut) => {
        if (!acc[astronaut.craft]) {
          acc[astronaut.craft] = []
        }
        acc[astronaut.craft].push(astronaut)
        return acc
      },
      {} as Record<string, Astronaut[]>
    ) || {}

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">
            Loading astronauts in space...
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error || !astronautData) {
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
      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Astronauts in Space
          </Text>
          <Text className="text-gray-400 text-center text-lg">
            Currently {astronautData.number} people in space
          </Text>
        </View>

        {/* Spacecraft Groups */}
        {Object.entries(groupedAstronauts).map(([craft, astronauts]) => (
          <View key={craft} className="mb-6">
            {/* Spacecraft Name */}
            <View className="bg-blue-900 rounded-t-lg px-4 py-3">
              <Text className="text-white text-xl font-bold">
                {craft === 'ISS' ? 'International Space Station (ISS)' : craft}
              </Text>
              <Text className="text-blue-200 text-sm">
                {astronauts.length} astronaut
                {astronauts.length !== 1 ? 's' : ''}
              </Text>
            </View>

            {/* Astronaut List */}
            <View className="bg-gray-900 rounded-b-lg">
              {astronauts.map((astronaut, index) => (
                <View
                  key={`${astronaut.name}-${index}`}
                  className={`px-4 py-3 flex-row items-center ${
                    index !== astronauts.length - 1
                      ? 'border-b border-gray-700'
                      : ''
                  }`}
                >
                  {/* Astronaut Icon */}
                  <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center mr-3">
                    <Text className="text-white font-bold text-lg">
                      {astronaut.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Text>
                  </View>

                  {/* Astronaut Info */}
                  <View className="flex-1">
                    <Text className="text-white text-lg font-medium">
                      {astronaut.name}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Footer */}
        <View className="mt-4 mb-6 pt-4 border-t border-gray-700">
          <Text className="text-gray-500 text-center text-sm">
            Data from Open Notify API
          </Text>
          <Text className="text-gray-500 text-center text-xs mt-1">
            Pull down to refresh
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
