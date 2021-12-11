import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDD3mMv4YcOndMLbnxdyJ5DLXGnieEGjz4",

  authDomain: "metasocial-img.firebaseapp.com",

  projectId: "metasocial-img",

  storageBucket: "metasocial-img.appspot.com",

  messagingSenderId: "1014716854414",

  appId: "1:1014716854414:web:cb51e5ecd99f70f735d9df",
};

//inititialise firebase
firebase.initializeApp(firebaseConfig);
//initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
export { projectFirestore, projectAuth, projectStorage };
