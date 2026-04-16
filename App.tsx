// Prática de Implementação 1: Cadastro de Componente de PC
// Formulário completo com os 10 requisitos obrigatórios

import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ScreenWrapperScrollable from "./src/components/screen-wrappers/ScreenWrapperScrollable";
import FormInput from "./src/components/ui/FormInput";
import FormButton from "./src/components/ui/FormButton";

export default function App() {
  // Requisito 2: estado do loading simulado
  const [loading, setLoading] = useState<boolean>(true);

  // Requisito 6: estados dos campos do formulário (pelo menos 3)
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Requisito 7: estado do Switch
  const [inStock, setInStock] = useState<boolean>(false);

  // Estados para mensagens de erro dos campos
  const [nameError, setNameError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");

  // Requisito 9: estado que controla se o botão está habilitado
  const [formValid, setFormValid] = useState<boolean>(false);

  // Requisito 2: useEffect de montagem que simula loading de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Requisito 9: useEffect que monitora os campos e habilita/desabilita o botão
  useEffect(() => {
    const isNameValid = name.trim().length > 0;
    const isPriceValid = price.trim().length > 0 && !isNaN(Number(price));
    const isCategoryValid = category.trim().length > 0;

    setFormValid(isNameValid && isPriceValid && isCategoryValid);
  }, [name, price, category]);

  // Função de validação executada ao submeter
  const validate = (): boolean => {
    let valid = true;

    if (name.trim().length === 0) {
      setNameError("Nome é obrigatório");
      valid = false;
    } else {
      setNameError("");
    }

    if (price.trim().length === 0) {
      setPriceError("Preço é obrigatório");
      valid = false;
    } else if (isNaN(Number(price))) {
      setPriceError("Preço deve ser um número");
      valid = false;
    } else {
      setPriceError("");
    }

    if (category.trim().length === 0) {
      setCategoryError("Categoria é obrigatória");
      valid = false;
    } else {
      setCategoryError("");
    }

    return valid;
  };

  // Requisito 10: ação de submissão que loga os valores no console
  const handleSubmit = () => {
    if (!validate()) return;

    console.log("=== Dados do Formulário ===");
    console.log("Nome:", name);
    console.log("Preço:", price);
    console.log("Categoria:", category);
    console.log("Em estoque:", inStock);
  };

  // Requisito 2: tela de loading enquanto carrega
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="auto" />
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Sistema Carregado...</Text>
      </View>
    );
  }

  // Requisito 1: ScreenWrapperScrollable como container principal
  return (
    <ScreenWrapperScrollable gap={14}>
      <StatusBar style="auto" />

      {/* Requisito 3: imagem representando a temática */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/900/900618.png" }}
        style={styles.logo}
      />

      <Text style={styles.title}>Cadastro de Componente</Text>

      {/* Requisito 4 e 5: FormInput com label, erro e eventos */}
      <FormInput
        label="Nome do componente"
        placeholder="Ex: RTX 4070 Super"
        value={name}
        onChangeText={setName}
        error={nameError}
      />

      <FormInput
        label="Preço (R$)"
        placeholder="Ex: 3499.90"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        error={priceError}
      />

      <FormInput
        label="Categoria"
        placeholder="Ex: Placa de Vídeo"
        value={category}
        onChangeText={setCategory}
        error={categoryError}
      />

      {/* Requisito 7: Switch para indicar se está em estoque */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Em estoque</Text>
        <Switch value={inStock} onValueChange={setInStock} />
      </View>

      {/* Requisito 8 e 9: FormButton desabilitado enquanto campos inválidos */}
      <FormButton
        title="Cadastrar"
        onPress={handleSubmit}
        disabled={!formValid}
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
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
