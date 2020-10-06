import { call, all } from "redux-saga/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";

// Tried_run_all_listening_base_sagas_at_once
export default function* rootSaga() {
  yield all([call(fetchCollectionsStart)]);
}
