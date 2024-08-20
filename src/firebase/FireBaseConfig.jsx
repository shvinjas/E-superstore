// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEYE9VKfRwAtaWf5QN-NELrvftH1zB7MA",
  authDomain: "estore-51740.firebaseapp.com",
  projectId: "estore-51740",
  storageBucket: "estore-51740.appspot.com",
  messagingSenderId: "941484353232",
  appId: "1:941484353232:web:64bf049a1f0f21a3e620d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }