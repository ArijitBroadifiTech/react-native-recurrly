import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function Insights() {
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
      {/* <TouchableOpacity onPress={triggerNotification}>
        <Text style={[styles.text, themeNotificationStyle]}>Notify</Text>
      </TouchableOpacity> */}
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
