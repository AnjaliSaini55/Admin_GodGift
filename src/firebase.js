import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
//   your firebase configration
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
