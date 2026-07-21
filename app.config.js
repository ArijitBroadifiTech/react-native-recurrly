export default {
  expo: {
    name: "Recurrly",
    slug: "recurrly",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/logo.png",
    scheme: "reactnativerecurrly",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      bundleIdentifier: "com.arijit.reactnativerecurrly",
      supportsTablet: true,
    },
    android: {
      package: "com.arijit.reactnativerecurrly",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-pattern.png",

          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/PlusJakartaSans-Regular.ttf",
            "./assets/fonts/PlusJakartaSans-Bold.ttf",
            "./assets/fonts/PlusJakartaSans-Medium.ttf",
            "./assets/fonts/PlusJakartaSans-SemiBold.ttf",
            "./assets/fonts/PlusJakartaSans-ExtraBold.ttf",
            "./assets/fonts/PlusJakartaSans-Light.ttf",
          ],
        },
      ],
      "@clerk/expo",
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
      posthogHost: process.env.POSTHOG_HOST || "https://us.i.posthog.com",
      eas: {
        projectId: "b1526bf1-c8e8-4407-aa06-07d886154a96",
      },
    },
  },
};
