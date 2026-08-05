import FilterModal from "@/components/filterModal";
import SubscriptionCard from "@/components/subscriptionCard";
import { useSubscriptionStore } from "@/lib/subscriptionStore";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { subscriptions } = useSubscriptionStore();

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.category
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subscription.plan?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-darkBackground">
      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="pt-5">
            <Text className="text-3xl font-bold text-dark dark:text-darkForeground mb-5">
              Subscriptions
            </Text>
            <View className="flex flex-row gap-4 justify-between items-center mb-4">
              <TextInput
                className="flex-1 bg-card dark:bg-darkCard rounded-xl px-4 py-4 text-dark  border border-border dark:border-darkBorder"
                placeholder="Search subscriptions..."
                placeholderTextColor={
                  colorScheme === "light" ? "#666" : "#ced4da"
                }
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              <Pressable onPress={() => setShowModal(true)}>
                <Ionicons
                  name="list-outline"
                  size={35}
                  className="text-primary dark:text-darkPrimary"
                />
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedId === item.id}
            onPress={() =>
              setExpandedId(expandedId === item.id ? null : item.id)
            }
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />

      {showModal && (
        <FilterModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </SafeAreaView>
  );
};
export default Subscriptions;
