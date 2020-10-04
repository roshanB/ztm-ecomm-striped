import { shopActionTypes } from "./shop.action-types";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";

export const updateCollection = (collection) => {
  return { type: shopActionTypes.UPDATE_COLLECTION, payload: collection };
};

export const fetchCollectionStart = () => {
  return { type: shopActionTypes.FETCH_COLLECTION_START };
};

export const fetchCollectionSuccess = (collectionMap) => {
  return {
    type: shopActionTypes.FETCH_COLLECTION_START_SUCCESS,
    payload: collectionMap,
  };
};

export const fetchCollectionFailure = (message) => {
  return {
    type: shopActionTypes.FETCH_COLLECTION_START_FAILURE,
    payload: message,
  };
};

export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCollectionStart());
    const collectionRef = firestore.collection("collections");

    collectionRef
      .get()
      .then((collectionSnapshot) => {
        const collectionMap = convertCollectionSnapshotToMap(
          collectionSnapshot
        );
        dispatch(fetchCollectionSuccess(collectionMap));
      })
      .catch((error) => dispatch(fetchCollectionFailure(error.message)));
  };
};
