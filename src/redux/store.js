import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { fetchCollectionsStart } from "../redux/shop/shop.sagas";
// import thunk from "redux-thunk"; //Tried_move_to_saga

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [thunk]; Tried_move_to_saga
const middlewares = [sagaMiddleware];

//Tried_logger_only_when_dev
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//Tried_move_to_saga - following has to be after above applyMiddleware call
// Pass listening individual sagas below, multiple sagas to listen multiple runs, hance root saga
// sagaMiddleware.run(fetchCollectionsStart);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistStore };
