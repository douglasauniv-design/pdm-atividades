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
        disabled && styles.disabled,
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
    backgroundColor: "#3498db",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#3498db",
  },
  disabled: {
    backgroundColor: "#d5d5d5",
    borderColor: "#d5d5d5",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#3498db",
  },
  disabledText: {
    color: "#999",
  },
});
