import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyA4fm6Klx-lM-KGxEZMLCRw0CoXoSO6E5g",
    authDomain: "pinterest-5f4bf.firebaseapp.com",
    projectId: "pinterest-5f4bf",
    storageBucket: "pinterest-5f4bf.appspot.com",
    messagingSenderId: "645334995493",
    appId: "1:645334995493:web:1d37a895c590ccf1c6e5cc"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  export const db = firebaseApp.firestore()
  export const storage = getStorage(firebaseApp)
