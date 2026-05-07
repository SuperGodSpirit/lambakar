import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "REDACTED",
  authDomain: "lamba-kar.firebaseapp.com",
  projectId: "lamba-kar",
  storageBucket: "lamba-kar.firebasestorage.app",
  messagingSenderId: "71467806447",
  appId: "1:71467806447:web:5db0535dcbbc9dcc9a351a",
  measurementId: "G-CNRPXY8BVT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
