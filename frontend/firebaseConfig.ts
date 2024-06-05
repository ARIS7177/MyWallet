import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import auth from "@react-native-firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
  getAuth,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAolxF8zqSV4j00f_mui5cHPkB8uoeMbJY",
  authDomain: "my-wallet-c974a.firebaseapp.com",
  projectId: "my-wallet-c974a",
  storageBucket: "my-wallet-c974a.appspot.com",
  messagingSenderId: "709422119160",
  appId: "1:709422119160:web:de51babc1dfaab8f37e30d",
  measurementId: "G-R0BLMEGYPX",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_BD = getFirestore(FIREBASE_APP);
const auth = getAuth(FIREBASE_APP);

export {
  FIREBASE_BD,
  auth,
  FIREBASE_APP,
  signInWithCredential,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  FirebaseRecaptchaVerifierModal,
};
