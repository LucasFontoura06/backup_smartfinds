// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_FB,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FB,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FB,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FB,
    messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID_FB,
    appId: process.env.NEXT_PUBLIC_APP_ID_FB,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_FB,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);