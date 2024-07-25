// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "book-trade-8013e.firebaseapp.com",
  projectId: "book-trade-8013e",
  storageBucket: "book-trade-8013e.appspot.com",
  messagingSenderId: "274405928112",
  appId: "1:274405928112:web:b24a8e361d678e74f8df75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);