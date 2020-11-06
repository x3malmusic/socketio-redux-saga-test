import '../styles/application.scss';
import React, { useEffect } from 'react';
import Ticker from './Ticker';
import DropDown from "../containers/DropDown";

// The below line is here as an example of getting prices

function App(props) {

  const { ticker, changeInterval, prevTicker, socketConnect } = props

  const changeUpdateInterval = (value) => {
    changeInterval(value)
  }

  useEffect(() => {
    socketConnect()
  }, [])


    return (
      <div className="app">
        <h1>Stock Blotter</h1>
        <div className="stock-ticker">
          {Object.entries(ticker).map(prop =>
            <Ticker ticker={prop} key={prop} prev={prevTicker && prevTicker[prop[0]]}/>
          )}
        </div>
        <DropDown changeInterval={changeUpdateInterval}/>
      </div>
    );
}

export default App;
