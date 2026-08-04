import { Color } from "@/constants/colorPalette";
import { generateMonthlyData, monthNames } from "@/lib/generateBarData";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const barData = [
  { value: 37, label: "Mon" },
  { value: 31, label: "Tue" },
  { value: 22, label: "Wed" },
  { value: 40, label: "Thr" },
  { value: 33, label: "Fri" },
  { value: 21, label: "Sat" },
  { value: 22, label: "Sun" },
];

const colorThemes = {
  blue: { name: "blue", primary: 500, accent: 600 },
  purple: { name: "purple", primary: 500, accent: 600 },
  emerald: { name: "emerald", primary: 500, accent: 600 },
  orange: { name: "orange", primary: 500, accent: 600 },
  pink: { name: "pink", primary: 500, accent: 600 },
  cyan: { name: "cyan", primary: 500, accent: 600 },
} as const;

export default function UpcomingBarChart() {
  const [colorTheme, setColorTheme] =
    useState<keyof typeof colorThemes>("cyan");

  const date = new Date();

  const [currentMonth, setCurrentMonth] = useState(date.getMonth());

  const [currentYear, setCurrentYear] = useState(date.getFullYear());

  function setNewDate(direction: number) {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  }

  // const monthlyData = generateMonthlyData(currentYear, currentMonth);

  const monthlyData = useMemo(
    () => generateMonthlyData(currentYear, currentMonth + 1),
    [currentYear, currentMonth],
  );

  const theme = colorThemes[colorTheme];

  const themeColor = Color[theme.name];

  const bgColors = [themeColor[100], "#ffffff", themeColor[100]] as const;

  return (
    <LinearGradient style={{ flex: 1 }} colors={bgColors}>
      <SafeAreaView className="flex-1  p-5">
        <StatusBar style="dark" />

        <View className="flex flex-row justify-center gap-[20%] items-center mt-4 mb-8">
          <Pressable onPress={() => setNewDate(-1)}>
            <Ionicons
              name="arrow-back-outline"
              size={20}
              className="text-gray-500"
            />
          </Pressable>

          <View className="flex flex-row gap-1">
            <Text className="text-[#264653]">{`${monthNames[currentMonth]},`}</Text>
            <Text className="text-[#264653] font-medium ">{currentYear}</Text>
          </View>

          <Pressable onPress={() => setNewDate(1)}>
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              className="text-gray-600"
            />
          </Pressable>
        </View>

        <BarChart
          key={`${currentYear}-${currentMonth}`}
          data={monthlyData}
          showGradient
          gradientColor={Color[theme.name][500]}
          frontColor={Color[theme.name][300]}
          barWidth={15}
          barBorderRadius={5}
          spacing={30}
          maxValue={100}
          noOfSections={4}
          yAxisTextStyle={{ color: "#264653", fontSize: 11 }}
          xAxisLabelTextStyle={{
            color: "#219ebc",
            fontSize: 12,
            fontWeight: "500",
          }}
          isAnimated
          animationDuration={1500}
          hideRules={false}
          rulesType="dashed"
          yAxisThickness={0}
          xAxisThickness={0}
        />

        {/* Color  Theme selector */}
        <View className="py-4 mt-5">
          <Text className="font-medium text-sm text-gray-600 pb-1">
            Choose Theme
          </Text>
          <ScrollView
            contentContainerClassName="gap-4 py-2 px-1"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {(Object.keys(colorThemes) as (keyof typeof colorThemes)[]).map(
              (themeKey) => (
                <Pressable
                  key={themeKey}
                  onPress={() => setColorTheme(themeKey)}
                  style={{
                    borderColor: Color[colorThemes[themeKey].name][300],
                    borderRadius: 15,
                    boxShadow:
                      colorTheme === themeKey
                        ? "0px 2px 8px rgba(0,0,0,0.2)"
                        : "none",
                  }}
                  className="border px-3 py-1.5 rounded-2xl text-center "
                >
                  <Text className="text-gray-500 font-medium">{themeKey}</Text>
                </Pressable>
              ),
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5EFDD",
    borderRadius: 20,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
  },
});
