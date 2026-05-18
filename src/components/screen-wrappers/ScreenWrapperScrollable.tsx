import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../contexts/ThemeContext";
import { Colors } from "../../constants/colors";

type ScreenWrapperScrollableProps = {
  children: React.ReactNode;
  padding?: number;
  gap?: number;
};

export default function ScreenWrapperScrollable({
  children,
  padding = 20,
  gap,
}: ScreenWrapperScrollableProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        { padding },
        gap !== undefined && { gap },
      ]}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
