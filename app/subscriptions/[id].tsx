import { RenderIcon } from "@/components/renderIcon";
import { useSubscriptionStore } from "@/lib/subscriptionStore";
import {
  formatCurrency,
  formatStatusLabel,
  formatSubscriptionDateTime,
} from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import { usePostHog } from "posthog-react-native";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const SubscriptionsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posthog = usePostHog();
  const { subscriptions } = useSubscriptionStore();

  const subscription = subscriptions.find((sub) => sub.id === id);

  useEffect(() => {
    posthog.capture("subscription_detail_viewed", {
      subscription_id: id,
    });
  }, [id, posthog]);

  if (!subscription) {
    return (
      <SafeAreaView className="flex-1 bg-background dark:bg-darkBackground">
        <Text className="text-white">Subscription not found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-primary dark:text-darkPrimary">Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const {
    name,
    price,
    currency,
    icon,
    billing,
    color,
    category,
    renewalDate,
    plan,
    status,
    paymentMethod,
    startDate,
  } = subscription;

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-darkBackground">
      <View className="p-5 ">
        <Pressable
          onPress={() => router.back()}
          className="flex flex-row gap-2 mb-4"
        >
          <Ionicons
            name="arrow-back-outline"
            size={22}
            className="text-muted-foreground dark:text-darkMuted-foreground"
          />
          <Text className="text-muted-foreground dark:text-darkMuted-foreground">
            Go back
          </Text>
        </Pressable>

        <Text className="text-[#ddbea9] dark:text-[#ddbea9] text-xl font-medium ">
          Subscriptions Details of {name}
        </Text>

        <View className="mt-4">
          <View className="sub-head">
            <View className="sub-main">
              <View className="bg-muted dark:bg-darkMuted-foreground rounded-xl p-2">
                <RenderIcon icon={icon} className="sub-icon" />
              </View>
              <View className="sub-copy">
                <Text
                  numberOfLines={1}
                  className="mb-1 text-lg font-sans-bold text-primary dark:text-darkForeground"
                >
                  {name}
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-sm font-sans-semibold text-muted-foreground dark:text-darkMuted-foreground"
                >
                  {category?.trim() ||
                    plan?.trim() ||
                    (renewalDate
                      ? formatSubscriptionDateTime(renewalDate)
                      : "")}
                </Text>
              </View>
            </View>

            <View className="sub-price-box">
              <Text className="mb-1 text-lg font-sans-bold text-primary dark:text-darkPrimary">
                {formatCurrency(price, currency)}
              </Text>
              <Text className="text-sm font-sans-medium text-muted-foreground dark:text-darkMuted-foreground">
                {billing}
              </Text>
            </View>
          </View>

          <View className="mt-6 gap-6">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="details-sub-label">Payment:</Text>
                <Text
                  className="details-sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {paymentMethod?.trim() ?? "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="details-sub-label">Category:</Text>
                <Text
                  className="details-sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {(category?.trim() || plan?.trim()) ?? "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="details-sub-label">Started:</Text>
                <Text
                  className="details-sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {startDate
                    ? formatSubscriptionDateTime(startDate)
                    : "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="details-sub-label">Renewal date:</Text>
                <Text
                  className="details-sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {renewalDate
                    ? formatSubscriptionDateTime(renewalDate)
                    : "Not provided"}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="details-sub-label">Status:</Text>
                <Text
                  className="details-sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {status ? formatStatusLabel(status) : "Not provided"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionsDetails;
