import React, { useState, useEffect } from 'react';
import RunItem from "../components/RunItem";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";

function RunTrackerPage(props) {

  const [run, setRun] = useState([]);
  const [totalRun, setTotalRun] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ description: "", distance: "", startTime: "", endTime: "", date: "" });

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < run.length; i++) {
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
        getData();
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new activity log", error);
      setError(true);
    }

    setData({ description: "", distance: "", startTime: "", endTime: "", date: ""})
  }

  useEffect(() => {
    getData();
    return () => {
      // clean up function
    };
  }, []);

  const getData = async (event) => {
    setError(false);
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

  const removeRun = async (id) => {
    try {
      const response = await fetch(`/api/logs/${id}`, { method: "delete" });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while deleting the activity log", error);
      setError(true);
    }
    getData();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <header>
        <h1>Track Runs</h1>
        <div className="total-Miles">Total Distance: {totalRun} Miles</div>
        <br></br>
      </header>
      {error && <ErrorAlert details={"Failed to save the content"} />}
      <div className="col text-center">
        <form className="run-form" onSubmit={handleSubmit}>
          <div className="form-inner row">
            <div className="col-2">
              <input type="text" className="col-3 form-control" name="desc" id="desc" placeholder="Run Description..." value={data.description} onChange={fieldChanged("description")} />
            </div>
            <div className="col-2">
              <input type="number" className="form-control" name="mileage" id="mileage" placeholder="Miles..." value={data.distance} onChange={fieldChanged("distance")} />
            </div>
            <div className="col-2">
              <input type="time" className="form-control" name="startTime" id="startTime" value={data.startTime} onChange={fieldChanged("startTime")} />
            </div>
            <div className="col-2">
              <input type="time" className="form-control" name="endTime" id="endTime" value={data.endTime} onChange={fieldChanged("endTime")} />
            </div>
            <div className="col-2">
              <input type="date" className="form-control" name="date" id="date" value={data.date} onChange={fieldChanged("date")} />
            </div>
            <div className="col-2">
              <input type="submit" className="btn btn-primary btn-block" value="Add Run" />
            </div>
          </div>
        </form>
        <br></br>
      </div>
      <br></br>

      <div className="run-list">
        {run.map((entryData, index) => (
          <RunItem {...entryData} removeRun={removeRun} key={entryData.id} />
        ))}
      </div>
    </>
  )
}

export default RunTrackerPage;