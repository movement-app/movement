import React from 'react';
import { useState } from 'react';
import {useEffect} from 'react';
import RunItem from "../components/RunItem";
import ErrorAlert from "../components/ErrorAlert";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function RunTrackerPage(props) {
	
  const [run, setRun] = useState([]);
	const [totalRun, setTotalRun] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ description: "", distance: "", startTime: "", endTime: "", date: ""});

	useEffect(() => {
		let temp = 0;
		for(let i = 0; i < run.length; i++) {
			temp += parseInt(run[i].distance);
		}

		setTotalRun(temp);
	}, [run]);

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: data.description,
          distance: data.distance,
          start_time: data.startTime,
          end_time: data.endTime,
          date: data.date,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new activity log", error);
      setError(true);
    }
  }

  useEffect((e) => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/logs");
        let allRuns = await response.json();
        setRun(allRuns);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all activity logs", error);
        setError(true);
      }
    }

    getData();

    return () => {
      // clean up function
    };
  }, []);

  const removeRun = async (id) => {
    try {
      const response = await fetch (`/api/logs/${id}`, { method: "delete" });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while deleting the activity log", error);
      setError(true);
    }
  }

  if (success) return <Navigate to="/" />;
  if (loading) return <LoadingSpinner />;

  return (
    <>
      <header>
      <h1>Track Runs</h1>
      <div className="total-Miles">Total Mileage: {totalRun} Miles</div>
      <br></br>
    </header>
      {error && <ErrorAlert details={"Failed to save the content"} />}
      <div className="col text-center">
      <form className="run-form" onSubmit={handleSubmit}>
      <div className="form-inner">
        <input type="text" name="desc" id="desc" placeholder="Run Description..." value={data.description} onChange={fieldChanged("description")}/> 
        <input type="number" name="mileage" id="mileage" placeholder="Miles..." value={data.distance} onChange={fieldChanged("distance")}/>
        <input type="time" name="startTime" id="startTime" value={data.startTime} onChange={fieldChanged("startTime")}/>
        <input type="time" name="endTime" id="endTime" value={data.endTime} onChange={fieldChanged("endTime")}/>
        <input type="date" name="date" id="date" value={data.date} onChange={fieldChanged("date")}/>
        <input type="submit" value="Add Run" />
      </div>
    </form>
    <br></br>

    <div className="run-list">
      {run.map((entryData, index) => (
          <RunItem {...entryData} removeRun={removeRun} key={entryData.id} />
        ))}
    </div>

    </div>

    </>
  )
}

export default RunTrackerPage;