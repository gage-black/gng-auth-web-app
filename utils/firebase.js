// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-VPQ26aw8h8XLAjNrRiOE9cJnS5q4kOA",
  authDomain: "gng-auth-app.firebaseapp.com",
  projectId: "gng-auth-app",
  storageBucket: "gng-auth-app.appspot.com",
  messagingSenderId: "689499341526",
  appId: "1:689499341526:web:81c5c1b757f2e196343f77",
  measurementId: "G-LCDF1TPN5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app

