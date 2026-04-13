// Atividade 3: useState
// Tela de identificação de visitante com formulário e renderização condicional

import { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import ScreenWrapperFullscreen from "./src/components/screen-wrappers/ScreenWrapperFullscreen";

export default function App() {
  // Estado para armazenar o nome digitado (tipagem explícita)
  const [name, setName] = useState<string>("");

  // Estado para controlar se o acesso foi autorizado (tipagem explícita)
  const [accessAuthorized, setAccessAuthorized] = useState<boolean>(false);

  // Função chamada ao pressionar o botão de acesso
  const handleAccess = () => {
    setAccessAuthorized(true);
  };

  // Função chamada ao pressionar o botão de sair (reseta o fluxo)
  const handleLogout = () => {
    setAccessAuthorized(false);
    setName("");
  };

  return (
    <ScreenWrapperFullscreen center gap={16}>
      <Text style={styles.title}>Identificação de Visitante</Text>

      {/* Renderização condicional: formulário ou mensagem de boas-vindas */}
      {!accessAuthorized ? (
        // Formulário de entrada exibido enquanto acesso não foi autorizado
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            value={name}
            onChangeText={setName}
          />

          {/* Botão desabilitado enquanto o nome estiver vazio */}
          <Button
            title="Solicitar Acesso"
            onPress={handleAccess}
            disabled={name.trim().length === 0}
          />
        </View>
      ) : (
        // Mensagem de boas-vindas exibida após o acesso ser concedido
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            Acesso Liberado para: {name}
          </Text>

          {/* Botão de sair que reseta o estado e volta ao formulário */}
          <Button title="Sair" onPress={handleLogout} color="#999" />
        </View>
      )}
    </ScreenWrapperFullscreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  welcome: {
    alignItems: "center",
    gap: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
