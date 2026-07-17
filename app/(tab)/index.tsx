import { HOME_USER } from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import "@/global.css";
import { styled } from "nativewind";
import { Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <StatusBar barStyle="dark-content" />
      <View className="home-header">
        <View className="home-user">
          <Image source={images.avatar} className="home-avatar" />
          <Text className="home-user-name">{HOME_USER.name}</Text>
        </View>

        <View className="rounded-full overflow-hidden p-1 border border-gray-200">
          <Image source={icons.add} className="home-add-icon" />
        </View>
      </View>
    </SafeAreaView>
  );
}
