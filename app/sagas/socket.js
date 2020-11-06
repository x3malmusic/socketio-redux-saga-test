import { put, fork, call, take, cancel } from 'redux-saga/effects'
import { connect, subscribe } from "../services/tickerService";
import {CHANGE_INTERVAL, SOCKET_CONNECT} from "../actions/types";
import { stockSymbol } from "../constants";

function* changeInterval(socket) {
  while (true) {
    const { payload } = yield take(CHANGE_INTERVAL);
    yield socket.emit(CHANGE_INTERVAL, {ticker: stockSymbol, interval: payload});
  }
}

function* updateTicker(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action)
  }
}

function* handleIO(socket) {
  yield fork(updateTicker, socket);
  yield fork(changeInterval, socket);
}

function* flow() {
  while (true) {
    yield take(SOCKET_CONNECT);
    const socket = yield call(connect);
    yield socket.emit('ticker', stockSymbol);
    yield fork(handleIO, socket);
  }
}

export default function* rootSaga() {
  yield fork(flow);
}