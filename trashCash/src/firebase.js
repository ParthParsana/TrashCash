import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCb3NwEa7XJu5WCDC916ajJ9B0Z0_NMi5U",
    authDomain: "trashcashproject.firebaseapp.com",
    projectId: "trashcashproject",
    storageBucket: "trashcashproject.firebasestorage.app",
    messagingSenderId: "252857898009",
    appId: "1:252857898009:web:dc5f981da9f2c8719f8688",
    measurementId: "G-YVM9NGT84T"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase;


  