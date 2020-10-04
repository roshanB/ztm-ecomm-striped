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

//Tried_add_collections_programatically_in_firestore_db
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const collectionDoc = collectionRef.doc();
    // collectionDoc.set(obj); //Tried_normal_set
    batch.set(collectionDoc, obj); //Tried_batch_set
  });
  return await batch.commit(); //Tried_commit_returns_promise that reolves to null when succeeded
};

//Tried_transform_collectionSnapshot_to_array
export const convertCollectionSnapshotToMap = (collection) => {
  const transformedCollection = collection.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  //Tried_array_to_map_using_reduce
  return transformedCollection.reduce((accumulatedObj, currentObj) => {
    accumulatedObj[currentObj.title.toLowerCase()] = currentObj;
    return accumulatedObj;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
