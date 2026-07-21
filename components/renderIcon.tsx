import React, { isValidElement } from "react";
import { Image, View } from "react-native";

interface IconProps {
  icon: SubscriptionCardProps["icon"];
  className: string;
}

export const RenderIcon = ({ icon, className }: IconProps) => {
  if (isValidElement(icon)) {
    return <View className={className}>{icon}</View>;
  } else {
    return (
      <View className={className}>
        <Image source={icon as any} className="sub-image-icon" />
      </View>
    );
  }
};
