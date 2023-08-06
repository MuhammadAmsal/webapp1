import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {getFirestore,collection,setDoc,addDoc,getDocs,getDoc,doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import{ getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js"
 

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
const storage = getStorage(app);

const userEmail = document.getElementById('userEmail')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const Dateofbirth = document.getElementById('Dateofbirth')
const profilePicture = document.getElementById('profilePicture')
const editBtn = document.getElementById('editBtn')
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
async function getUserData(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const {  lastName: lastNameFromDB, firstName: firstNameFromDB, Dateofbirth, Email } = docSnap.data()
            userEmail.value= Email
            firstName.value = lastNameFromDB
            lastName.value = firstNameFromDB
            Dateofbirth.value = Dateofbirth
             
        // console.log()
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error, "==>>error in get User Data")
    }
}
 editBtn.addEventListener('click', editProfileHandler)

async function editProfileHandler() {
    
      console.log(userEmail.value, firstName.value, lastName.value, profilePicture.files[0], "edit button working properly")
 

    const file = profilePicture.files[0]


    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                await setDoc(doc(db, "users", currentLoggedInUser), {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    Email:userEmail.value,
                   Dateofbirth: Dateofbirth.value,
                    profilePicture: downloadURL  
                });
            });
            alert(`Profile Update SuccessFuly`) 
        }
     
         
    );
}