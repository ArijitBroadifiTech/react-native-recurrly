import { formatCurrency } from "@/lib/utils";
import React, { isValidElement } from "react";
import { Image, Text, View } from "react-native";
import { RenderIcon } from "./renderIcon";

const renderIcon = (
  icon: UpcomingSubscriptionCardProps["icon"],
  className: string,
) =>
  isValidElement(icon) ? (
    <View>{icon}</View>
  ) : (
    <Image source={icon as any} className={className} />
  );

const UpcomingSubscriptionCard = ({
  name,
  price,
  daysLeft,
  icon,
  currency,
}: UpcomingSubscription) => {
  return (
    <View className="upcoming-card">
      <View className="upcoming-row">
        {/* {renderIcon(icon, "upcoming-icon")} */}
        <RenderIcon icon={icon} className="sub-icon" />

        <View>
          <Text className="upcoming-price">
            {formatCurrency(price, currency)}
          </Text>
          <Text className="upcoming-meta" numberOfLines={1}>
            {daysLeft}
            {daysLeft ? " days left" : " last day"}
          </Text>
        </View>
      </View>

      <Text className="upcoming-name" numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default UpcomingSubscriptionCard;
