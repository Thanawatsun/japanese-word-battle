// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
//import firebase from "firebase/compat/app";
import "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBKZ9qbKo4YRtjMwvK4LcCF54-m_ZMavSc",
  authDomain: "japanese-word-battle.firebaseapp.com",
  databaseURL: "https://japanese-word-battle-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "japanese-word-battle",
  storageBucket: "japanese-word-battle.appspot.com",
  messagingSenderId: "936660245889",
  appId: "1:936660245889:web:968a958904de9332609c80",
  measurementId: "G-DYTEZJ7XTH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
