import { UPDATE_TICKER, CHANGE_INTERVAL, SOCKET_CONNECT } from "./types";

export const updateTicker = (ticker) => ({
  type: UPDATE_TICKER,
  payload: ticker
})

export const changeInterval = (interval) => ({
  type: CHANGE_INTERVAL,
  payload: interval
})

export const socketConnect = () => ({
  type: SOCKET_CONNECT
})


