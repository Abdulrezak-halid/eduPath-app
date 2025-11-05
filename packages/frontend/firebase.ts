// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJVriR8Yg-khfzzMy0nxkXWmqzoSbJcxg",
  authDomain: "edupath-5e9ff.firebaseapp.com",
  projectId: "edupath-5e9ff",
  storageBucket: "edupath-5e9ff.appspot.com",
  messagingSenderId: "689747871327",
  appId: "1:689747871327:web:3c96e975fbea95da75bdea",
  measurementId: "G-XXN0VL3HHL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
