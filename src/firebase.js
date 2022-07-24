import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyDGCjHx3EfUJoKNwqvjfDf9J3BIDHMMyDA",
     authDomain: "chat-by-react.firebaseapp.com",
     projectId: "chat-by-react",
     storageBucket: "chat-by-react.appspot.com",
     messagingSenderId: "477593142396",
     appId: "1:477593142396:web:dc8079e801b2b4f067b5f9"
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

const firestore = firebaseApp.firestore


export { db , auth ,firebaseApp,firestore};