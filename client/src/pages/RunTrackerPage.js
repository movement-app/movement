import React, {useRef} from 'react';
import { useState } from 'react';
import {useEffect} from 'react';
import RunItem from "../components/RunItem";
import { useAuth } from "../context/AuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { Navigate } from "react-router-dom";


function RunTrackerPage(props) {
	
  const auth = useAuth();
  const [run, setRun] = useState([]);
	const [totalRun, setTotalRun] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({ description: "", distance: "", startTime: "", endTime: "", date: ""});

	useEffect(() => {
		let temp = 0;
		for(let i = 0; i < run.length; i++) {
			temp += parseInt(run[i].Miles);
		}

		setTotalRun(temp);
	}, [run]);

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const desc = useRef(null);
  const mileage = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);
  const date = useRef(null);


  // const AddRun= e => {
  //   // e.preventDefault();

  //   setRun([...run, {
  //     "Desc": desc.current.value,
  //     "Miles": mileage.current.value,
  //     "startTime": startTime.current.value,
  //     "endTime": endTime.current.value,
  //     "Date": date.current.value,
  //   }]);

  //   desc.current.value = "";
  //   mileage.current.value = null;
  //   date.current.value = null;
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      let response = await fetch("/api/logs", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: data.description,
          distance: data.distance,
          startTime: data.startTime,
          endTime: data.endTime,
          date: data.date,
          userId: auth.user.id.toString(),
        })
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new micro post", error);
      setError(true);
    }
  }


  // const removeRun = i => {
  //   let temp = run.filter((v, index) => index != i);
  //   setRun(temp);
  // }

  if (success) return <Navigate to="/" />;

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
        <input type="text" name="desc" id="desc" placeholder="Run Description..." ref={desc} value={data.description} onChange={fieldChanged("description")}/> 
        <input type="number" name="mileage" id="mileage" placeholder="Miles..." ref={mileage} value={data.distance} onChange={fieldChanged("distance")}/>
        <input type="time" name="startTime" id="startTime" ref={startTime} value={data.startTime} onChange={fieldChanged("startTime")}/>
        <input type="time" name="endTime" id="endTime" ref={endTime} value={data.endTime} onChange={fieldChanged("endTime")}/>
        <input type="date" name="date" id="date" ref={date} value={data.date} onChange={fieldChanged("date")}/>
        <input type="submit" value="Add Run" />
      </div>
    </form>
    <br></br>


      
    <div className="run-list">
      {
        run.map((value, index) => (
          <RunItem 
            key={index} 
            run={value} 
            index={index} 
            // removeRun={removeRun}

          />
        ))
      }
    </div>



      </div>

    </>
  )
}

export default RunTrackerPage;