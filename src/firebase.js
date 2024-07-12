// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);