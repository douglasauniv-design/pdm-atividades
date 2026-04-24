// Pratica de Implementacao 1: Cadastro de Componente de PC
// Formulario completo com os 10 requisitos obrigatorios

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
import ScreenWrapperScrollable from "./src/components/screen-wrappers/ScreenWrapperScrollable";
import FormInput from "./src/components/ui/FormInput";
import FormButton from "./src/components/ui/FormButton";

// Funcao auxiliar para exibir alerta em qualquer plataforma
function showAlert(title: string, message: string) {
  if (Platform.OS === "web") {
    window.alert(title + "\n" + message);
  } else {
    Alert.alert(title, message);
  }
}

export default function App() {
  // Requisito 2: estado do loading simulado
  const [loading, setLoading] = useState<boolean>(true);

  // Requisito 6: estados dos campos do formulario (3 campos)
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Requisito 7: estado do Switch
  const [inStock, setInStock] = useState<boolean>(false);

  // Estados para mensagens de erro de cada campo
  const [nameError, setNameError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");

  // Requisito 9: estado que controla se o botao esta habilitado
  const [formValid, setFormValid] = useState<boolean>(false);

  // Requisito 2: useEffect de montagem que simula loading de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Limpeza do timer ao desmontar
    return () => clearTimeout(timer);
  }, []);

  // Requisito 9: useEffect que monitora os campos e habilita/desabilita o botao
  useEffect(() => {
    const isNameValid = name.trim().length >= 3;
    const isPriceValid = price.trim().length > 0 && !isNaN(Number(price)) && Number(price) > 0;
    const isCategoryValid = category.trim().length >= 2;

    setFormValid(isNameValid && isPriceValid && isCategoryValid);
  }, [name, price, category]);

  // Funcao de validacao que verifica cada campo e define mensagens de erro
  const validate = (): boolean => {
    let valid = true;

    if (name.trim().length === 0) {
      setNameError("Nome e obrigatorio");
      valid = false;
    } else if (name.trim().length < 3) {
      setNameError("Nome deve ter pelo menos 3 caracteres");
      valid = false;
    } else {
      setNameError("");
    }

    if (price.trim().length === 0) {
      setPriceError("Preco e obrigatorio");
      valid = false;
    } else if (isNaN(Number(price))) {
      setPriceError("Preco deve ser um numero valido");
      valid = false;
    } else if (Number(price) <= 0) {
      setPriceError("Preco deve ser maior que zero");
      valid = false;
    } else {
      setPriceError("");
    }

    if (category.trim().length === 0) {
      setCategoryError("Categoria e obrigatoria");
      valid = false;
    } else if (category.trim().length < 2) {
      setCategoryError("Categoria deve ter pelo menos 2 caracteres");
      valid = false;
    } else {
      setCategoryError("");
    }

    return valid;
  };

  // Funcao que limpa todos os campos e erros do formulario
  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setInStock(false);
    setNameError("");
    setPriceError("");
    setCategoryError("");
  };

  // Requisito 10: acao de submissao que loga os valores no console
  const handleSubmit = () => {
    if (!validate()) return;

    console.log("=== Dados do Formulario ===");
    console.log("Nome:", name);
    console.log("Preco:", price);
    console.log("Categoria:", category);
    console.log("Em estoque:", inStock);

    showAlert("Sucesso", "Componente cadastrado com sucesso!");
    resetForm();
  };

  // Requisito 2: tela de loading enquanto carrega
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="auto" />
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Sistema Carregado...</Text>
      </View>
    );
  }

  // Requisito 1: ScreenWrapperScrollable como container principal
  return (
    <ScreenWrapperScrollable gap={16}>
      <StatusBar style="auto" />

      {/* Requisito 3: imagem representando a tematica */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/900/900618.png",
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Cadastro de Componente</Text>
      <Text style={styles.subtitle}>Preencha os dados da peca de PC</Text>

      {/* Requisito 4 e 5: FormInput com label, erro e eventos */}
      <FormInput
        label="Nome do componente"
        placeholder="Ex: RTX 4070 Super"
        value={name}
        onChangeText={setName}
        error={nameError}
      />

      <FormInput
        label="Preco (R$)"
        placeholder="Ex: 3499.90"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        error={priceError}
      />

      <FormInput
        label="Categoria"
        placeholder="Ex: Placa de Video"
        value={category}
        onChangeText={setCategory}
        error={categoryError}
      />

      {/* Requisito 7: Switch para indicar se esta em estoque */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Em estoque</Text>
        <Switch
          value={inStock}
          onValueChange={setInStock}
          trackColor={{ false: "#ddd", true: "#a8d8ea" }}
          thumbColor={inStock ? "#3498db" : "#ccc"}
        />
      </View>

      {/* Requisito 8 e 9: FormButton desabilitado enquanto campos invalidos */}
      <FormButton
        title="Cadastrar"
        onPress={handleSubmit}
        disabled={!formValid}
      />

      {/* Botao secundario para limpar o formulario */}
      <FormButton
        title="Limpar"
        onPress={resetForm}
        variant="secondary"
      />
    </ScreenWrapperScrollable>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 4,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
