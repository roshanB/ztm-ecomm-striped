// import SHOP_DATA from './shop.data'; Tried_SHOP_DATA_from_firestore_now

import { shopActionTypes } from "./shop.action-types";

const INITIAL_STATE = {
  collections: null, // SHOP_DATA Tried_SHOP_DATA_from_firestore_now
  isFetching: false,
  errorMessage: "",
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.UPDATE_COLLECTION:
      return {
        ...state,
        collections: action.payload,
      };
    case shopActionTypes.FETCH_COLLECTION_START:
      return {
        ...state,
        isFetching: true,
      };
    case shopActionTypes.FETCH_COLLECTION_START_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    case shopActionTypes.FETCH_COLLECTION_START_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
