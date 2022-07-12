// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGa4g2F9vbTtBvX4xI1VY0pnI0cP4CotQ",
  authDomain: "managementsystem-85522.firebaseapp.com",
  projectId: "managementsystem-85522",
  storageBucket: "managementsystem-85522.appspot.com",
  messagingSenderId: "500370962226",
  appId: "1:500370962226:web:fcf22c2a26cd625391092b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { auth, db, app, storage};
