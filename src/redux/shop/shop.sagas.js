import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import { shopActionTypes } from "./shop.action-types";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";
import { fetchCollectionFailure, fetchCollectionSuccess } from "./shop.actions";

function* fetchCollectionsStartAsyc() {
  //Tried_try_catch_to_call_success_failure_action
  try {
    const collectionRef = firestore.collection("collections");
    //Tried_in_follwoing_yield_is_similar_to_async_await -
    // following results into a resolved promise with snapshot
    const collectionSnapshot = yield collectionRef.get();
    //Tried_use_of_call - subsequent params are params to the passed method
    const collectionMap = yield call(
      convertCollectionSnapshotToMap,
      collectionSnapshot
    );
    //Tried_use_put_effect_to_dispatch_action_from_saga
    yield put(fetchCollectionSuccess(collectionMap)); // Tried_yield_is_required_for_put
  } catch (error) {
    // Tried_use_put_effect_to_dispatch_action_from_saga
    yield put(fetchCollectionFailure(error.message)); // Tried_yield_is_required_for_put
  }

  /* Tried_thunk_to_saga (see following thunk code to understand the difference)
  //Tried_thunk_to_saga - following is listened by saga shopActionTypes.FETCH_COLLECTION_START
  // dispatch(fetchCollectionStart());
    collectionRef
      .get()
      .then((collectionSnapshot) => {
        const collectionMap = convertCollectionSnapshotToMap(
          collectionSnapshot
        );
        dispatch(fetchCollectionSuccess(collectionMap));
      })
      .catch((error) => dispatch(fetchCollectionFailure(error.message)));*/
}

//Tried_following_is_passed_in_saga.run()
//Follwoing base saga is listening to FETCH_COLLECTION_START via takeEvery effect
export function* fetchCollectionsStart() {
  /* Tried_making_follwoing_takeEvery_to_takeLatest
  //Tried_following_is_kind_of_a_listener actually an effect
  yield takeEvery(
    shopActionTypes.FETCH_COLLECTION_START, //This_is_dispatched_from_react (no payload as of now)
    fetchCollectionsStartAsyc //This_is_kind_of_handler_after_above_action_is_dispatched
  );*/
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTION_START, //This_is_dispatched_from_react (no payload as of now)
    fetchCollectionsStartAsyc //This_is_kind_of_handler_after_above_action_is_dispatched
  );
}
