import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { Colors } from "../../constants/colors";

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
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary
          ? { backgroundColor: colors.primary }
          : { backgroundColor: "transparent", borderWidth: 1.5, borderColor: colors.border },
        disabled && { backgroundColor: colors.border },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          !isPrimary && { color: colors.text },
          disabled && { color: colors.placeholder },
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
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
