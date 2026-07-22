import CustomSplashScreen from "@/components/customSplashScreen";
import "@/global.css";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import {
  SplashScreen,
  Stack,
  useGlobalSearchParams,
  usePathname,
} from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { posthog } from "../src/config/posthog";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function RootLayoutContent() {
  const { isLoaded: authLoaded } = useAuth();
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  const [fontsLoaded] = useFonts({
    "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  });

  const appIsReady = fontsLoaded && authLoaded;

  // Hide the NATIVE splash as soon as app data is ready —
  // our custom JS splash takes over visually from here
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleCustomSplashFinish = useCallback(() => {
    setShowCustomSplash(false);
  }, []);

  // Don't render anything until fonts + auth are ready
  if (!appIsReady) return null;

  // Show custom splash on top of the app briefly after native splash hides
  if (showCustomSplash) {
    return <CustomSplashScreen onFinish={handleCustomSplashFinish} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: true,
          propsToCapture: ["testID"],
          maxElementsCaptured: 20,
        }}
      >
        <KeyboardProvider>
          <RootLayoutContent />
        </KeyboardProvider>
      </PostHogProvider>
    </ClerkProvider>
  );
}
