import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
import { UserActionTypes } from "./user.types";
import { signInStartSuccess, signInStartFailure } from "./user.actions";

//Tried_code_refactoring_using_another_generator_function
function* getSnapshotFromUserAuth(userAuth) {
  const userRef = yield call(createUserProfileDocument, userAuth);
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

// Tried_exporting_module_level_sagas_together
export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
