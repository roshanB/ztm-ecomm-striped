import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAkaiPTWkGrQvATLr6uq1FuufmiU2VFmCk",
  authDomain: "ztm-ecomm.firebaseapp.com",
  databaseURL: "https://ztm-ecomm.firebaseio.com",
  projectId: "ztm-ecomm",
  storageBucket: "ztm-ecomm.appspot.com",
  messagingSenderId: "109023820095",
  appId: "1:109023820095:web:064cf6511ab1a12f2d3b8a",
  measurementId: "G-JDCCPJCZ9M",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
