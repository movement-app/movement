import React from 'react';

function RunItem({run, index, removeRun}) {


  const removeHandle = i => {
    removeRun(i);
  }

  return (
    <div className="run-item">
      {run.Desc}{ " "} {run.Miles}{" "}Mile Run{" "}
      <button className="remove-item" onClick={() => removeHandle(index)}>X</button>

    </div>
  )
}

export default RunItem;