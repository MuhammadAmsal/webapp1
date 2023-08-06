const userName = document.getElementById('userName')
const emailAddress = document.getElementById('emailAddress')
const dateofbirth = document.getElementById('dateOfBirth')
// const firstNameHTML = document.getElementById('firstName')
const dashBoardpp = document.getElementById('dashBoardpp')
// const logoutBtn = document.getElementById('logoutBtn')
// const postBtn = document.getElementById('postBtn')
// const postInputBox = document.getElementById('postInputBox')
// const postArea = document.getElementById('postAreaId')




 
console.log(dashBoardpp)
 
 



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {getAuth,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {getFirestore,collection,setDoc,addDoc,getDocs,getDoc,doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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
const db=getFirestore(app)




let logoutbtn = document.getElementById("logout-btn");
const logoutHandler = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        // console.log("signout successfully")
        window.location.href = './login.html'
    }).catch((error) => {
        // An error happened.
    });
    
}

logoutbtn.addEventListener('click', logoutHandler)
let currentLoggedInUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // console.log(uid)
        getUserData(uid)
        currentLoggedInUser = uid
        // ...
    } else {
        // User is signed out
        // ...
        // console.log("sign out")
        window.location.href = '../login/login.html'
    }
});

// async function getUserData(uid) {
    //     try {
//         const docRef = doc(db, "users", uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
    //             // console.log("Document data:", docSnap.data());
    //             const { userName, lastName, firstName, phNum, email } = docSnap.data()
    //             userNameHTML.textContent = userName
    //             emailAddressHTML.textContent = email
    //             mobNumHTML.textContent = phNum
    //             firstNameHTML.textContent = firstName
    //             lastNameHTML.textContent = lastName
    //         } else {
        //             // docSnap.data() will be undefined in this case
        //             console.log("No such document!");
        //         }
        //     } catch (error) {
            //         console.log(error, "==>>error in get User Data")
            //     }
            // }
            
            async function getUserData(uid){
                
                try{
                    const docRef = doc(db, "users", uid);
                    const docSnap = await getDoc(docRef)
 if (docSnap.exists()) {
 //   console.log("Document data:", docSnap.data());
 const { firstName, Dateofbirth,Email,profilePicture} = docSnap.data()
 userName.textContent=firstName;
 emailAddress.textContent=Email;
//  dateofbirth.textContent=Dateofbirth;
 
 dashBoardpp.src = profilePicture || `./image/download.png` 
 console.log(profilePicture )
} else {
//   docSnap.data() will be undefined in this case
console.log("No such document!");
}
 } catch(error){
     console.log(error)
 }
}