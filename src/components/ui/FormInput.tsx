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
  onBlur?: () => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
};

export default function FormInput({
  label,
  error,
  value,
  onChangeText,
  onBlur,
  placeholder,
  keyboardType = "default",
}: FormInputProps) {
  // Estado para controlar se o campo esta focado
  const [focused, setFocused] = useState<boolean>(false);

  // Verifica se ha erro para aplicar estilos visuais
  const hasError = error !== undefined && error.length > 0;

  // Funcao chamada quando o usuario sai do campo
  const handleBlur = () => {
    setFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View style={styles.container}>
      {/* Label do campo com cor vermelha se houver erro */}
      <Text style={[styles.label, hasError && styles.labelError]}>
        {label}
      </Text>

      {/* Campo de texto com borda que muda conforme o estado */}
      <TextInput
        style={[
          styles.input,
          focused && !hasError && styles.inputFocused,
          hasError && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
      />

      {/* Mensagem de erro visivel apenas quando hasError e true */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  labelError: {
    color: "#d32f2f",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  inputFocused: {
    borderColor: "#3498db",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#d32f2f",
    backgroundColor: "#fef2f2",
  },
  errorText: {
    fontSize: 13,
    color: "#d32f2f",
    fontWeight: "500",
  },
});
