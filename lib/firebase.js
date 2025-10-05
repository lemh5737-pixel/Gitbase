// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste konfigurasi Anda dari Firebase Console di sini
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaKbXL0oVyxjdJHyxbyD5kt7mHThe0Y3o",
  authDomain: "gitbase-app.firebaseapp.com",
  projectId: "gitbase-app",
  storageBucket: "gitbase-app.firebasestorage.app",
  messagingSenderId: "146802674987",
  appId: "1:146802674987:web:470a714d2871f540f4c96e",
  measurementId: "G-QGLJMJLBW1"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi layanan
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
