import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
   //...
};

// Minimal runtime check for empty config
if (!firebaseConfig.apiKey) {
  throw new Error(
    "[Web-3-Project-6-My-Dashboard-main] Firebase config is missing. Please fill in your Firebase project credentials in src/firebase.js before running the app."
  );
}

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
