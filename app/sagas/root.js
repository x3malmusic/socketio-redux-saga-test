import { all } from "redux-saga/effects";
import tickerSaga from './ticker'


function* rootSaga() {
  return yield all([...tickerSaga]);
}

export default rootSaga;