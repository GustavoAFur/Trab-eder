// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5PLkGwtcRZW7uqUMu_6_kEml7WI4ygIw",
  authDomain: "teste-45e15.firebaseapp.com",
  projectId: "teste-45e15",
  storageBucket: "teste-45e15.appspot.com",
  messagingSenderId: "949279472509",
  appId: "1:949279472509:web:9c1adbac02c9a546f12a14",
  measurementId: "G-43C51NPB07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);