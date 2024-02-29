// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO6Vj8jJYHaDExlt53UG0M8h4FRtHkqas",
  authDomain: "mario-7a70c.firebaseapp.com",
  databaseURL:
    "https://mario-7a70c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mario-7a70c",
  storageBucket: "mario-7a70c.appspot.com",
  messagingSenderId: "202556323341",
  appId: "1:202556323341:web:bdd930dc54a313919b8744",
  measurementId: "G-CBNW5CY1FY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase();

set();
