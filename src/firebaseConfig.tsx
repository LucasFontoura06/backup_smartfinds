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
  apiKey: "AIzaSyDgePu-h0GZ6zJtpzQbplRvcbq2VNeDnIA",
  authDomain: "smartfinds-c69c1.firebaseapp.com",
  projectId: "smartfinds-c69c1",
  storageBucket: "smartfinds-c69c1.appspot.com",
  messagingSenderId: "17051715497",
  appId: "1:17051715497:web:e6d317e69a76b848a0e6b8",
  measurementId: "G-9MR218R5J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
