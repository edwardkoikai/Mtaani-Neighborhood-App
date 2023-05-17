import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAgcL-AZ2dFdW5c8WDkldNB6wnvMG0LpJQ",
  authDomain: "mtaani-neighborhood.firebaseapp.com",
  projectId: "mtaani-neighborhood",
  storageBucket: "mtaani-neighborhood.appspot.com",
  messagingSenderId: "196271937723",
  appId: "1:196271937723:web:33481311277c956be3f19e"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const db = getFirestore()
const auth = getAuth()
export {firebase,db,auth}