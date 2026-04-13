// Componente ScreenWrapperScrollable
// Wrapper com rolagem, ideal para telas com muito conteúdo (listas, formulários)

import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";

// Contrato de props do componente
type ScreenWrapperScrollableProps = {
  children: React.ReactNode;
  padding?: number;
  gap?: number;
  onRefresh?: () => void;
};

export default function ScreenWrapperScrollable({
  children,
  padding = 20,
  gap,
  onRefresh,
}: ScreenWrapperScrollableProps) {
  // Estado que controla a animação de "puxar para atualizar"
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Função chamada ao puxar a tela para baixo
  const handleRefresh = useCallback(() => {
    if (!onRefresh) return;
    setRefreshing(true);
    onRefresh();
    // Simula o fim do carregamento após 1 segundo
    setTimeout(() => setRefreshing(false), 1000);
  }, [onRefresh]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        { padding },
        gap !== undefined && { gap },
      ]}
      // Habilita o RefreshControl somente se onRefresh foi passado
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        ) : undefined
      }
    >
      <StatusBar style="auto" />
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});