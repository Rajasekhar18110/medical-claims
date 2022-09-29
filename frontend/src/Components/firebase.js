import { initializeApp } from "firebase/app"
import "firebase/storage"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBD183Th-IB-41JZ2CPYO1aTkVmBZyN7qc",
    authDomain: "auth-965d0.firebaseapp.com",
    projectId: "auth-965d0",
    storageBucket: "auth-965d0.appspot.com",
    messagingSenderId: "538066279885",
    appId: "1:538066279885:web:4de4dd1413c24210bc7884",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const auth = getAuth(app)
export { auth, storage }
