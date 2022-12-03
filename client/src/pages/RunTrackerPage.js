import React, {useRef} from 'react';
import { useState } from 'react';
import {useEffect} from 'react';
import RunItem from "../components/RunItem";


function RunTrackerPage(props) {
	
  
  const [run, setRun] = useState([]);
	const [totalRun, setTotalRun] = useState(0)

	useEffect(() => {
		let temp = 0;
		for(let i = 0; i < run.length; i++) {
			temp += parseInt(run[i].Miles);
		}

		setTotalRun(temp);
	}, [run]);




  const desc = useRef(null);
  const mileage = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);
  const date = useRef(null);


  const AddRun= e => {
    e.preventDefault();

    setRun([...run, {
      "Desc": desc.current.value,
      "Miles": mileage.current.value,
      "startTime": startTime.current.value,
      "endTime": endTime.current.value,
      "Date": date.current.value,


    }]);

    desc.current.value = "";
    mileage.current.value = null;
    date.current.value = null;
  }




  const removeRun = i => {
    let temp = run.filter((v, index) => index != i);
    setRun(temp);
  }


  return (
    <>
      <header>
      <h1>Track Runs</h1>
      <div className="total-Miles">Total Mileage: {totalRun} Miles</div>
      <br></br>
    </header>
      <div className="col text-center">
      <form className="run-form" onSubmit={AddRun}>
      <div className="form-inner">
        <input type="text" name="desc" id="desc" placeholder="Run Description..." ref={desc} /> 
        <input type="number" name="mileage" id="mileage" placeholder="Miles..." ref={mileage}/>
        <input type="time" name="startTime" id="startTime" ref={startTime} />
        <input type="time" name="endTime" id="endTime" ref={endTime} />
        <input type="date" name="date" id="date" ref={date} />
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
            removeRun={removeRun}

          />
        ))
      }
    </div>



      </div>

    </>
  )
}

export default RunTrackerPage;