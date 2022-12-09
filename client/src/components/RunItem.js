import React from 'react';
import { useState } from 'react';
import ErrorAlert from "../components/ErrorAlert";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function RunItem({id, description, distance, index, removeRun}) {

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // const removeRun = async (event) => {
  //   try {
  //     const response = await fetch (`/api/logs/${id}`, { method: "delete" });

  //     if (response.ok) {
  //       setSuccess(true);
  //     } else {
  //       setError(true);
  //     }
  //   } catch (error) {
  //     console.error("Server error while deleting the activity log", error);
  //     setError(true);
  //   }
  // }

  const removeHandle = i => {
    removeRun(i);
  }

  if (success) return <Navigate to="/" />;

  return (
    <div className="run-item">
      {error && <ErrorAlert details={"Failed to delete the content"} />}
      {description}{ " "} {distance}{" "}Mile Run{" "}
      <button className="remove-item" onClick={() => removeHandle(id)}>X</button>
    </div>
  )
}

export default RunItem;