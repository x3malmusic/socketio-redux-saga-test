import React from 'react';

import { capitalize } from "../helpers/capitalize";
import { formatDate } from "../helpers/formatDate";


function Ticker(props) {
  const { ticker, prev } = props

  const calcChange = (val, val2) => {
    return parseFloat(val) > parseFloat(val2)
  }

  const change = calcChange(ticker[1], prev)
  const propName = capitalize(ticker[0])

  if(isNaN(ticker[1])) {
    const date = formatDate(new Date(ticker[1]))

    return (
      <p>{propName}:
        <strong> {date || ticker[1]}</strong>
      </p>
    )
  } else {
    return (
      <p>{propName}:
        <strong className={change ? 'green' : 'red'}> {ticker[1]}</strong>
        {change ? <span className='green arrow'> &uarr;</span> : <span className='red arrow'> &darr;</span> }
      </p>
    )
  }
}

export default Ticker
