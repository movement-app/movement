import React, { useState } from 'react';

function CreateChallenge(props){

    const [data, setData] = useState({ title: "", distance: "", deadline: "", donation: "", charity: "1" });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const fieldChanged = (name) => {
        return (event) => {
          let { value } = event.target;
          setData((prevData) => ({ ...prevData, [name]: value }));
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch("/api/challenges/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: data.title,
                distance: data.distance,
                deadline: data.deadline,
                donation: data.donation,
                charity: data.charity,
              }),
            });
      
            if (response.ok) {
              setSuccess(true);
              props.getData();
            } else {
              setError(true);
            }
          } catch (error) {
            console.error("Server error while creating a new activity log", error);
            setError(true);
          }
    }

    return (
    <div className="modal fade" id="createNew" tabIndex="-1" aria-labelledby="createNewModal" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="createNew">Create New Challenge</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row mb-3">
                            <label htmlFor="title" className="col-sm-3 col-form-label text-start">Title</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="title" placeholder="Turkey Trot" onChange={fieldChanged("title")}></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="distance" className="col-sm-3 col-form-label text-start">Distance</label>
                            <div className="col-sm-9">
                                {/* Note: if you prefer user-input, use the commented line below */}
                                <input type="number" className="form-control" id="distance" placeholder="12k" onChange={fieldChanged("distance")}></input>
                                {/* <select className="form-select" id="distance">
                                    <option value="1">1 mile</option>
                                    <option value="5">5 miles</option>
                                    <option value="10">10 miles</option>
                                </select> */}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="deadline" className="col-sm-3 col-form-label text-start">Deadline</label>
                            <div className="col-sm-9">
                                <input type="datetime-local" className="form-control" id="deadline" onChange={fieldChanged("deadline")}></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="donation" className="col-sm-3 col-form-label text-start">Donation Amount</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" id="donation" placeholder="$5" onChange={fieldChanged("donation")}></input>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="charity" className="col-sm-3 col-form-label text-start">Charity</label>
                            <div className="col-sm-9">
                                {/* Note: if you prefer user-input, use the commented line below */}
                                {/* <input type="number" className="form-control" id="distance" placeholder="12k"></input> */}
                                <select className="form-select" id="charity" onChange={fieldChanged("charity")}>
                                    <option value="1">Red Cross</option>
                                    <option value="2">Feeding America</option>
                                    <option value="3">Salvation Army</option>
                                    <option value="4">St. Jude Children's Research Hospital</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={handleSubmit}>Create Challenge</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CreateChallenge;