import { takeLatest, put } from "redux-saga/effects";
import { stockSymbol } from "../constants";


export const updateTicker = function* (socket, action) {
  // yield console.log(action)
}

export const changeInterval = function* (socket, { payload }) {
  yield socket.emit('CHANGE_INTERVAL', {ticker: stockSymbol, interval: payload })
}