import React, {useRef} from 'react';
import { useState } from 'react';

function RunTrackerPage(props) {


	const [run, setRun] = useState([]);
	const [totalRun, setTotalRun] = useState(0)

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



  return (
    <>
      <header>
      <h1>Track Runs</h1>
      <div className="total-Miles">{"200"}</div>
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

    <ul>
        {run.map((data) => {
          return <ul>
            <li key={data.Desc}>{data.Desc}</li>
            <li key={data.Miles}>{data.Miles}</li>
            <li key={data.startTime}>{data.startTime}</li>

            
            
            
            
            
            </ul>;
        })}
</ul>
      </div>

    </>
  );
}

export default RunTrackerPage;