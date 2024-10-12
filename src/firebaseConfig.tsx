// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9DtS8ipA835ohcKZu7--7wNYMzxL5TyE",
  authDomain: "clickshopper-1e9f1.firebaseapp.com",
  projectId: "clickshopper-1e9f1",
  storageBucket: "clickshopper-1e9f1.appspot.com",
  messagingSenderId: "457045949718",
  appId: "1:457045949718:web:9ea1d0f6cb0850588da437",
  measurementId: "G-CT63RXFE86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);