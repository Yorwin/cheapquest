// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRhhuCpEkjU1AkB4th3D6Eiyf5semr1LU",
    authDomain: "games-translations-db.firebaseapp.com",
    projectId: "games-translations-db",
    storageBucket: "games-translations-db.firebasestorage.app",
    messagingSenderId: "489129491235",
    appId: "1:489129491235:web:9de2d5d42f5eb94ecfea96",
    measurementId: "G-RV3H1HWW9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export const db = getFirestore(app);
