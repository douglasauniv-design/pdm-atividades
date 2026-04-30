// Componente reutilizavel FormButton
// Requisito 8: usa TouchableOpacity em vez do Button nativo

import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Contrato de props do componente
type FormButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export default function FormButton({
  title,
  onPress,
  disabled = false,
  variant = "primary",
}: FormButtonProps) {
  // Verifica se e a variante principal
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && (isPrimary ? styles.primaryDisabled : styles.secondaryDisabled),
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          !isPrimary && styles.secondaryText,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#2563eb",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
  },
  primaryDisabled: {
    backgroundColor: "#cbd5e1",
  },
  secondaryDisabled: {
    borderColor: "#e2e8f0",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  secondaryText: {
    color: "#64748b",
    fontWeight: "600",
  },
  disabledText: {
    color: "#94a3b8",
  },
});
