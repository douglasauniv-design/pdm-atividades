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

  // Controle de quais campos o usuario ja interagiu (tocou e saiu)
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [priceTouched, setPriceTouched] = useState<boolean>(false);
  const [categoryTouched, setCategoryTouched] = useState<boolean>(false);

  // Requisito 9: estado que controla se o botao esta habilitado
  const [formValid, setFormValid] = useState<boolean>(false);

  // Requisito 2: useEffect de montagem que simula loading de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Requisito 9: useEffect que monitora os campos e habilita/desabilita o botao
  // Tambem atualiza os erros dos campos que o usuario ja tocou
  useEffect(() => {
    const isNameValid = name.trim().length >= 3;
    const isPriceValid =
      price.trim().length > 0 && !isNaN(Number(price)) && Number(price) > 0;
    const isCategoryValid = category.trim().length >= 2;

    setFormValid(isNameValid && isPriceValid && isCategoryValid);

    // Mostra ou limpa erros apenas para campos ja tocados
    if (nameTouched) {
      if (name.trim().length === 0) {
        setNameError("Nome e obrigatorio");
      } else if (name.trim().length < 3) {
        setNameError("Nome deve ter pelo menos 3 caracteres");
      } else {
        setNameError("");
      }
    }

    if (priceTouched) {
      if (price.trim().length === 0) {
        setPriceError("Preco e obrigatorio");
      } else if (isNaN(Number(price))) {
        setPriceError("Preco deve ser um numero valido");
      } else if (Number(price) <= 0) {
        setPriceError("Preco deve ser maior que zero");
      } else {
        setPriceError("");
      }
    }

    if (categoryTouched) {
      if (category.trim().length === 0) {
        setCategoryError("Categoria e obrigatoria");
      } else if (category.trim().length < 2) {
        setCategoryError("Categoria deve ter pelo menos 2 caracteres");
      } else {
        setCategoryError("");
      }
    }
  }, [name, price, category, nameTouched, priceTouched, categoryTouched]);

  // Funcao que limpa todos os campos e erros do formulario
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

  // Requisito 10: acao de submissao que loga os valores no console
  const handleSubmit = () => {
    // Loga os dados no console (F12 na web, terminal no Expo Go)
    console.log("=============================");
    console.log("  DADOS DO FORMULARIO");
    console.log("=============================");
    console.log("Nome:", name);
    console.log("Preco: R$", price);
    console.log("Categoria:", category);
    console.log("Em estoque:", inStock ? "Sim" : "Não");
    console.log("=============================");

    // Exibe alerta de sucesso com resumo dos dadosz
    showAlert(
      "Cadastro realizado",
      "Nome: " + name +
      "\nPreco: R$ " + price +
      "\nCategoria: " + category +
      "\nEm estoque: " + (inStock ? "Sim" : "Não")
    );

    // Limpa o formulario para um novo cadastro
    resetForm();
  };

  // Requisito 2: tela de loading enquanto carrega
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#2980b9" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  // Requisito 1: ScreenWrapperScrollable como container principal
  return (
    <ScreenWrapperScrollable gap={14}>
      <StatusBar style="dark" />

      {/* Cabecalho com fundo colorido */}
      <View style={styles.header}>
        {/* Requisito 3: imagem representando a tematica */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/900/900618.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Cadastro de Componente</Text>
        <Text style={styles.subtitle}>Preencha os dados da peca de PC</Text>
      </View>

      {/* Separador visual */}
      <View style={styles.divider} />

      {/* Requisito 4 e 5: FormInput com label, erro e eventos */}
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

      {/* Requisito 7: Switch para indicar se esta em estoque */}
      <View style={[styles.switchRow, inStock && styles.switchRowActive]}>
        <View>
          <Text style={styles.switchLabel}>Em estoque</Text>
          <Text style={styles.switchHint}>
            {inStock ? "Disponivel para venda" : "Indisponivel no momento"}
          </Text>
        </View>
        <Switch
          value={inStock}
          onValueChange={setInStock}
          trackColor={{ false: "#dce1e8", true: "#7fb8de" }}
          thumbColor={inStock ? "#2980b9" : "#bdc3c7"}
        />
      </View>

      {/* Separador visual */}
      <View style={styles.divider} />

      {/* Requisito 8 e 9: FormButton desabilitado enquanto campos invalidos */}
      <FormButton
        title="Cadastrar"
        onPress={handleSubmit}
        disabled={!formValid}
      />

      {/* Botao secundario para limpar o formulario */}
      <FormButton title="Limpar" onPress={resetForm} variant="secondary" />
    </ScreenWrapperScrollable>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 8,
    gap: 6,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  divider: {
    height: 1,
    backgroundColor: "#e8ecf1",
    marginVertical: 4,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#dce1e8",
  },
  switchRowActive: {
    borderColor: "#7fb8de",
    backgroundColor: "#eef6fc",
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  switchHint: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 2,
  },
});
