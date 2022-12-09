import React from "react";

function Dashboard(props) {
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
                                    <label htmlFor="challengeID" className="col-sm-3 col-form-label text-start">Challenge ID</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="challengeID" placeholder="2433"></input>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="distance" className="col-sm-3 col-form-label text-start">Distance</label>
                                    <div className="col-sm-9">
                                        {/* Note: if you prefer user-input, use the commented line below */}
                                        {/* <input type="text" className="form-control" id="distance" placeholder="12k"></input> */}
                                        <select className="form-select" id="distance">
                                            <option value="1">1 mile</option>
                                            <option value="5">5 miles</option>
                                            <option value="10">10 miles</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="deadline" className="col-sm-3 col-form-label text-start">Deadline</label>
                                    <div className="col-sm-9">
                                        <input type="date" className="form-control" id="deadline"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Send Challenge</button>
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
                                    <label htmlFor="challengeID" className="col-sm-3 col-form-label text-start">Challenge ID</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="challengeID" placeholder="2433"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Join Challenge</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Dashboard;
