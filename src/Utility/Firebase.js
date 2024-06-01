import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLXYCMLIxSIrnbQ2Z71gn3gq_GDRR8gm4",
  authDomain: "clone-28ff3.firebaseapp.com",
  projectId: "clone-28ff3",
  storageBucket: "clone-28ff3.appspot.com",
  messagingSenderId: "11063398901",
  appId: "1:11063398901:web:de95f8634a250aed0210bc",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = app.firestore();
