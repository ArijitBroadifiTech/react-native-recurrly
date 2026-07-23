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
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Notification Example</Text>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={triggerNotification}>
        <Text>Notify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9e3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
