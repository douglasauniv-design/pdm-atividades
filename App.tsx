// Atividade 4: useEffect
// Sensor de estacionamento com ciclo de vida completo

import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

// Função auxiliar para exibir alerta tanto na web quanto no celular
function showAlert(title: string, message: string) {
  if (Platform.OS === "web") {
    window.alert(title + "\n" + message);
  } else {
    Alert.alert(title, message);
  }
}

// Componente do sensor de estacionamento
function ParkingSensor() {
  // Estado numérico da distância em cm
  const [distancia, setDistancia] = useState<number>(50);

  // 1. Inicialização: executa apenas na montagem (array vazio [])
  useEffect(() => {
    console.log("📡 Sistema de Sensores Iniciado");

    // Intervalo que loga a cada 2 segundos indicando que o sistema está ativo
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
    if (distancia < 20) {
      showAlert("⚠️ PERIGO", "Muito Próximo!");
    }
  }, [distancia]);

  return (
    <View style={styles.sensor}>
      <Text style={styles.title}>Sensor de Estacionamento</Text>
      <Text style={styles.distance}>{distancia} cm</Text>
      <View style={styles.buttons}>
        <Button title="- 5 cm" onPress={() => setDistancia(Math.max(0, distancia - 5))} />
        <Button title="+ 5 cm" onPress={() => setDistancia(distancia + 5)} />
      </View>
    </View>
  );
}

// Componente principal que liga/desliga o sensor pra testar o unmount
export default function App() {
  // Estado que controla se o sensor está visível (montado) ou não
  const [sensorOn, setSensorOn] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title={sensorOn ? "Desligar Sensor" : "Ligar Sensor"}
        onPress={() => setSensorOn(!sensorOn)}
      />
      {/* Renderização condicional: monta/desmonta o sensor */}
      {sensorOn && <ParkingSensor />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  sensor: {
    alignItems: "center",
    gap: 12,
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
