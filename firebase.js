import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC6uY1117f_JYOcP70EJkdahySfSVAELMc",
    authDomain: "avi-project-87b61.firebaseapp.com",
    databaseURL: "https://avi-project-87b61-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "avi-project-87b61",
    storageBucket: "avi-project-87b61.appspot.com",
    messagingSenderId: "747632868705",
    appId: "1:747632868705:web:650b8f978a52d3e31c1920",
    measurementId: "G-GLEH36VH0P"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = getDatabase();

export { auth, database };