import { useEffect, useRef } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function CustomSplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const opacity = useSharedValue(1); // prevent double-trigger from Strict Mode

  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    opacity.value = withDelay(
      1200, // ms to show splash before fading
      withTiming(0, { duration: 400 }, (finished) => {
        if (finished) runOnJS(onFinish)();
      }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={require("../assets/images/Gemini_Splash.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    backgroundColor: "#ffffff",
    zIndex: 999,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
