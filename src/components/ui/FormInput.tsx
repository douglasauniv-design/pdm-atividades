// Componente reutilizável FormInput
// Requisito 4: recebe label, error e eventos de alteração de texto
// Requisito 5: exibe mensagem de erro em cor destacada quando inválido

import { StyleSheet, Text, TextInput, View } from "react-native";

type FormInputProps = {
  label: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
};

export default function FormInput({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: FormInputProps) {
  return (
    <View style={styles.container}>
      {/* Label do campo */}
      <Text style={styles.label}>{label}</Text>

      {/* Campo de texto com borda vermelha se houver erro */}
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />

      {/* Mensagem de erro exibida apenas quando error tem valor */}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  error: {
    fontSize: 12,
    color: "#e74c3c",
  },
});
