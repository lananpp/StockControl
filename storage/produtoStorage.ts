import AsyncStorage from "@react-native-async-storage/async-storage";
import { Produto } from "../types/Produto";

const CHAVE_PRODUTOS = "@stockcontrol_produtos";

export async function buscarProdutos(): Promise<Produto[]> {
  const dados = await AsyncStorage.getItem(CHAVE_PRODUTOS);

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

export async function salvarProdutos(produtos: Produto[]) {
  await AsyncStorage.setItem(
    CHAVE_PRODUTOS,
    JSON.stringify(produtos)
  );
}

export async function buscarProdutoPorId(id: string) {
  const produtos = await buscarProdutos();

  return produtos.find(
    (produto) => produto.id === id
  );
}

export async function atualizarProduto(
  produtoAtualizado: Produto
) {
  const produtos = await buscarProdutos();

  const novaLista = produtos.map((produto) =>
    produto.id === produtoAtualizado.id
      ? produtoAtualizado
      : produto
  );

  await salvarProdutos(novaLista);
}

export async function excluirProduto(id: string) {
  const produtos = await buscarProdutos();

  const novaLista = produtos.filter(
    (produto) => produto.id !== id
  );

  await salvarProdutos(novaLista);
}