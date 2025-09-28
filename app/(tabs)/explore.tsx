import { Image } from "expo-image";
import { Platform } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerImage={
        <ThemedView className="flex-1 items-center justify-center">
          <Image
            source={require("../../assets/images/react-logo.png")}
            className="h-24 w-24"
            contentFit="contain"
            transition={Platform.OS === "web" ? 0 : 300}
          />
        </ThemedView>
      }
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <ThemedText className="text-2xl font-bold mb-4">Explore</ThemedText>
      <ThemedText className="text-lg font-semibold mb-4">
        Welcome to the Explore Tab!
      </ThemedText>
      <ThemedText className="mb-4">
        This is your explore page. You can add any content you want here.
      </ThemedText>
      <ThemedText className="mb-4">• Discover new features</ThemedText>
      <ThemedText className="mb-4">• Browse content</ThemedText>
      <ThemedText className="mb-4">• Explore possibilities</ThemedText>
      <ThemedText className="text-sm opacity-70">
        Start building your amazing app features here!
      </ThemedText>
    </ParallaxScrollView>
  );
}
