// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyc9RWCIwR5tA3U8tOMXXR4kWS4uzOcLU",
  authDomain: "prettypink-store.firebaseapp.com",
  projectId: "prettypink-store",
  storageBucket: "prettypink-store.firebasestorage.app",
  messagingSenderId: "1087587873684",
  appId: "1:1087587873684:web:2b0746cbef493cf4859581"
};

// Initialize Firebase
export const AppFirebase = initializeApp(firebaseConfig);