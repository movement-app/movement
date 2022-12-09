import React from 'react';

function RunItem({id, description, distance, index, removeRun}) {

  const removeHandle = i => {
    removeRun(i);
  }

  return (
    <div className="run-item">
      {description}{ " "} {distance}{" "}Mile Run{" "}
      <button className="btn-close remove-item" onClick={() => removeHandle(id)}></button>
    </div>
  )
}

export default RunItem;