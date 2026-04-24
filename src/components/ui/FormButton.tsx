// Componente reutilizavel FormButton
// Requisito 8: usa TouchableOpacity em vez do Button nativo

import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
  // Seleciona os estilos de acordo com a variante
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          !isPrimary && styles.secondaryText,
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#3498db",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3498db",
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
    borderColor: "#bdc3c7",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#3498db",
  },
  textDisabled: {
    color: "#ecf0f1",
  },
});
