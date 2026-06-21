import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6S2lxgw2YJgyc2C_Pn96qGW-atcbVlIc",
  authDomain: "stock-1d9b4.firebaseapp.com",
  projectId: "stock-1d9b4",
  storageBucket: "stock-1d9b4.firebasestorage.app",
  messagingSenderId: "44794260269",
  appId: "1:44794260269:web:28c2d7a7993b9b460441a4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);