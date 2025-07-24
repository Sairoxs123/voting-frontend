// Import the functions you need from the SDKs you need
import { type FirebaseApp, initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAn_Bpd1C93xSL3zuhR50wCFw-x8CNc_U",
    authDomain: "voting-jssps.firebaseapp.com",
    projectId: "voting-jssps",
    storageBucket: "voting-jssps.firebasestorage.app",
    messagingSenderId: "308705106435",
    appId: "1:308705106435:web:cc53e253cc4bc906a80c36",
    measurementId: "G-38HRMQ2Z9V"
};

// Initialize Firebase
const app : FirebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app)

export { auth };