import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `$(process.env.REACT_APP_firebaseApiKey)`,
  authDomain: `$(process.env.REACT_APP_authDomain)`,
  projectId: "todo-app-4daf5",
  storageBucket: "todo-app-4daf5.appspot.com",
  messagingSenderId: "928730176712",
  appId: "1:928730176712:web:565a41d417632b211c19fd"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// const db = getFirestore(app);
const db = firebase.firestore();
export default db;