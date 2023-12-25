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
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
  
// const firebaseConfig = {
//   apiKey: "AIzaSyBjR7gYlEjst5ABqnsRKnofGpjldRaA5j0",
//   authDomain: "tpadesktop.firebaseapp.com",
//   projectId: "tpadesktop",
//   storageBucket: "tpadesktop.appspot.com",
//   messagingSenderId: "310816199497",
//   appId: "1:310816199497:web:af74781ee23b2e461c4098",
// };
const init = initializeApp(firebaseConfig);

export const db = (function () {
    var database;
    var auth;
    function create() {
        // Initialize Firebase
        database = getFirestore(init);
    }
    function createAuth() {
        auth = getAuth(init);
    }
    return {
        getDB: function () {
            if (!database) create();

            return database;
        },
        getAuth: function () {
            if (!auth) createAuth();

            return auth;
        },
    };
})();

export const auth = (function () {
    var auth;
    function createAuth() {
        auth = getAuth(init);
    }
    return {
        getAuth: function () {
            if (!auth) createAuth();

            return auth;
        },
    };
})();
