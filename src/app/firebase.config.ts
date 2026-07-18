// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC-PzQckkgv__U5ZzwTiUQOvJ51I3q1gs",
  authDomain: "the-resistance-4e732.firebaseapp.com",
  projectId: "the-resistance-4e732",
  storageBucket: "the-resistance-4e732.firebasestorage.app",
  messagingSenderId: "412399247996",
  appId: "1:412399247996:web:a3eb2358979dfa48c8dff9",
  measurementId: "G-JTGR02H00Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);