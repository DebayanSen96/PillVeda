// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsssO7kaZCM4Xwyv6seBWOMIUT6M4aT1Q",
  authDomain: "otp-project-fefc2.firebaseapp.com",
  projectId: "otp-project-fefc2",
  storageBucket: "otp-project-fefc2.appspot.com",
  messagingSenderId: "462144046219",
  appId: "1:462144046219:web:d38ceee21bd6d9d8b6008e",
  measurementId: "G-H60YCR1WMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth =  getAuth(app);