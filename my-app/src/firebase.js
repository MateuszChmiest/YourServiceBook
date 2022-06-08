import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	addDoc,
} from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAb_hNrCsGL4XjfbA__f3d7frHhAcPlVns",
	authDomain: "yourservicebook.firebaseapp.com",
	projectId: "yourservicebook",
	databaseURL:"https://yourservicebook-default-rtdb.europe-west1.firebasedatabase.app",
	storageBucket: "yourservicebook.appspot.com",
	messagingSenderId: "104302324327",
	appId: "1:104302324327:web:4ee3d36061a53bfe3202c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const authGoogle = getAuth(app);

export function signup(email, password) {
	return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
	return signOut(auth);
}

//The function shows the logged user
export function useAuth() {
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
		return unsub;
	});

	return currentUser;
}

const provider = new GoogleAuthProvider();
//* Function to Login with Google
export async function signInWithGoogle() {
	try {
		const newUser = signInWithPopup(auth, provider);
		const user = newUser.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);

		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				email: user.email,
				authProvider: "google",
			});
		}
	} catch (err) {
		console.error(err);
	}
}


