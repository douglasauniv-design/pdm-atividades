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
      activeOpacity={0.7}
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
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#2980b9",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#2980b9",
  },
  primaryDisabled: {
    backgroundColor: "#bdc3c7",
  },
  secondaryDisabled: {
    borderColor: "#bdc3c7",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#2980b9",
  },
  disabledText: {
    color: "#95a5a6",
  },
});
