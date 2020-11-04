import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import { connect } from '../services/tickerService'
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import { takeLatest } from "redux-saga/effects";
import { UPDATE_TICKER, CHANGE_INTERVAL } from "../actions/types";
import { updateTicker, changeInterval } from "../sagas/ticker";

export const history = createBrowserHistory();
const saga = createSagaMiddleware();
const middleware = routerMiddleware(history);


export const store = createStore(
        rootReducer(history),
        compose(
            applyMiddleware(middleware, saga),
            DevTools.instrument()
        )
  );

const socket = connect(store.dispatch)

function* rootSaga() {
  yield takeLatest(UPDATE_TICKER, updateTicker, socket);
  yield takeLatest(CHANGE_INTERVAL, changeInterval, socket);
}

saga.run(rootSaga)
