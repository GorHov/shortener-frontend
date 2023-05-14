// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB4iX38cg6vUf-yr2CbCdNw6EAJbm0unYQ",
  authDomain: "shortener-c8d34.firebaseapp.com",
  projectId: "shortener-c8d34",
  storageBucket: "shortener-c8d34.appspot.com",
  messagingSenderId: "588097999912",
  appId: "1:588097999912:web:71e1cd38e16ca68cf7511d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)