// Componente do Sensor de Estacionamento
// Demonstra os três usos do useEffect: montagem, monitoramento e limpeza

import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";

export default function ParkingSensor() {
  // Estado que armazena a distância digitada pelo usuário (em cm)
  const [distance, setDistance] = useState<string>("");

  // 1. Inicialização: executa apenas na montagem do componente (array vazio)
  useEffect(() => {
    console.log("📡 Sistema de Sensores Iniciado");

    // Intervalo que loga a cada 2 segundos para indicar que o sistema está ativo
    const intervalId = setInterval(() => {
      console.log("🔄 Sistema ativo...");
    }, 2000);

    // Callback de limpeza: executa quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
      console.log("📴 Sistema de Sensores Desligado");
    };
  }, []);

  // 2. Monitoramento: executa sempre que a distância muda
  useEffect(() => {
    const value = Number(distance);

    // Se a distância for um número válido e menor que 20cm, exibe alerta
    if (!isNaN(value) && value > 0 && value < 20) {
      Alert.alert("⚠️ PERIGO", "Muito Próximo!");
    }
  }, [distance]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor de Estacionamento</Text>

      <Text style={styles.label}>Distância (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a distância em cm"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />

      {/* Exibe a distância atual se houver valor digitado */}
      {distance.length > 0 && (
        <Text style={styles.info}>Distância atual: {distance} cm</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: "#333",
  },
});
