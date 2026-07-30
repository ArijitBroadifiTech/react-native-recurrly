import { BlurView } from "expo-blur";
import React from "react";
import { View } from "react-native";

type GlassCardProps = {
  children: React.ReactNode;
  tint: "light" | "dark";
  style?: object;
};

const GlassCard = ({ children, tint, style }: GlassCardProps) => {
  return (
    <View style={[{ borderRadius: 16, overflow: "hidden" }, style]}>
      <BlurView
        intensity={tint === "dark" ? 28 : 55}
        style={{
          backgroundColor:
            tint === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.58)",
          borderWidth: 1,
          borderRadius: 16,
          borderColor: tint === "dark" ? "#6c757d" : "rgba(0,0,0,0.07)",
        }}
      >
        {children}
      </BlurView>
    </View>
  );
};

export default GlassCard;
