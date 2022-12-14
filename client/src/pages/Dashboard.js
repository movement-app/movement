import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

function Dashboard(props) {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ title: "", distance: "", deadline: "", donation: "", charity: "1" });
    const [joinData, setJoinData] = useState({ match_id: ""})
    const [challenge, setChallenge] = useState([]); 

    const fieldChanged = (name) => {
        return (event) => {
          let { value } = event.target;
          setData((prevData) => ({ ...prevData, [name]: value }));
        };
    };

    const fieldUpdated = (name) => {
        return (event) => {
          let { value } = event.target;
          setJoinData((prevData) => ({ ...prevData, [name]: value }));
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
              getData();
            } else {
              setError(true);
            }
          } catch (error) {
            console.error("Server error while creating a new activity log", error);
            setError(true);
          }
    }

    const handleUpdate = async (event) => {
        try {
            const response = await fetch(`/api/challenges/${joinData.match_id}`, { method: "PUT" });
      
            if (response.ok) {
              setSuccess(true);
            } else {
              setError(true);
            }
          } catch (error) {
            console.error("Server error while updating the challenge", error);
            setError(true);
          }
          getData();
    }


    const getData = async (event) => {
        setError(false);
        setLoading(true);
        try {
          let response = await fetch("/api/challenges");
          let allChallenges = await response.json();
          console.log(allChallenges);
          setChallenge(allChallenges);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching all active challenges", error);
          setError(true);
        }
        console.log(challenge);
    }

    useEffect(() => {
        getData();
        return () => {
          // clean up function
        };
      }, []);

    //if (loading) return <LoadingSpinner />;

    return (
        <>
            <div className="mb-4 d-flex align-items-start specialBtns">
                <button type="button" className="btn btn-dark w-25 me-3" data-bs-toggle="modal" data-bs-target="#createNew" data-bs-whatever="@createnew">+ Create New Challenge</button>
                <button type="button" className="btn btn-dark w-25" data-bs-toggle="modal" data-bs-target="#joinChallenge" data-bs-whatever="@joinchallenge">+ Join Challenge</button>
            </div>
            <div className="d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3 col-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Active Challenges</button>
                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Past Challenges</button>
                </div>
                <div className="tab-content col-10 ms-4" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        {error && <ErrorAlert details={"Failed to save the content"} />}    
                        <h4 className="dashboardTitles">Active Challenges</h4>
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Challenge ID</th>
                                    <th scope="col">Competitors</th>
                                    <th scope="col">Distance</th>
                                    <th scope="col">Time Left</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1586</th>
                                    <td>Siema, Abdul</td>
                                    <td>22 miles</td>
                                    <td>10d</td>
                                </tr>
                                <tr>
                                    <th scope="row">2433</th>
                                    <td>Abdul, Thouship</td>
                                    <td>10 miles</td>
                                    <td>12d</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <h4 className="dashboardTitles">Past Challenges</h4>
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Challenge ID</th>
                                    <th scope="col">Competitors</th>
                                    <th scope="col">Distance</th>
                                    <th scope="col">Time Left</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1306</th>
                                    <td>Abdul, Thouship</td>
                                    <td>3 miles</td>
                                    <td>0d</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Challenge</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="joinChallenge" tabIndex="-1" aria-labelledby="joinChallengeModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="joinChallenge">Join Challenge</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="title" className="col-sm-3 col-form-label text-start">Challenge ID</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="title" placeholder="2433" onChange={fieldUpdated("match_id")}></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Join Challenge</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;
