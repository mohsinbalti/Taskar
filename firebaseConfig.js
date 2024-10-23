// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHs0mL8wHqTZ83mmneMN9TWEygoBbLvNU",
  authDomain: "eztasker-4b098.firebaseapp.com",
  projectId: "eztasker-4b098",
  storageBucket: "eztasker-4b098.appspot.com",
  messagingSenderId: "971621965832",
  appId: "1:971621965832:web:e7962e1f9b3c4f3ed371bd",
  measurementId: "G-R181R301X5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
