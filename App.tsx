import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ThemeContextProvider, { useTheme } from "./src/contexts/ThemeContext";
import { Colors } from "./src/constants/colors";
import ScreenWrapperScrollable from "./src/components/screen-wrappers/ScreenWrapperScrollable";
import FormInput from "./src/components/ui/FormInput";
import FormButton from "./src/components/ui/FormButton";

function showAlert(title: string, message: string) {
  if (Platform.OS === "web") {
    window.alert(title + "\n" + message);
  } else {
    Alert.alert(title, message);
  }
}

// Tela principal extraida para usar o useTheme dentro do Provider
function MainScreen() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [inStock, setInStock] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [priceTouched, setPriceTouched] = useState<boolean>(false);
  const [categoryTouched, setCategoryTouched] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isNameValid = name.trim().length >= 3;
    const isPriceValid =
      price.trim().length > 0 && !isNaN(Number(price)) && Number(price) > 0;
    const isCategoryValid = category.trim().length >= 2;

    setFormValid(isNameValid && isPriceValid && isCategoryValid);

    if (nameTouched) {
      if (name.trim().length === 0) setNameError("Nome e obrigatorio");
      else if (name.trim().length < 3) setNameError("Minimo 3 caracteres");
      else setNameError("");
    }
    if (priceTouched) {
      if (price.trim().length === 0) setPriceError("Preco e obrigatorio");
      else if (isNaN(Number(price))) setPriceError("Deve ser um numero");
      else if (Number(price) <= 0) setPriceError("Deve ser maior que zero");
      else setPriceError("");
    }
    if (categoryTouched) {
      if (category.trim().length === 0) setCategoryError("Categoria e obrigatoria");
      else if (category.trim().length < 2) setCategoryError("Minimo 2 caracteres");
      else setCategoryError("");
    }
  }, [name, price, category, nameTouched, priceTouched, categoryTouched]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setInStock(false);
    setNameError("");
    setPriceError("");
    setCategoryError("");
    setNameTouched(false);
    setPriceTouched(false);
    setCategoryTouched(false);
  };

  const handleSubmit = () => {
    console.log("=============================");
    console.log("  DADOS DO FORMULARIO");
    console.log("=============================");
    console.log("Nome:", name);
    console.log("Preco: R$", price);
    console.log("Categoria:", category);
    console.log("Em estoque:", inStock ? "Sim" : "Nao");
    console.log("=============================");

    showAlert(
      "Cadastro realizado",
      "Nome: " + name +
      "\nPreco: R$ " + price +
      "\nCategoria: " + category +
      "\nEm estoque: " + (inStock ? "Sim" : "Nao")
    );
    resetForm();
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/900/900618.png" }}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.placeholder }]}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScreenWrapperScrollable gap={14}>
      {/* Cabecalho */}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>Cadastro de Componente</Text>
      </View>

      {/* Switch de tema - Context API */}
      <View style={[styles.themeRow, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.themeLabel, { color: colors.text }]}>Tema</Text>
          <Text style={{ fontSize: 12, color: colors.placeholder }}>
            {theme === "dark" ? "Modo escuro" : "Modo claro"}
          </Text>
        </View>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: "#ddd", true: "#555" }}
          thumbColor={theme === "dark" ? "#fff" : "#333"}
        />
      </View>

      {/* Imagem */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/900/900618.png" }}
        style={styles.logoSmall}
      />

      {/* Campos */}
      <FormInput
        label="Nome do componente"
        placeholder="Ex: RTX 4070 Super"
        value={name}
        onChangeText={setName}
        onBlur={() => setNameTouched(true)}
        error={nameError}
      />
      <FormInput
        label="Preco (R$)"
        placeholder="Ex: 3499.90"
        value={price}
        onChangeText={setPrice}
        onBlur={() => setPriceTouched(true)}
        keyboardType="numeric"
        error={priceError}
      />
      <FormInput
        label="Categoria"
        placeholder="Ex: Placa de Video"
        value={category}
        onChangeText={setCategory}
        onBlur={() => setCategoryTouched(true)}
        error={categoryError}
      />

      {/* Switch em estoque */}
      <View style={[styles.switchRow, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <Text style={[styles.switchLabel, { color: colors.text }]}>Em estoque</Text>
        <Switch
          value={inStock}
          onValueChange={setInStock}
          trackColor={{ false: "#ddd", true: "#7fb8de" }}
          thumbColor={inStock ? colors.primary : "#ccc"}
        />
      </View>

      {/* Botoes */}
      <FormButton title="Cadastrar" onPress={handleSubmit} disabled={!formValid} />
      <FormButton title="Limpar" onPress={resetForm} variant="secondary" />
    </ScreenWrapperScrollable>
  );
}

// App envolve tudo com o ThemeContextProvider
export default function App() {
  return (
    <ThemeContextProvider>
      <MainScreen />
    </ThemeContextProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 12,
  },
  logoSmall: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  headerRow: {
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
