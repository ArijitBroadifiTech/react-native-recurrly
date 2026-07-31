import { BlurView } from "expo-blur";
import React from "react";
import { View } from "react-native";

type GlassCardProps = {
  children: React.ReactNode;
  tint: "light" | "dark";
  style?: object;
};

const ModalGlassCard = ({ children, tint, style }: GlassCardProps) => {
  return (
    <View style={[{ borderRadius: 16, overflow: "hidden" }, style]}>
      <BlurView
        intensity={tint === "dark" ? 25 : 55}
        style={{
          backgroundColor:
            tint === "dark" ? "#343a40" : "rgba(255,255,255,0.58)",
          borderWidth: 1,
          borderRadius: 16,
          borderColor: tint === "dark" ? "#6c757d" : "rgba(0,0,0,0.07)",
          paddingVertical: 20,
          paddingHorizontal: 30,
        }}
      >
        {children}
      </BlurView>
    </View>
  );
};

export default ModalGlassCard;
