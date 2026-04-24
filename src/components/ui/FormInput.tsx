// Componente reutilizavel FormInput
// Requisito 4: recebe label, error e eventos de alteracao de texto
// Requisito 5: exibe mensagem de erro em cor destacada quando invalido

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type FormInputProps = {
  label: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
  secureTextEntry?: boolean;
};

export default function FormInput({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
}: FormInputProps) {
  // Estado para controlar se o campo esta focado
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* Label do campo */}
      <Text style={styles.label}>{label}</Text>

      {/* Campo de texto com borda que muda conforme estado */}
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  inputFocused: {
    borderColor: "#3498db",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
    backgroundColor: "#fff5f5",
  },
  error: {
    fontSize: 12,
    color: "#e74c3c",
  },
});
