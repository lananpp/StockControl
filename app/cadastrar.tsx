import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { salvarProdutoFirebase } from "../services/firebaseservice";
import { buscarProdutos, salvarProdutos } from "../storage/produtoStorage";
import { Produto } from "../types/Produto";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const salvarNovoProduto = async () => {
    if (!nome || !categoria || !preco || !quantidade) {
      Alert.alert("Erro", "Preencha todos os campos.");
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

    const novoProduto: Produto = {
      id: Date.now().toString(),
      nome,
      categoria,
      preco: precoConvertido,
      quantidade: Number(quantidade),
    };

    const produtos = await buscarProdutos();

    produtos.push(novoProduto);

// Salva localmente (Offline First)
    await salvarProdutos(produtos);

    try{
        Alert.alert("Teste", "Entrou no Firebase");

        await salvarProdutoFirebase(novoProduto);

        Alert.alert("Firebase", "Salvou no Firebase");
      } catch (error) {
        Alert.alert("Erro Firebase", JSON.stringify(error));
      }

          setNome("");
          setCategoria("");
          setPreco("");
          setQuantidade("");
        };

  return (
    <View style={styles.container}>
      <Text style={styles.icone}>
        📦
      </Text>

      <Text style={styles.titulo}>
        Cadastrar Produto
      </Text>

      <Text style={styles.subtitulo}>
        Adicione um novo item ao estoque
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
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
      />

      <Text style={styles.label}>
        Quantidade
      </Text>

      <TextInput
        placeholder="0"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
      />

      <Pressable
        onPress={salvarNovoProduto}
        style={styles.botao}
      >
        <Text style={styles.textoBotao}>
          Salvar Produto
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
    color: "#16A34A",
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
    backgroundColor: "#16A34A",
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