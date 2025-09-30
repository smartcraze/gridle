import { Image } from 'expo-image'
import React from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import timelineData from '../assets/json/timeline.json'

const { width } = Dimensions.get('window')

interface TimelineItem {
  date: string
  title: string
  description: string
  image: string
}

// Static image mapping to avoid dynamic require
const imageMap: { [key: string]: any } = {
  'img1.jpg': require('../assets/images/img1.jpg'),
  'img2.jpg': require('../assets/images/img2.jpg'),
  'img3.jpg': require('../assets/images/img3.jpg'),
  'img4.jpg': require('../assets/images/img4.jpg'),
  'img5.jpg': require('../assets/images/img5.jpg'),
  'img6.jpg': require('../assets/images/img6.jpg'),
  'img7.jpg': require('../assets/images/img7.jpg'),
  'img8.jpg': require('../assets/images/img8.jpg'),
  'img9.jpg': require('../assets/images/img9.jpg'),
  'img10.jpg': require('../assets/images/img10.jpg'),
  'img11.jpg': require('../assets/images/img11.jpg'),
  'img12.jpg': require('../assets/images/img12.jpg'),
  'img13.jpg': require('../assets/images/img13.jpg'),
  'img14.jpg': require('../assets/images/img14.jpg'),
  'img15.jpg': require('../assets/images/img15.jpg'),
  'img16.jpg': require('../assets/images/img16.jpg'),
  'img17.jpg': require('../assets/images/img17.jpg'),
  'img18.jpg': require('../assets/images/img18.jpg'),
  'img19.jpg': require('../assets/images/img19.jpg'),
  'img20.jpg': require('../assets/images/img20.jpg'),
  'img21.jpg': require('../assets/images/img21.jpg'),
  'img22.jpg': require('../assets/images/img22.jpg'),
  'img23.jpg': require('../assets/images/img23.jpg'),
  'img24.jpg': require('../assets/images/img24.jpg'),
  'img25.jpg': require('../assets/images/img25.jpg'),
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const TimelineItemComponent = ({
  item,
  index,
}: {
  item: TimelineItem
  index: number
}) => {
  const isEven = index % 2 === 0

  return (
    <View className="mb-8 relative">
      {/* Timeline line */}
      <View className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-400 -ml-px" />

      {/* Timeline dot */}
      <View className="absolute left-1/2 top-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg -ml-2 z-10" />

      {/* Content */}
      <View
        className={`flex-row ${isEven ? 'justify-start' : 'justify-end'} px-4`}
      >
        <View className={`w-5/12 ${isEven ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
          <View className="bg-white rounded-lg shadow-lg p-4 border border-gray-100">
            {/* Date */}
            <Text className="text-sm font-semibold text-blue-600 mb-2">
              {formatDate(item.date)}
            </Text>

            {/* Image */}
            <View className="mb-3 rounded-lg overflow-hidden">
              <Image
                source={imageMap[item.image]}
                style={{ width: '100%', height: 120 }}
                contentFit="cover"
                transition={300}
              />
            </View>

            {/* Title */}
            <Text className="text-lg font-bold text-gray-800 mb-2 leading-tight">
              {item.title}
            </Text>

            {/* Description */}
            <Text className="text-sm text-gray-600 leading-relaxed">
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default function Explore() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white shadow-sm border-b border-gray-100">
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-800 text-center">
            ISS Timeline
          </Text>
          <Text className="text-sm text-gray-600 text-center mt-1">
            Journey through the history of the International Space Station
          </Text>
        </View>
      </View>

      {/* Timeline */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {timelineData.map((item: TimelineItem, index: number) => (
          <TimelineItemComponent key={index} item={item} index={index} />
        ))}

        {/* End marker */}
        <View className="items-center mt-8 mb-4">
          <View className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
          <Text className="text-sm text-gray-500 mt-2 font-medium">
            Timeline Complete
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
