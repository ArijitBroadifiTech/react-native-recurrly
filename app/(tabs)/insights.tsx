import { styled } from "nativewind";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type DataPoint = {
  label: string;
  value: number;
};

const data: DataPoint[] = [
  { label: "Mon", value: 37 },
  { label: "Tue", value: 31 },
  { label: "Wed", value: 22 },
  { label: "Thr", value: 40 },
  { label: "Fri", value: 33 },
  { label: "Sat", value: 21 },
  { label: "Sun", value: 22 },
];

const MAX_VALUE = 45;
const CHART_HEIGHT = 160;
const BAR_WIDTH = 10;

export default function UpcomingBarChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(3); // Thr active by default

  return (
    <SafeAreaView className="flex-1  bg-background dark:bg-darkBackground p-5">
      <View style={styles.card}>
        {/* Y-axis labels + chart */}
        <View style={styles.chartRow}>
          <View style={styles.yAxis}>
            {[45, 35, 25, 15, 5, 0].map((v) => (
              <Text key={v} style={styles.yLabel}>
                {v}
              </Text>
            ))}
          </View>

          <View style={styles.barsContainer}>
            {data.map((point, index) => {
              const isActive = index === activeIndex;
              const barHeight = (point.value / MAX_VALUE) * CHART_HEIGHT;

              return (
                <Pressable
                  key={point.label}
                  style={styles.barColumn}
                  onPress={() => setActiveIndex(index)}
                >
                  {isActive && (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipText}>${point.value}</Text>
                    </View>
                  )}
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: isActive ? "#F4845F" : "#0F172A",
                      },
                    ]}
                  />
                  <Text style={styles.xLabel}>{point.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5EFDD",
    borderRadius: 20,
    padding: 16,
  },
  chartRow: {
    flexDirection: "row",
  },
  yAxis: {
    justifyContent: "space-between",
    height: CHART_HEIGHT,
    marginRight: 8,
    paddingBottom: 20, // aligns with x-axis labels below bars
  },
  yLabel: {
    fontSize: 11,
    color: "#8A8578",
  },
  barsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: CHART_HEIGHT + 20,
  },
  barColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: BAR_WIDTH / 2,
  },
  xLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#0F172A",
    fontWeight: "500",
  },
  tooltip: {
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tooltipText: {
    color: "#F4845F",
    fontWeight: "700",
    fontSize: 13,
  },
});
