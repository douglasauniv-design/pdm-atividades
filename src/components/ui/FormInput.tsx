import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { Colors } from "../../constants/colors";

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
  const [focused, setFocused] = useState<boolean>(false);
  const { theme } = useTheme();
  const colors = Colors[theme];

  const hasError = error !== undefined && error.length > 0;

  const handleBlur = () => {
    setFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: hasError ? "#dc2626" : colors.text }]}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text,
          },
          focused && !hasError && { borderColor: colors.primary },
          hasError && { borderColor: "#dc2626", backgroundColor: theme === "dark" ? "#2a1515" : "#fef2f2" },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
      />

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
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    color: "#dc2626",
    fontWeight: "500",
  },
});
