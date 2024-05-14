
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: "taskmng-449e5.firebaseapp.com",
    projectId: "taskmng-449e5",
    storageBucket: "taskmng-449e5.appspot.com",
    messagingSenderId: "932814965289",
    appId: "1:932814965289:web:25ac5a4740a30edf136a38",
    measurementId: "G-Q3VLRKV388"
  };

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
