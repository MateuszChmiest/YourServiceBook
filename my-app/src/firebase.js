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
	addDoc,
	query,
	where,
	getDocs,
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

// const firebaseConfig = {
// 	apiKey: "AIzaSyCOcwdBeG-QVOh-c9Vk8tKGHwMJba7NheQ",
// 	authDomain: "yourservicebook-8e4a1.firebaseapp.com",
// 	projectId: "yourservicebook-8e4a1",
// 	storageBucket: "yourservicebook-8e4a1.appspot.com",
// 	messagingSenderId: "694618485623",
// 	appId: "1:694618485623:web:c4027e88f41f6d4067a772"
//   };

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

//* The function shows the logged user
export function useAuth() {
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
		return unsub;
	});

	return currentUser;
}



//* Function to Login with Google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const newUser = await signInWithPopup(auth, provider);
        const user = newUser.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// export const signInWithGoogle = () => {
// 	signInWithPopup(auth, provider)
//   .then((result) => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     const user = result.user;
// 	console.log(user);
// 	const q = query(collection(db, "users"), where("uid", "==", user.uid));
// 	const docs = getDocs(q)

// 	if (docs.docs.length === 0) {
// 		addDoc(collection(db, "users"), {
// 			uid: user.uid,
// 			email: user.email,
// 			authProvider: "google",
// 		});
// 	}
//   })
//   .catch((error) => {
//     console.log(error.code);
//     console.log(error.message);
//     console.log(error.customData.email);
//     console.log(GoogleAuthProvider.credentialFromError(error));
//   });

// }



