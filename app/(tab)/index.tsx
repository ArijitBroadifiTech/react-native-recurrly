import "@/global.css";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-xl font-bold text-muted-foreground">
        Welcome to Nativewind!
      </Text>

      <View>
        <Link
          href="/onboarding"
          className="mt-4 rounded-2xl px-3 py-2 bg-foreground text-white mx-auto my-auto"
        >
          <Text>Go to Onboarding</Text>
        </Link>

        <Link
          href="/(auth)/sign-in"
          className="mt-4 rounded-2xl px-3 py-2 bg-foreground text-white mx-auto"
        >
          <Text>Go to SignIn</Text>
        </Link>

        <Link
          href="/(auth)/sign-up"
          className="mt-4 rounded-2xl px-3 py-2 mx-auto bg-foreground text-white"
        >
          <Text>Go to SignUp</Text>
        </Link>

        {/* Subscription Page */}
        <Link
          href="/subscriptions/spotify"
          className="mt-4 rounded-2xl px-3 py-2 mx-auto bg-foreground text-white"
        >
          <Text>Spotify Subscription</Text>
        </Link>

        <Link
          href={{
            pathname: "/subscriptions/[id]",
            params: { id: "youtube" },
          }}
          className="mt-4 rounded-2xl px-3 py-2 mx-auto bg-foreground text-white"
        >
          <Text>Youtube Premium Subscription</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9E3",
  },
});
