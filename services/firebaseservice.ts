import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function salvarProdutoFirebase(produto: any) {
  await addDoc(collection(db, "produtos"), produto);
}

export async function buscarProdutosFirebase() {
  const snapshot = await getDocs(collection(db, "produtos"));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}