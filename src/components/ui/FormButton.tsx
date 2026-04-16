// Componente reutilizável FormButton
// Requisito 8: usa TouchableOpacity em vez do Button nativo

import { StyleSheet, Text, TouchableOpacity } from "react-native";

type FormButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function FormButton({
  title,
  onPress,
  disabled = false,
}: FormButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textDisabled: {
    color: "#ecf0f1",
  },
});
