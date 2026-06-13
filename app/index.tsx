import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.icone}>
        📦
      </Text>

      <Text style={styles.titulo}>
        StockControl
      </Text>

      <Text style={styles.subtitulo}>
        Controle Inteligente de Estoque
      </Text>

      <Text style={styles.descricao}>
        Gerencie produtos, acompanhe quantidades
        e mantenha seu estoque organizado
        mesmo sem internet.
      </Text>

      <Pressable
        onPress={() => router.push("/produtos")}
        style={styles.botao}
      >
        <Text style={styles.textoBotao}>
          Entrar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  icone: {
    fontSize: 90,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#16A34A",
  },

  subtitulo: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 25,
  },

  descricao: {
    textAlign: "center",
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 40,
  },

  botao: {
    backgroundColor: "#16A34A",
    width: "100%",
    padding: 16,
    borderRadius: 12,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});