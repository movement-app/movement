import React from "react";

function Dashboard(props) {
    return (
        <>
            <div className="mb-4 d-flex align-items-start specialBtns">
                <button type="button" class="btn btn-dark w-25 me-3">+ Create New Challenge</button>
                <button type="button" class="btn btn-dark w-25">+ Join Challenge</button>
            </div>
            <div className="d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3 col-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Active Challenges</button>
                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Past Challenges</button>
                </div>
                <div className="tab-content col-10 ms-4" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h4 className="dashboardTitles">Active Challenges</h4>
                        <table class="table table-hover table-striped">
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
                                    <td>5k</td>
                                    <td>10d</td>
                                </tr>
                                <tr>
                                    <th scope="row">2433</th>
                                    <td>Abdul, Thouship</td>
                                    <td>10k</td>
                                    <td>12d</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <h4 className="dashboardTitles">Past Challenges</h4>
                        <table class="table table-hover table-striped">
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
                                    <td>3k</td>
                                    <td>0d</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Dashboard;
