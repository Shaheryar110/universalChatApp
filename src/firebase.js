import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXHrF281xtOEBLWoUJdc8qiX6BOmiCdLs",
  authDomain: "chatapp-3afd9.firebaseapp.com",
  projectId: "chatapp-3afd9",
  storageBucket: "chatapp-3afd9.appspot.com",
  messagingSenderId: "608816420199",
  appId: "1:608816420199:web:5790714fc10f88d0198bc2",
  measurementId: "G-N5WZPT05E2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
