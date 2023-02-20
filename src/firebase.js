import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU7-KUzzkow45VNRBqu_zr_3dWImEs6s4",
  authDomain: "god-gift-login.firebaseapp.com",
  databaseURL: "https://god-gift-login-default-rtdb.firebaseio.com",
  projectId: "god-gift-login",
  storageBucket: "god-gift-login.appspot.com",
  messagingSenderId: "113288393496",
  appId: "1:113288393496:web:9d3e27ac20bc06e67be46d",
  measurementId: "G-L5VW1BM02G"
};

// Initialize Firebase and Firebase Authentication
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app);
export {auth}
const storage = getStorage(app);
export {storage};
export default firebase;