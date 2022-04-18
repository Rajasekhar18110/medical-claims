import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
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
export const auth = getAuth(app)

// const provider = new GoogleAuthProvider()

// export const signInWithGoogle = () => {
//     let navigate = useNavigate()

//     signInWithPopup(auth, provider)
//         .then((result) => {
//             //console.log(result);
//             const name = result.user.displayName
//             const email = result.user.email
//             const profilePic = result.user.photoURL
//             console.log("Name " + name)
//             console.log("email " + email)
//             console.log("profilePicURL " + profilePic)

//             localStorage.setItem("name", name)
//             localStorage.setItem("email", email)
//             localStorage.setItem("profilePic", profilePic)
//             navigate("Home")
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }
