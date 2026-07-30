import images from "@/constants/images";
import { useClerk, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { styled } from "nativewind";
import { usePostHog } from "posthog-react-native";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

// ── Reusable glass card ───────────────────────────────────────────────────────
type GlassCardProps = {
  children: React.ReactNode;
  tint: "light" | "dark";
  style?: object;
};

const GlassCard = ({ children, tint, style }: GlassCardProps) => (
  <View style={[{ borderRadius: 16, overflow: "hidden" }, style]}>
    <BlurView
      intensity={tint === "dark" ? 28 : 55}
      tint={tint}
      style={{
        backgroundColor:
          tint === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.58)",
        borderWidth: 1,
        borderRadius: 16,
        borderColor:
          tint === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)",
      }}
    >
      {children}
    </BlurView>
  </View>
);

// ── Row ──────────────────────────────────────────────────────────────────────
type SettingsRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  iconColor?: string;
  last?: boolean;
  isDark: boolean;
};

const SettingsRow = ({
  icon,
  label,
  value,
  iconColor = "#6b7280",
  last = false,
  isDark,
}: SettingsRowProps) => (
  <View>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark
            ? "rgba(255,255,255,0.10)"
            : "rgba(0,0,0,0.06)",
        }}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>

      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontFamily: "sans-medium",
          color: isDark ? "#ffffff" : "#081126",
        }}
      >
        {label}
      </Text>

      {value ? (
        <Text
          numberOfLines={1}
          style={{
            fontSize: 14,
            fontFamily: "sans-medium",
            color: isDark ? "#e8dfc8" : "rgba(0,0,0,0.45)",
          }}
        >
          {value}
        </Text>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={isDark ? "#e8dfc8" : "rgba(0,0,0,0.30)"}
        />
      )}
    </View>

    {!last && (
      <View
        style={{
          height: 0.5,
          marginLeft: 60,
          backgroundColor: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.07)",
        }}
      />
    )}
  </View>
);

// ── Section label ────────────────────────────────────────────────────────────
const SectionLabel = ({ text, isDark }: { text: string; isDark: boolean }) => (
  <Text
    style={{
      fontSize: 11,
      fontFamily: "sans-semibold",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginBottom: 6,
      marginLeft: 4,
      color: isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)",
    }}
  >
    {text}
  </Text>
);

// ── Main screen ──────────────────────────────────────────────────────────────
const Settings = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const posthog = usePostHog();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const tint: "light" | "dark" = isDark ? "dark" : "light";

  const handleSignOut = async () => {
    posthog.capture("user_signed_out");
    try {
      await signOut();
      posthog.reset();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress ||
    "User";
  const email = user?.emailAddresses[0]?.emailAddress;

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-darkBackground">
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 30,
            fontFamily: "sans-bold",
            color: isDark ? "#e8dfc8" : "#081126",
            marginBottom: 24,
          }}
        >
          Settings
        </Text>

        {/* ── Profile ── */}
        <GlassCard tint={tint} style={{ marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 16,
              gap: 14,
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 2,
                  borderColor: isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.08)",
                }}
              />
              {/* Online dot */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: "#4ade80",
                  borderWidth: 2.5,
                  borderColor: isDark ? "#242c40" : "#fff9e3",
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "sans-bold",
                  color: isDark ? "#e9ecef" : "#081126",
                }}
              >
                {displayName}
              </Text>
              {email && (
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "sans-medium",
                    marginTop: 2,
                    color: isDark ? "#dee2e6" : "rgba(0,0,0,0.48)",
                  }}
                >
                  {email}
                </Text>
              )}
            </View>
          </View>
        </GlassCard>

        {/* ── Account ── */}
        <SectionLabel text="Account" isDark={isDark} />
        <GlassCard tint={tint} style={{ marginBottom: 16 }}>
          <SettingsRow
            icon="person-outline"
            label="Account ID"
            value={`${user?.id?.substring(0, 14)}…`}
            iconColor="#60a5fa"
            isDark={isDark}
          />
          <SettingsRow
            icon="calendar-outline"
            label="Joined"
            value={
              user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"
            }
            iconColor="#a78bfa"
            isDark={isDark}
            last
          />
        </GlassCard>

        {/* ── Preferences ── */}
        <SectionLabel text="Preferences" isDark={isDark} />
        <GlassCard tint={tint} style={{ marginBottom: 16 }}>
          <SettingsRow
            icon="moon-outline"
            label="Appearance"
            value={isDark ? "Dark" : "Light"}
            iconColor="#818cf8"
            isDark={isDark}
          />
          <SettingsRow
            icon="notifications-outline"
            label="Notifications"
            iconColor="#fb923c"
            isDark={isDark}
          />
          <SettingsRow
            icon="globe-outline"
            label="Language"
            value="English"
            iconColor="#34d399"
            isDark={isDark}
            last
          />
        </GlassCard>

        {/* ── About ── */}
        <SectionLabel text="About" isDark={isDark} />
        <GlassCard tint={tint} style={{ marginBottom: 24 }}>
          <SettingsRow
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            iconColor="#38bdf8"
            isDark={isDark}
          />
          <SettingsRow
            icon="document-text-outline"
            label="Terms of Service"
            iconColor="#a3e635"
            isDark={isDark}
          />
          <SettingsRow
            icon="information-circle-outline"
            label="Version"
            value="1.0.0"
            iconColor="#94a3b8"
            isDark={isDark}
            last
          />
        </GlassCard>

        {/* ── Sign Out ── */}
        <GlassCard tint={tint}>
          <Pressable
            onPress={handleSignOut}
            style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 14,
                gap: 10,
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#f87171" />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "sans-semibold",
                  color: "#f87171",
                }}
              >
                Sign Out
              </Text>
            </View>
          </Pressable>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
