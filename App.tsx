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
        setPriceError("Preço e obrigatorio");
      } else if (isNaN(Number(price))) {
        setPriceError("Preço deve ser um numero valido");
      } else if (Number(price) <= 0) {
        setPriceError("Preço deve ser maior que zero");
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

  // Calcula quantos campos estao preenchidos corretamente
  const filledCount = [
    name.trim().length >= 3,
    price.trim().length > 0 && !isNaN(Number(price)) && Number(price) > 0,
    category.trim().length >= 2,
  ].filter(Boolean).length;

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
    console.log("=============================");
    console.log("  DADOS DO FORMULARIO");
    console.log("=============================");
    console.log("Nome:", name);
    console.log("Preço: R$", price);
    console.log("Categoria:", category);
    console.log("Em estoque:", inStock ? "Sim" : "Não");
    console.log("=============================");

    showAlert(
      "Cadastro realizado",
      "Nome: " + name +
      "\nPreço: R$ " + price +
      "\nCategoria: " + category +
      "\nEm estoque: " + (inStock ? "Sim" : "Não")
    );

    resetForm();
  };

  // Requisito 2: tela de loading enquanto carrega
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <View style={styles.loadingContent}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/900/900618.png",
            }}
            style={styles.loadingLogo}
          />
          <Text style={styles.loadingTitle}>PC - Cadastro</Text>
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 24 }}
          />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    );
  }

  // Requisito 1: ScreenWrapperScrollable como container principal
  return (
    <ScreenWrapperScrollable padding={0}>
      <StatusBar style="light" />

      {/* Cabecalho escuro com logo e titulo */}
      <View style={styles.header}>
        {/* Requisito 3: imagem representando a tematica */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/900/900618.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Cadastro de Componente</Text>
        <Text style={styles.subtitle}>Adicione peças ao seu inventario</Text>
      </View>

      {/* Barra de progresso dos campos */}
      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Progresso</Text>
          <Text style={styles.progressCount}>{filledCount}/3 campos</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { flex: filledCount, },
              filledCount === 3 && styles.progressComplete,
            ]}
          />
          <View style={{ flex: 3 - filledCount }} />
        </View>
      </View>

      {/* Card com os campos do formulario */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados do Componente</Text>

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
          label="Preço (R$)"
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
      </View>

      {/* Card com o switch */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Disponibilidade</Text>

        {/* Requisito 7: Switch para indicar se esta em estoque */}
        <View style={[styles.switchRow, inStock && styles.switchRowActive]}>
          <View>
            <Text style={[styles.switchLabel, inStock && styles.switchLabelActive]}>
              Em estoque
            </Text>
            <Text style={styles.switchHint}>
              {inStock ? "Disponivel para venda" : "Indisponivel no momento"}
            </Text>
          </View>
          <Switch
            value={inStock}
            onValueChange={setInStock}
            trackColor={{ false: "#e2e8f0", true: "#93c5fd" }}
            thumbColor={inStock ? "#2563eb" : "#cbd5e1"}
          />
        </View>
      </View>

      {/* Card com os botoes */}
      <View style={styles.card}>
        {/* Requisito 8 e 9: FormButton desabilitado enquanto campos invalidos */}
        <FormButton
          title="Cadastrar"
          onPress={handleSubmit}
          disabled={!formValid}
        />

        <FormButton title="Limpar campos" onPress={resetForm} variant="secondary" />
      </View>

      {/* Espaco extra no final para respiro */}
      <View style={{ height: 20 }} />
    </ScreenWrapperScrollable>
  );
}

const styles = StyleSheet.create({
  // Loading
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1e293b",
  },
  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  loadingLogo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingText: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 8,
  },

  // Cabecalho
  header: {
    backgroundColor: "#1e293b",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 28,
    gap: 4,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
  },

  // Barra de progresso
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#f1f5f9",
    gap: 8,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
  },
  progressCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563eb",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 3,
  },
  progressComplete: {
    backgroundColor: "#16a34a",
  },

  // Cards
  card: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: "#e9eef4",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 2,
  },

  // Switch
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
  },
  switchRowActive: {
    borderColor: "#93c5fd",
    backgroundColor: "#eff6ff",
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  switchLabelActive: {
    color: "#2563eb",
  },
  switchHint: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
  },
});
