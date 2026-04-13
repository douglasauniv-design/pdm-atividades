// Atividade 1: Catálogo de Itens Dinâmico
// Tema: Catálogo de Peças de PC

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function App() {
  // Nome do usuário para saudação
  const userName: string = "Douglas";

  // Lista de peças de PC com nome, preço, categoria e indicador de oferta
  const dataList = [
    { name: "RTX 4070 Super", price: 3499.9, category: "Placa de Vídeo", onSale: true },
    { name: "Ryzen 7 7800X3D", price: 2199.0, category: "Processador", onSale: false },
    { name: "Kingston Fury 32GB DDR5", price: 699.9, category: "Memória RAM", onSale: true },
    { name: "Samsung 990 Pro 1TB", price: 579.9, category: "SSD NVMe", onSale: false },
    { name: "Corsair RM850x", price: 849.9, category: "Fonte", onSale: true },
  ];

  return (
    <ScrollView style={styles.screen}>
      <StatusBar style="auto" />

      {/* Saudação com interpolação da variável userName */}
      <Text style={styles.greeting}>Olá, {userName}!</Text>
      <Text style={styles.subtitle}>Catálogo de Peças de PC</Text>

      {/* Loop de renderização com .map(), usando index como key */}
      {dataList.map((item, index) => (
        <View key={index} style={styles.card}>
          {/* Categoria do item */}
          <Text style={styles.category}>{item.category}</Text>

          {/* Nome do item */}
          <Text style={styles.name}>{item.name}</Text>

          {/* Preço com cor condicional: verde se em oferta, cinza caso contrário */}
          <Text
            style={[
              styles.price,
              { color: item.onSale ? "#2ecc71" : "#999" },
            ]}
          >
            R$ {item.price.toFixed(2)}
          </Text>

          {/* Badge de oferta exibido apenas quando onSale é true */}
          {item.onSale && <Text style={styles.badge}>OFERTA</Text>}
        </View>
      ))}
    </ScrollView>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#e74c3c",
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 6,
    overflow: "hidden",
  },
});
