import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBbDezESy-JOMdKwzb-FWPy82OhLZpeJK4",
    authDomain: "real-time-chat-71b0a.firebaseapp.com",
    databaseURL: "https://real-time-chat-71b0a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "real-time-chat-71b0a",
    storageBucket: "real-time-chat-71b0a.appspot.com",
    messagingSenderId: "444766394911",
    appId: "1:444766394911:web:70d69f44298130702dd32a",
    measurementId: "G-VSMJBBVFX6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if(window.location.hostname === 'localhost'){
  db.useEmulator('localhost','8080' );
}

export {auth, db} ;
export default firebase;