import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignIn = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-primary">SignIn</Text>

      <Link href="/(auth)/sign-up">Create Account</Link>
    </View>
  );
};

export default SignIn;
