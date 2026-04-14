// Componente do Sensor de Estacionamento
// Demonstra os três usos do useEffect: montagem, monitoramento e limpeza

import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

export default function ParkingSensor() {
  // Estado numérico que armazena a distância (em cm)
  const [distance, setDistance] = useState<number>(50);

  // 1. Inicialização: executa apenas na montagem do componente (array vazio)
  useEffect(() => {
    console.log("📡 Sistema de Sensores Iniciado");

    // Intervalo que loga a cada 2 segundos para indicar que o sistema está ativo
    const intervalId = setInterval(() => {
      console.log("🔄 Sistema ativo...");
    }, 2000);

    // 3. Callback de limpeza: para o intervalo e loga ao desmontar
    return () => {
      clearInterval(intervalId);
      console.log("📴 Sistema de Sensores Desligado");
    };
  }, []);

  // 2. Monitoramento: executa sempre que a distância muda
  useEffect(() => {
    if (distance < 20) {
      Alert.alert("⚠️ PERIGO", "Muito Próximo!");
    }
  }, [distance]);

  // Funções para aumentar e diminuir a distância
  const increase = () => setDistance(distance + 5);
  const decrease = () => setDistance(Math.max(0, distance - 5));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor de Estacionamento</Text>

      {/* Exibe a distância atual */}
      <Text style={styles.distance}>{distance} cm</Text>

      {/* Botões para alterar a distância */}
      <View style={styles.buttons}>
        <Button title="- 5 cm" onPress={decrease} />
        <Button title="+ 5 cm" onPress={increase} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  distance: {
    fontSize: 32,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 16,
  },
});
