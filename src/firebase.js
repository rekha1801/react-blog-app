// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO5fiNkABTjY8aUUFXow2n12DEx8fhjSk",
  authDomain: "react-blog-app-e7eb2.firebaseapp.com",
  projectId: "react-blog-app-e7eb2",
  storageBucket: "react-blog-app-e7eb2.appspot.com",
  messagingSenderId: "190401148762",
  appId: "1:190401148762:web:0cce7dddd456f0443f2563",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
