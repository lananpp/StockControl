import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import {
    atualizarProduto,
    buscarProdutoPorId,
} from "../storage/produtoStorage";

import { Produto } from "../types/Produto";

export default function Editar() {
  const { id } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    carregarProduto();
  }, []);

  async function carregarProduto() {
    const produto = await buscarProdutoPorId(
      id as string
    );

    if (!produto) {
      Alert.alert(
        "Erro",
        "Produto não encontrado."
      );

      router.back();
      return;
    }

    setNome(produto.nome);
    setCategoria(produto.categoria);
    setPreco(String(produto.preco));
    setQuantidade(String(produto.quantidade));
  }

  async function salvarEdicao() {
    if (!nome || !categoria || !preco || !quantidade) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos."
      );
      return;
    }

    const precoConvertido = Number(
      preco.replace(",", ".")
    );

    if (isNaN(precoConvertido)) {
      Alert.alert(
        "Erro",
        "Preço inválido."
      );
      return;
    }

    const produtoAtualizado: Produto = {
      id: id as string,
      nome,
      categoria,
      preco: precoConvertido,
      quantidade: Number(quantidade),
    };

    await atualizarProduto(
      produtoAtualizado
    );

    Alert.alert(
      "Sucesso",
      "Produto atualizado com sucesso!"
    );

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icone}>
        ✏️
      </Text>

      <Text style={styles.titulo}>
        Editar Produto
      </Text>

      <Text style={styles.subtitulo}>
        Atualize as informações do item
      </Text>

      <Text style={styles.label}>
        Nome do Produto
      </Text>

      <TextInput
        placeholder="Digite o nome"
        placeholderTextColor="#9CA3AF"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Text style={styles.label}>
        Categoria
      </Text>

      <TextInput
        placeholder="Digite a categoria"
        placeholderTextColor="#9CA3AF"
        value={categoria}
        onChangeText={setCategoria}
        style={styles.input}
      />

      <Text style={styles.label}>
        Preço (R$)
      </Text>

      <TextInput
        placeholder="0,00"
        placeholderTextColor="#9CA3AF"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>
        Quantidade
      </Text>

      <TextInput
        placeholder="0"
        placeholderTextColor="#9CA3AF"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />

      <Pressable
        style={styles.botao}
        onPress={salvarEdicao}
      >
        <Text style={styles.textoBotao}>
          Atualizar Produto
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  icone: {
    fontSize: 50,
    textAlign: "center",
    marginTop: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
    marginTop: 10,
  },

  subtitulo: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 30,
    marginTop: 5,
    fontSize: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },

  botao: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});