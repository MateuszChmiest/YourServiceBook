import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb_hNrCsGL4XjfbA__f3d7frHhAcPlVns",
  authDomain: "yourservicebook.firebaseapp.com",
  projectId: "yourservicebook",
  storageBucket: "yourservicebook.appspot.com",
  messagingSenderId: "104302324327",
  appId: "1:104302324327:web:4ee3d36061a53bfe3202c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//Export Firebase
export function signup(email,password) {
    return createUserWithEmailAndPassword(auth,email,password);
}

export function singin(email,password) {
    return signInWithEmailAndPassword(auth,email,password)
}
