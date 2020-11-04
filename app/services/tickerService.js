import io from 'socket.io-client';
import { UPDATE_TICKER } from "../actions/types";
import { stockSymbol } from "../constants";

let socket = null;

export const connect = (dispatch) => {
    socket = io('http://localhost:4000');

    socket.on('connect', () => {
        console.log('connected');

        socket.on(stockSymbol, (data) => {
            dispatch({type: UPDATE_TICKER, payload: JSON.parse(data)})
        });

        socket.emit('ticker', stockSymbol);
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    return socket
};
