// import { styled } from "nativewind";
// import React from "react";
// import { Text } from "react-native";
// import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
// import { Appearance, useColorScheme } from 'react-native';

// const SafeAreaView = styled(RNSafeAreaView);

// const Insights = () => {
//   return (
//     <SafeAreaView className="flex-1 bg-background p-5">
//       <Text>Insights</Text>
//     </SafeAreaView>
//   );
// };

// export default Insights;

import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Insights() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission is not granted");
      }
    })();
  }, []);

  const triggerNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello",
        body: "Notification triggered from button press",
        sound: "notification_sound.wav",
      },
      trigger:
        Platform.OS === "android"
          ? { channelId: "default" } // ✅ Android: ChannelAwareTriggerInput (no `type` needed)
          : null, // iOS: deliver immediately, sound comes from content.sound
    });
  };

  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeNotificationStyle =
    colorScheme === "light"
      ? styles.lightThemeNotiText
      : styles.darkThemeNotiText;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>
        Color scheme: {colorScheme}
      </Text>
      {/* <StatusBar /> */}

      <Text style={[themeNotificationStyle]}>Notification Example</Text>
      <TouchableOpacity onPress={triggerNotification}>
        <Text style={[styles.text, themeNotificationStyle]}>Notify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff9e3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  lightContainer: {
    backgroundColor: "#d0d0c0",
  },
  darkContainer: {
    backgroundColor: "#242c40",
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#edf6f9",
  },
  darkThemeNotiText: {
    color: "#ced4da",
  },
  lightThemeNotiText: {
    color: "#242c40",
  },
});
