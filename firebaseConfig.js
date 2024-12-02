import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkUIMZAoejSAM4CsnefW46AoNazpgf6po",
  database: "arthive-3e4d1.firebaseapp.com",
  authDomain: "arthive-3e4d1.firebaseapp.com",
  projectId: "arthive-3e4d1",
  storageBucket: "arthive-3e4d1.firebasestorage.app",
  messagingSenderId: "540929876615",
  appId: "1:540929876615:web:f5119f4ac3afd4ec9f4e22"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firestore initialized:", db);