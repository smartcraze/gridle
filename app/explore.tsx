import { Image } from 'expo-image'
import React, { useRef } from 'react'
import { Animated, Dimensions, Text, View } from 'react-native'
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
  return (
    <View className="mb-10 relative px-6">
      {/* Content */}
      <View className="ml-12">
        <View className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {/* Date */}
          <Text className="text-base font-semibold text-blue-600 mb-4">
            {formatDate(item.date)}
          </Text>

          {/* Image */}
          <View className="mb-5 rounded-xl overflow-hidden">
            <Image
              source={imageMap[item.image]}
              style={{ width: '100%', height: 180 }}
              contentFit="cover"
              transition={300}
            />
          </View>

          {/* Title */}
          <Text className="text-xl font-bold text-gray-800 mb-4 leading-snug">
            {item.title}
          </Text>

          {/* Description */}
          <Text className="text-base text-gray-600 leading-relaxed">
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default function Explore() {
  const scrollY = useRef(new Animated.Value(0)).current
  const { height } = Dimensions.get('window')

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Timeline */}
      <View className="flex-1 relative">
        {/* Continuous Timeline Line */}
        <View className="absolute left-8 top-0 bottom-0 w-1 bg-blue-400 z-10" />

        <Animated.ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 30, paddingBottom: 50 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {timelineData.map((item: TimelineItem, index: number) => (
            <TimelineItemComponent key={index} item={item} index={index} />
          ))}

          {/* End marker */}
          <View className="items-center mt-12 mb-8 px-6">
            <View className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
            <Text className="text-base text-gray-500 mt-4 font-medium">
              Timeline Complete
            </Text>
          </View>
        </Animated.ScrollView>

        {/* Moving Timeline Dot */}
        <Animated.View
          className="absolute left-5 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg z-20"
          style={{
            top: scrollY.interpolate({
              inputRange: [0, height * 10], // Adjust this range based on your content height
              outputRange: [60, height * 0.35], // Start position and end position
              extrapolate: 'extend',
            }),
          }}
        />
      </View>
    </SafeAreaView>
  )
}
