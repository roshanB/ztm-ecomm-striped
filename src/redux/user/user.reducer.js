import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    // Tried_sign_in_using_saga
    case UserActionTypes.SIGN_IN_START_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    // Tried_sign_in_using_saga
    case UserActionTypes.SIGN_IN_START_FAILURE:
    case UserActionTypes.SIGN_OUT_START_FAILURE:
    case UserActionTypes.SIGN_UP_START_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    //Tried_sign_out_with_sagas
    case UserActionTypes.SIGN_OUT_START_SUCCESS:
      return {
        ...state,
        currentUser: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default userReducer;
