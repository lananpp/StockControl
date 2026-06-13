import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  buscarProdutos,
  excluirProduto,
} from "../storage/produtoStorage";

import { Produto } from "../types/Produto";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pesquisa, setPesquisa] = useState("");

  async function carregarProdutos() {
    const lista = await buscarProdutos();
    setProdutos(lista);
  }

  async function removerProduto(id: string) {
    Alert.alert(
      "Excluir Produto",
      "Deseja realmente excluir este produto?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await excluirProduto(id);
            carregarProdutos();
          },
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  const totalProdutos = produtos.length;

  const emEstoque = produtos.filter(
    (p) => p.quantidade > 10
  ).length;

  const estoqueBaixo = produtos.filter(
    (p) => p.quantidade > 0 && p.quantidade <= 10
  ).length;

  const semEstoque = produtos.filter(
    (p) => p.quantidade === 0
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        📦 StockControl
      </Text>

      <Text style={styles.subtitulo}>
        Controle Inteligente de Estoque
      </Text>

      <View style={styles.dashboard}>
        <View style={styles.cardDashboard}>
          <Text style={styles.numeroDashboard}>
            {totalProdutos}
          </Text>

          <Text style={styles.labelDashboard}>
            📦 Total
          </Text>
        </View>

        <View style={styles.cardDashboard}>
          <Text style={styles.numeroDashboard}>
            {emEstoque}
          </Text>

          <Text style={styles.labelDashboard}>
            🟢 Estoque
          </Text>
        </View>

        <View style={styles.cardDashboard}>
          <Text style={styles.numeroDashboard}>
            {estoqueBaixo}
          </Text>

          <Text style={styles.labelDashboard}>
            🟡 Baixo
          </Text>
        </View>

        <View style={styles.cardDashboard}>
          <Text style={styles.numeroDashboard}>
            {semEstoque}
          </Text>

          <Text style={styles.labelDashboard}>
            🔴 Zerado
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/cadastrar")}
        style={styles.botaoNovo}
      >
        <Text style={styles.textoBotao}>
          + Novo Produto
        </Text>
      </Pressable>

      <TextInput
        placeholder="🔍 Pesquisar produto..."
        value={pesquisa}
        onChangeText={setPesquisa}
        style={styles.inputPesquisa}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum produto encontrado
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>
              📦 {item.nome}
            </Text>

            <Text style={styles.info}>
              🏷️ Categoria: {item.categoria}
            </Text>

            <Text style={styles.info}>
              💰 Preço: R$ {Number(item.preco || 0).toFixed(2)}
            </Text>

            <Text style={styles.info}>
              📊 Quantidade: {item.quantidade} unidades
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 15,
                color:
                  item.quantidade > 10
                    ? "#16A34A"
                    : item.quantidade > 0
                    ? "#F59E0B"
                    : "#DC2626",
              }}
            >
              {item.quantidade > 10
                ? "🟢 Em estoque"
                : item.quantidade > 0
                ? "🟡 Estoque baixo"
                : "🔴 Sem estoque"}
            </Text>

            <View style={styles.linhaBotoes}>
              <Pressable
                style={styles.botaoEditar}
                onPress={() =>
                  router.push(`/editar?id=${item.id}`)
                }
              >
                <Text style={styles.textoBotao}>
                  Editar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botaoExcluir}
                onPress={() =>
                  removerProduto(item.id)
                }
              >
                <Text style={styles.textoBotao}>
                  Excluir
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#16A34A",
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },

  dashboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  cardDashboard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  numeroDashboard: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16A34A",
  },

  labelDashboard: {
    marginTop: 5,
    color: "#6B7280",
  },

  botaoNovo: {
    backgroundColor: "#16A34A",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  inputPesquisa: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },

  vazio: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 4,
  },

  linhaBotoes: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: "#DC2626",
    padding: 12,
    borderRadius: 8,
  },
});