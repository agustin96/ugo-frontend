const firebase = require("firebase/app")
require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")

//import firebase from 'firebase/app'
//import 'firebase/firestore'

if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId
    };
    
    firebase.initializeApp(firebaseConfig)
}


const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {firebase, db, auth, storage}