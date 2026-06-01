import { StyleSheet, Text, View, SectionList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { convertData, FlatListData } from "./src/utils/groupMotorcycles";
import motorcyclesData from "./src/mocks/motorcycles.json";

// Converte o JSON plano em dados agrupados por categoria
const sections = convertData(motorcyclesData as FlatListData);

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <Text style={styles.header}>Catalogo de Motocicletas</Text>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.model}>{item.model}</Text>
              <Text style={styles.details}>
                {item.brand} - {item.year}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          renderSectionFooter={({ section }) => (
            <Text style={styles.sectionFooter}>
              Total: {section.data.length} motocicletas
            </Text>
          )}
          stickySectionHeadersEnabled
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    padding: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
    backgroundColor: "#4A90D9",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  model: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  details: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  sectionFooter: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#181818",
  },
});
