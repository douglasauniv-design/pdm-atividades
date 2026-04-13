// Atividade 2: Screen Wrappers
// Para testar, comente/descomente os retornos abaixo

import { StyleSheet, Text, View } from "react-native";
import ScreenWrapperFullscreen from "./src/components/screen-wrappers/ScreenWrapperFullscreen";
import ScreenWrapperScrollable from "./src/components/screen-wrappers/ScreenWrapperScrollable";

export default function App() {
  // ═══════════════════════════════════════════
  // TESTE 1: ScreenWrapperFullscreen (centralizado)
  // Comente este bloco para testar o Scrollable
  // ═══════════════════════════════════════════
  //return (
    //<ScreenWrapperFullscreen center gap={12}>
      //<Text style={styles.title}>Tela de Acesso</Text>
//      <Text style={styles.text}>Conteúdo centralizado na tela</Text>
//      <View style={styles.box}>
   //     <Text style={styles.boxText}>Login</Text>
 //     </View>
  //  </ScreenWrapperFullscreen>
 // );

  // ═══════════════════════════════════════════
  // TESTE 2: ScreenWrapperScrollable (com rolagem)
  // Descomente este bloco e comente o de cima
  // ═══════════════════════════════════════════
   return (
     <ScreenWrapperScrollable
       gap={10}
       onRefresh={() => console.log("Atualizando...")}
     >
       <Text style={styles.title}>Lista de Itens</Text>
       {Array.from({ length: 20 }, (_, i) => (
         <View key={i} style={styles.card}>
           <Text style={styles.text}>Item {i + 1}</Text>
         </View>
       ))}
     </ScreenWrapperScrollable>
   );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  box: {
    backgroundColor: "#3498db",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
  },
});