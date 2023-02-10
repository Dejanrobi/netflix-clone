// importing getAuth
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Importing storage functions
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
};


// console.log(process.env.REACT_APP_TMDB_API_KEY);

console.log(firebaseConfig.apiKey);
console.log("jane");

// Initializing firebase
export const app = initializeApp(firebaseConfig);

 

