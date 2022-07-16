// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// export const Database(()=> {
//   var db

//   function initDB(){

//   }
// })

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjR7gYlEjst5ABqnsRKnofGpjldRaA5j0",
  authDomain: "tpadesktop.firebaseapp.com",
  projectId: "tpadesktop",
  storageBucket: "tpadesktop.appspot.com",
  messagingSenderId: "310816199497",
  appId: "1:310816199497:web:af74781ee23b2e461c4098",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
