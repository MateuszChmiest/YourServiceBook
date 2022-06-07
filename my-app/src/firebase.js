import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { useEffect, useState } from "react";


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
export const auth = getAuth();

export function signup(email,password) {
    return createUserWithEmailAndPassword(auth,email,password);
}

export function login(email,password) {
    return signInWithEmailAndPassword(auth,email,password)
}

export function logout() {
  return signOut(auth)
}

//The function shows the logged user
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub;
  })

  return currentUser
}

