import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEtrNC5P-D8GPs-ZQ4TDZQ6vn-YW-98D4",
  authDomain: "cloud-smart-plant-care.firebaseapp.com",
  projectId: "cloud-smart-plant-care",
  storageBucket: "cloud-smart-plant-care.firebasestorage.app",
  messagingSenderId: "97157435650",
  appId: "1:97157435650:web:a5c83f68afa2c408a1b21b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);