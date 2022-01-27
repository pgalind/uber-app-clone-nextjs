import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm7umI4gJ_gtVwei9pF6vLdoGHuptmXgY",
  authDomain: "uber-next-clone-live-465af.firebaseapp.com",
  projectId: "uber-next-clone-live-465af",
  storageBucket: "uber-next-clone-live-465af.appspot.com",
  messagingSenderId: "139824022257",
  appId: "1:139824022257:web:9ef61315c0f347ff449f50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
const auth = getAuth();

export { app, provider, auth }