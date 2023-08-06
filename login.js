const loginEmail = document.querySelector('.emailAddress')
const loginPassword = document.querySelector('.password')

const loginBtn = document.querySelector('#loginButton')





import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth,signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
 
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

loginBtn.addEventListener('click', loginHandler)

function loginHandler() {
   
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then(  (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(user) {
                window.location.href = './dashboard.html'
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`User is not exist Please first create an Account`)
            window.location.href = './index.html'
        });
}
