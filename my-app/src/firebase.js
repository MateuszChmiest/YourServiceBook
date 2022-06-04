import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAb_hNrCsGL4XjfbA__f3d7frHhAcPlVns",
    authDomain: "yourservicebook.firebaseapp.com",
    projectId: "yourservicebook",
    storageBucket: "yourservicebook.appspot.com",
    messagingSenderId: "104302324327",
    appId: "1:104302324327:web:4ee3d36061a53bfe3202c2"
  };

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);

  export default firebase;