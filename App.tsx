// Ponto de entrada principal do aplicativo
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // Nome do usuário para saudação (será usado na Atividade 1)
  const userName: string = "Estudante PDM";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>📱 PDM - Atividades</Text>
      <Text style={styles.subtitle}>Olá, {userName}!</Text>
      <Text style={styles.info}>Ambiente configurado com sucesso!</Text>
    </View>
  );
}

// Estilos da tela principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e94560",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#eaeaea",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#0f3460",
    backgroundColor: "#16213e",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
    color: "#a8d8ea",
    overflow: "hidden",
  },
});
