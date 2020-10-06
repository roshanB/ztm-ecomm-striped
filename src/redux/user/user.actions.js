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
