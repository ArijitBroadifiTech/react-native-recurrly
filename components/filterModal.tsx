import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { BlurView } from "expo-blur";
import { styled } from "nativewind";
import React, { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import DatePicker from "./datePicker";

const SafeAreaView = styled(RNSafeAreaView);

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

type Frequency = "Monthly" | "Yearly";

type Status = "Active" | "Cancelled";

type Category =
  | "Entertainment"
  | "AI Tools"
  | "Developer Tools"
  | "Design"
  | "Productivity"
  | "Other";

const CATEGORIES: Category[] = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Other",
];

const FREQUENCY: Frequency[] = ["Monthly", "Yearly"];
const STATUS: Status[] = ["Active", "Cancelled"];

const FilterModal = ({ isVisible, onClose }: FilterModalProps) => {
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [category, setCategory] = useState<Category>("Entertainment");
  const [status, setStatus] = useState<Status>("Active");
  let setStartDate = "";
  const [endDate, setEndDate] = useState(null);

  const [showStartDate, setShowStartDate] = useState(false);

  const currentDate = new Date();

  const handleStartDate = (_event: unknown, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowStartDate(false);
    if (selectedDate) {
      const date = selectedDate.toDateString();
      setStartDate = date;
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <BlurView intensity={30} tint="dark" style={{ flex: 1 }}>
          <Pressable
            className="flex-1 bg-[rgba(0,0,0,0.35)]"
            onPress={onClose}
            // style={{ flex: 1, justifyContent: "center" }}
          >
            <Pressable
              className="p-5 mt-auto rounded-t-3xl bg-background dark:bg-darkBackground border-t-2 border-border dark:border-darkBorder"
              onPress={(e) => e.stopPropagation()}
            >
              <View>
                <View className="flex flex-row justify-between mb-4">
                  <Pressable onPress={onClose}>
                    <Ionicons
                      name="close-outline"
                      size={26}
                      className="text-foreground dark:text-darkForeground"
                    />
                  </Pressable>

                  <Text className="text-lg font-semibold text-accent dark:text-darkAccent">
                    Filter
                  </Text>
                  <Pressable>
                    <Text className="text-primary dark:text-darkPrimary">
                      Reset
                    </Text>
                  </Pressable>
                </View>
                <KeyboardAwareScrollView
                  bottomOffset={20}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    padding: 20,
                    gap: 20,
                  }}
                >
                  <View className="gap-6">
                    <View>
                      <Text className="filter-modal-text">Category</Text>
                      <View className="flex-row flex-wrap gap-3">
                        {CATEGORIES.map((cat) => {
                          const isSelected = category === cat;
                          return (
                            <Pressable
                              key={cat}
                              className={clsx(
                                "filter-modal-option",
                                isSelected && "filter-modal-option-active ",
                              )}
                              onPress={() => setCategory(cat)}
                            >
                              <Text
                                className={clsx(
                                  "filter-modal-option-text",
                                  isSelected &&
                                    "filter-modal-option-text-active",
                                )}
                              >
                                {cat}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>

                    <View>
                      <Text className="filter-modal-text">Frequency</Text>
                      <View className="flex-row gap-3">
                        {FREQUENCY.map((fre) => {
                          const isSelected = frequency === fre;
                          return (
                            <Pressable
                              key={fre}
                              className={clsx(
                                "rounded-2xl border py-2 px-3",
                                isSelected
                                  ? "border-accent dark:border-darkAccent bg-accent"
                                  : "border-border dark:border-darkBorder bg-background dark:bg-darkBackground",
                              )}
                              onPress={() => setFrequency(fre)}
                            >
                              <Text
                                className={clsx(
                                  "text-sm font-sans-semibold",
                                  isSelected
                                    ? "text-white"
                                    : "text-muted-foreground dark:text-darkMuted-foreground",
                                )}
                              >
                                {fre}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>

                    <View>
                      <Text className="filter-modal-text">Status</Text>
                      <View className="flex-row flex-wrap gap-3">
                        {STATUS.map((sat) => {
                          const isSelected = status === sat;
                          return (
                            <Pressable
                              key={sat}
                              className={clsx(
                                "filter-modal-option",
                                isSelected && "filter-modal-option-active ",
                              )}
                              onPress={() => setStatus(sat)}
                            >
                              <Text
                                className={clsx(
                                  "filter-modal-option-text",
                                  isSelected &&
                                    "filter-modal-option-text-active",
                                )}
                              >
                                {sat}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>

                    <View>
                      <Text className="filter-modal-text">Date</Text>
                      <View className="flex-row justify-between gap-4 ">
                        <View>
                          <Text>Start Date</Text>

                          {/* {startDate ? (
                            <Text className="my-4 text-white">
                              You chose: {startDate}
                            </Text>
                          ) : null} */}
                        </View>
                      </View>
                    </View>

                    <View>
                      <Pressable
                        className="flex flex-1 px-6 py-3 bg-blue-900 rounded-2xl border border-blue-700"
                        style={{
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
                        }}
                      >
                        <Text className="text-white text-center text-lg font-bold">
                          Apply
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </View>
            </Pressable>
          </Pressable>
        </BlurView>
        {showStartDate && (
          <DatePicker value={currentDate} onChange={handleStartDate} />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal;
