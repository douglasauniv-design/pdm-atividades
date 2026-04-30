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

  // Verifica se o campo tem valor valido (para indicador visual)
  const isValid = value.trim().length > 0 && !hasError;

  // Funcao chamada quando o usuario sai do campo
  const handleBlur = () => {
    setFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View style={styles.container}>
      {/* Label do campo com cor que muda conforme estado */}
      <Text
        style={[
          styles.label,
          focused && !hasError && styles.labelFocused,
          hasError && styles.labelError,
        ]}
      >
        {label}
      </Text>

      {/* Campo de texto com borda que muda conforme o estado */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            focused && !hasError && styles.inputFocused,
            hasError && styles.inputError,
            isValid && !focused && styles.inputValid,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#b0b8c1"
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        />

        {/* Indicador visual de status no canto direito */}
        {hasError && <Text style={styles.statusIcon}>!</Text>}
        {isValid && !focused && <Text style={styles.checkIcon}>OK</Text>}
      </View>

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
    fontSize: 13,
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  labelFocused: {
    color: "#2563eb",
  },
  labelError: {
    color: "#dc2626",
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    paddingRight: 40,
    fontSize: 16,
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  },
  inputFocused: {
    borderColor: "#2563eb",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  inputValid: {
    borderColor: "#16a34a",
    backgroundColor: "#f0fdf4",
  },
  statusIcon: {
    position: "absolute",
    right: 14,
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc2626",
  },
  checkIcon: {
    position: "absolute",
    right: 12,
    fontSize: 12,
    fontWeight: "bold",
    color: "#16a34a",
  },
  errorText: {
    fontSize: 13,
    color: "#dc2626",
    fontWeight: "500",
  },
});
