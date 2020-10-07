import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import { UserActionTypes } from "./user.types";
import {
  signInStartSuccess,
  signInStartFailure,
  signOutStartSuccess,
  signOutStartFailure,
  signUpStartFailure,
  emailSignInStart,
  signUpStartSuccess,
} from "./user.actions";

import { clearCart } from "../cart/cart.actions";

//Tried_code_refactoring_using_another_generator_function
function* getSnapshotFromUserAuth(userAuth, additionalData) {
  const userRef = yield call(
    createUserProfileDocument,
    userAuth,
    additionalData
  );
  const userSnapshot = yield userRef.get();

  yield put(
    signInStartSuccess({
      id: userSnapshot.id,
      ...userSnapshot.data(),
    })
  );
}

// Tried_sign_in_using_saga
function* googleSignInStartAsync() {
  try {
    //Tried_google_window_is_shown_how_user_is_returned_from_following_when_following_line_itself_opens_that_window
    const { user: userAuth } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInStartFailure(error.message));
  }
}

//Tried_destructuring_one_step_further
function* emailSignInStartAsync({ payload: { email, password } }) {
  try {
    const { user: userAuth } = yield auth.signInWithEmailAndPassword(
      email,
      password
    );
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInStartFailure(error.message));
  }
}

//Tried_check_user_session_on_firebase_auth
function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInStartFailure(error.message));
  }
}

// Tried_sign_out_with_sagas
function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutStartSuccess());
  } catch (error) {
    yield put(signOutStartFailure(error.message));
  }
}

// Tried_clear_cart_one_way_from_user.sagas
function* clearCartOnSignout() {
  yield put(clearCart());
}

// Tried_sign_up_using_saga_my_sol
function* signUpStartAsyc({ payload: { email, password, displayName } }) {
  try {
    // Tried_drawback_in_my_sol
    const { user: userAuth } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );
    yield put(signUpStartSuccess({ userAuth, displayName }));
    // yield getSnapshotFromUserAuth(userAuth, { displayName }); Tried_drawback_in_my_sol
    // yield put(emailSignInStart({ email, password })); //Tried_this_is_done_in_above_method
  } catch (error) {
    yield put(signUpStartFailure(error.message));
  }
}

function* signInAfterSignUp({ payload: { userAuth, displayName } }) {
  yield getSnapshotFromUserAuth(userAuth, { displayName });
}

// Tried_sign_in_using_saga
export function* onGoogleSignInStart() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    googleSignInStartAsync
  );
}

// Tried_sign_in_using_saga
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInStartAsync);
}

// Tried_check_user_session_on_firebase_auth
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// Tried_sign_out_with_sagas
export function* onSignoutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

// Tried_clear_cart_one_way_from_user.sagas
export function* onSignoutStartSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START_SUCCESS, clearCartOnSignout);
}

// Tried_sign_up_using_saga_my_sol
export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpStartAsyc);
}

// Tried_sign_up_using_saga_author_sol
export function* onSignUpStartSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_START_SUCCESS, signInAfterSignUp);
}

// Tried_exporting_module_level_sagas_together
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignoutStart),
    call(onSignoutStartSuccess),
    call(onSignUpStart),
    call(onSignUpStartSuccess),
  ]);
}
