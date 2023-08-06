import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {getFirestore,setDoc,doc,addDoc,collection,getDocs} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfW3sWYRc-vz9xH5UQ4CD1Qxu6vXxGbfM",
  authDomain: "login-46be4.firebaseapp.com",
  projectId: "login-46be4",
  storageBucket: "login-46be4.appspot.com",
  messagingSenderId: "872878988890",
  appId: "1:872878988890:web:a73e375240c5b0d55e0263"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let emailAddress = document.getElementById("emailAddress");
let password = document.getElementById("password");
let signupButton = document.getElementById("button");
let dateofbirth = document.getElementById("dateofbirth");
 

signupButton.addEventListener("click", signupHandler);

async function signupHandler(){
  console.log(`hello`);
   try {
     const response = await createUserWithEmailAndPassword( auth, emailAddress.value, password.value);

    console.log(response, "==>>response");
    if (response.user) {
      addUserHandler(response.user.uid);
     }
   } catch (error) {
   alert(error);
  }
      }
      