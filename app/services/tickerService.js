import io from 'socket.io-client';
import { eventChannel } from 'redux-saga'
import { UPDATE_TICKER } from "../actions/types";
import { stockSymbol } from "../constants";

export const connect = () => {
  const socket = Promise.resolve(io('http://localhost:4000')).catch(e => console.log(e));
  return socket
};

export const subscribe = (socket) => {
  return eventChannel(emit => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on(stockSymbol, (data) => {
      emit({type: UPDATE_TICKER, payload: JSON.parse(data)})
    });

    socket.on('disconnect', () => {
      emit({type: 'DISCONNECT'})
      console.log('disconnected');
    });

    return () => {}
  })
}
