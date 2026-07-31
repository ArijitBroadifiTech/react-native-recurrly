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
import React, { useCallback, useMemo, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SafeAreaView = styled(RNSafeAreaView);

const SubscriptionsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posthog = usePostHog();
  const { subscriptions } = useSubscriptionStore();
  const listRef = useRef<FlatList>(null);

  const initialIndex = useMemo(
    () =>
      Math.max(
        subscriptions.findIndex((s) => s.id === id),
        0,
      ),
    [subscriptions, id],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    [],
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const current = viewableItems[0]?.item as Subscription | undefined;
      if (current) {
        posthog.capture("subscription_detail_viewed", {
          subscription_id: current.id,
        });
      }
    },
  ).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;

  const renderItem = useCallback(
    ({ item }: { item: Subscription }) => (
      <View style={{ height: SCREEN_HEIGHT, paddingHorizontal: 20 }}>
        <Text className="text-[#ddbea9] text-xl font-medium">
          Subscriptions Details of {item.name}
        </Text>

        <View className="mt-4">
          <View className="sub-head">
            <View className="sub-main">
              <View className="bg-muted dark:bg-darkMuted-foreground rounded-xl p-2">
                <RenderIcon icon={item.icon} className="sub-icon" />
              </View>
              <View className="sub-copy">
                <Text
                  numberOfLines={1}
                  className="mb-1 text-lg font-sans-bold text-primary dark:text-darkForeground"
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-sm font-sans-semibold text-muted-foreground dark:text-darkMuted-foreground"
                >
                  {item.category?.trim() ||
                    item.plan?.trim() ||
                    (item.renewalDate
                      ? formatSubscriptionDateTime(item.renewalDate)
                      : "")}
                </Text>
              </View>
            </View>
            <View className="sub-price-box">
              <Text className="mb-1 text-lg font-sans-bold text-primary dark:text-darkPrimary">
                {formatCurrency(item.price, item.currency)}
              </Text>
              <Text className="text-sm font-sans-medium text-muted-foreground dark:text-darkMuted-foreground">
                {item.billing}
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
                  {item.paymentMethod?.trim() ?? "Not provided"}
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
                  {(item.category?.trim() || item.plan?.trim()) ??
                    "Not provided"}
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
                  {item.startDate
                    ? formatSubscriptionDateTime(item.startDate)
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
                  {item.renewalDate
                    ? formatSubscriptionDateTime(item.renewalDate)
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
                  {item.status
                    ? formatStatusLabel(item.status)
                    : "Not provided"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    ),
    [],
  );

  if (subscriptions.length === 0) return null;

  return (
    <SafeAreaView
      className="flex-1 bg-background dark:bg-darkBackground"
      edges={["top"]}
    >
      <View className="py-5">
        <Pressable
          onPress={() => router.back()}
          className="flex flex-row gap-2 mb-4 px-5"
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
        <FlatList
          ref={listRef}
          data={subscriptions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          pagingEnabled
          showsVerticalScrollIndicator={true}
          initialScrollIndex={initialIndex}
          getItemLayout={getItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          decelerationRate="fast"
          snapToInterval={SCREEN_HEIGHT}
          snapToAlignment="start"
          windowSize={3}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionsDetails;
