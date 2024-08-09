// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgTOu3OawldmJzXyoQ2p4M_YIfmei-_wo",
    authDomain: "aiscord.firebaseapp.com",
    projectId: "aiscord",
    storageBucket: "aiscord.appspot.com",
    messagingSenderId: "296303814047",
    appId: "1:296303814047:web:c3b8c266190ce57153c9aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const firestore = getFirestore();