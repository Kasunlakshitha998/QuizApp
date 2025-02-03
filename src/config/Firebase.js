import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mytestingapp-82dff.firebaseapp.com",
  projectId: "mytestingapp-82dff",
  storageBucket: "mytestingapp-82dff.firebasestorage.app",
  messagingSenderId: "347936484641",
  appId: "1:347936484641:web:c42ff3a69a27d01e366260",
  measurementId: "G-6NXZ338R2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;