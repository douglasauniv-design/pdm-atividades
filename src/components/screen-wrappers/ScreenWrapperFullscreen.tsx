// Componente ScreenWrapperFullscreen
// Wrapper de tela cheia, ideal para telas de login, splash screens, etc.

import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// Contrato de props do componente
type ScreenWrapperFullscreenProps = {
  children: React.ReactNode;
  center?: boolean;
  padding?: number;
  gap?: number;
};

export default function ScreenWrapperFullscreen({
  children,
  center,
  padding = 20,
  gap,
}: ScreenWrapperFullscreenProps) {
  return (
    <View
      style={[
        styles.container,
        { padding },
        // Centraliza o conteúdo vertical e horizontalmente se center for true
        center && styles.centered,
        // Aplica gap entre os elementos internos se informado
        gap !== undefined && { gap },
      ]}
    >
      <StatusBar style="auto" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});