import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz2pEW8h7msBt-_LwMX1ANhU3pduLaYlg",
  authDomain: "genshin-calculator-4da5e.firebaseapp.com",
  projectId: "genshin-calculator-4da5e",
  storageBucket: "genshin-calculator-4da5e.appspot.com",
  messagingSenderId: "398255414420",
  appId: "1:398255414420:web:bd31687fcea57fb646a881"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);
const storage = getStorage(firebase);

export { firebase, auth, firestore, storage };
