import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, compose } from "redux";
import { routerMiddleware } from "connected-react-router";

import rootReducer from "../reducers";
import DevTools from "../containers/DevTools";
import rootSaga from "../sagas/socket";

export const history = createBrowserHistory();
const saga = createSagaMiddleware();
const middleware = routerMiddleware(history);

export const store = createStore(
  rootReducer(history),
  compose(applyMiddleware(middleware, saga), DevTools.instrument())
);

saga.run(rootSaga);
