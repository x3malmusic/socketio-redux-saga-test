import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const initialState = {
  prevTicker: {},
  ticker: {},
  interval: 5000
}

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  stockTicker: (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_TICKER':
        return  {
          ...state,
          prevTicker: state.ticker,
          ticker: action.payload
        }
      case 'CHANGE_INTERVAL':
        return  {
          ...state,
          interval: action.payload
        }
        default:
          return state;
    }
  }
});

export default createRootReducer;
