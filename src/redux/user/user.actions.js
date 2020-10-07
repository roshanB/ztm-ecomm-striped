import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const googleSignInStart = () => {
  return { type: UserActionTypes.GOOGLE_SIGN_IN_START };
};

export const emailSignInStart = (emailAndPassword) => {
  return {
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword,
  };
};

export const signInStartSuccess = (userAuth) => {
  return {
    type: UserActionTypes.SIGN_IN_START_SUCCESS,
    payload: userAuth,
  };
};

export const signInStartFailure = (errorMessage) => {
  return {
    type: UserActionTypes.SIGN_IN_START_FAILURE,
    payload: errorMessage,
  };
};

export const checkUserSession = () => {
  return { type: UserActionTypes.CHECK_USER_SESSION };
};

export const signOutStart = () => {
  return { type: UserActionTypes.SIGN_OUT_START };
};

export const signOutStartSuccess = () => {
  return { type: UserActionTypes.SIGN_OUT_START_SUCCESS };
};

export const signOutStartFailure = (message) => {
  return { type: UserActionTypes.SIGN_OUT_START_FAILURE, payload: message };
};

export const signUpStart = (userData) => {
  return { type: UserActionTypes.SIGN_UP_START, payload: userData };
};

export const signUpStartSuccess = (userData) => {
  return { type: UserActionTypes.SIGN_UP_START_SUCCESS, payload: userData };
};

export const signUpStartFailure = (message) => {
  return { type: UserActionTypes.SIGN_UP_START_FAILURE, payload: message };
};
