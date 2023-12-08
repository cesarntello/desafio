import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcjIfdBclilY-gzlsk3t7qy4MjTyodIn0",
  authDomain: "desafio-8fd06.firebaseapp.com",
  projectId: "desafio-8fd06",
  storageBucket: "desafio-8fd06.appspot.com",
  messagingSenderId: "1002894601753",
  appId: "1:1002894601753:web:854f1cd41ebabf50758488",
  measurementId: "G-9KSPW7C5HK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
