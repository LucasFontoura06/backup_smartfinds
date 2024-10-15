// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration usando variáveis de ambiente
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY_FB,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FB,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FB,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FB,
//   messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID_FB,
//   appId: process.env.NEXT_PUBLIC_APP_ID_FB,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_FB,
// };

const firebaseConfig = {
  apiKey: "AIzaSyD9DtS8ipA835ohcKZu7--7wNYMzxL5TyE",
  authDomain: "clickshopper-1e9f1.firebaseapp.com",
  projectId: "clickshopper-1e9f1",
  storageBucket: "clickshopper-1e9f1.appspot.com",
  messagingSenderId: "457045949718",
  appId: "1:457045949718:web:9ea1d0f6cb0850588da437",
  measurementId: "G-CT63RXFE86"
};

console.log("Configuração Firebase:", firebaseConfig); 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
