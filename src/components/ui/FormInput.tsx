// Componente reutilizavel FormInput
// Requisito 4: recebe label, error e eventos de alteracao de texto
// Requisito 5: exibe mensagem de erro em cor destacada quando invalido

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// Contrato de props do componente
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
  // Estado para controlar se o campo esta focado
  const [focused, setFocused] = useState<boolean>(false);

  // Verifica se ha erro para aplicar estilos visuais
  const hasError = error !== undefined && error !== "";

  return (
    <View style={styles.container}>
      {/* Label do campo */}
      <Text style={[styles.label, hasError && styles.labelError]}>
        {label}
      </Text>

      {/* Campo de texto com borda que muda conforme estado */}
      <TextInput
        style={[
          styles.input,
          focused && !hasError && styles.inputFocused,
          hasError && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {/* Mensagem de erro exibida apenas quando hasError e true */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
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
  labelError: {
    color: "#e74c3c",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  inputFocused: {
    borderColor: "#3498db",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    fontSize: 13,
    color: "#e74c3c",
    marginTop: 2,
  },
});
