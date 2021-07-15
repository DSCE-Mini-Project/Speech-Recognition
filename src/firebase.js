// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyA_-pgGuPTYypNGox45JMcC0u86u87Tu8I",
  authDomain: "voice-controlled-media-player.firebaseapp.com",
  projectId: "voice-controlled-media-player",
  storageBucket: "voice-controlled-media-player.appspot.com",
  messagingSenderId: "131066007665",
  appId: "1:131066007665:web:40bb986a1f0fa937544bd0",
  measurementId: "G-M9SQ6CPKQZ"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth,storage };