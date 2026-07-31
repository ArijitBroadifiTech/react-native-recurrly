import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Notifications from "expo-notifications";
import { styled } from "nativewind";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    useColorScheme,
    View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import ModalGlassCard from "../modalGlassCard";
const SafeAreaView = styled(RNSafeAreaView);

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationModal = ({ visible, onClose }: NotificationModalProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const tint: "light" | "dark" = isDark ? "dark" : "light";

  const [isEnabled, setIsEnabled] = useState(false);

  //Set Notifications
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

    setIsEnabled((previousState) => !previousState);

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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <BlurView
          tint="dark"
          style={{
            flex: 1,
          }}
        >
          <Pressable
            className="flex-1 items-center justify-center "
            onPress={onClose}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <ModalGlassCard tint={tint}>
                <View className="flex gap-6">
                  <Text className="text-lg text-primary dark:text-darkPrimary">
                    Notifications
                  </Text>

                  <View className="flex flex-row justify-between gap-5">
                    <Text className="text-darkForeground text-lg font-medium">
                      {isEnabled ? "Enable" : "Disable"}
                    </Text>

                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={triggerNotification}
                      value={isEnabled}
                    />
                  </View>
                </View>
              </ModalGlassCard>
            </Pressable>
          </Pressable>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
};

const NotificationSettings = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={isDark ? "#e8dfc8" : "rgba(0,0,0,0.30)"}
        />
      </Pressable>

      {isModalVisible && (
        <NotificationModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
