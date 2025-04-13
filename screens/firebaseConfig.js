import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzLNAGHLeSn2shyeEmJQW-UInsi_NVfo4",
  authDomain: "women-safety-db3ea.firebaseapp.com",
  projectId: "women-safety-db3ea",
  storageBucket: "women-safety-db3ea.firebaseapp.com", // ✅ corrected
  messagingSenderId: "101726323451",
  appId: "1:101726323451:web:efb773ed6243c1d10ae65e",
  measurementId: "G-YFXN14EVNY"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app as firebaseApp, auth, db }; 
