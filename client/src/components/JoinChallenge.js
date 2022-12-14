import React, { useState } from 'react';
import ErrorAlert from "../components/ErrorAlert";

function JoinChallenge(props) {

    const [data, setData] = useState({ match_id: "" });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const fieldChanged = (name) => {
        return (event) => {
          let { value } = event.target;
          setData((prevData) => ({ ...prevData, [name]: value }));
        };
    };

    const handleSubmit = async (event) => {
        try {
            const response = await fetch(`/api/challenges/${data.match_id}`, { method: "PUT" });
            if (response.ok) {
              setSuccess(true);
            } else {
              setError(true);
            }
          } catch (error) {
            console.error("Server error while updating the challenge", error);
            setError(true);
          }
          props.getData();
    }

    return (
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
                                    <input type="text" className="form-control" id="title" placeholder="2433" onChange={fieldChanged("match_id")}></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={handleSubmit}>Join Challenge</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinChallenge;