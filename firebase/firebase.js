// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh3Kq4Y8eFiVFpYlqru_RSb7Q8H5G1BeU",
  authDomain: "next-app-auth-75cac.firebaseapp.com",
  projectId: "next-app-auth-75cac",
  storageBucket: "next-app-auth-75cac.firebasestorage.app",
  messagingSenderId: "755421810131",
  appId: "1:755421810131:web:b7c74d0fcaf95f5e7f7326",
  measurementId: "G-MC4ZL9H9ZC"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig):getApp();
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
export {auth,firestore,app};