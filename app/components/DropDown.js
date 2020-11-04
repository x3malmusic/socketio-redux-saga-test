import React, { useState } from 'react'

function DropDown(props) {
  const { interval, changeInterval } = props
  const [newInterval, setNewInterval] = useState(() => interval)

  return (
    <div className="dropdown">
      <input type="number" onChange={e => setNewInterval(e.target.value)} value={newInterval}/>
      <button onClick={() => changeInterval(parseInt(newInterval))}>Ok</button>
    </div>
  )
}

export default DropDown