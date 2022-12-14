import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';

function DashboardTable(props) {

    const [activeChallenges, setActiveChallenges] = useState([]);
    const [pastChallenges, setPastChallenges] = useState([]);
    const [participants, setParticipants] = useState();
    const [match_id, setMatchId] = useState();

    const fieldChanged = (name) => {
        return (event) => {
          let { value } = event.target;
          setMatchId((prevData) => ({ ...prevData, [name]: value }));
        };
    };

    useEffect(() => {
        const active = [];
        const past = [];

        let length = props.challenges[0].Challenges.length;

        for(let i = 0; i < length; i++){
            let element = props.challenges[0].Challenges[i];
            if(element.status === true){
                active.push(element);
            }else{
                past.push(element);
            }
        }

        setActiveChallenges(active);
        setPastChallenges(past);
    }, []);

    return (
        <div className="tab-content col-10 ms-4" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> 
                <h4 className="dashboardTitles">Active Challenges</h4>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Challenge ID</th>
                            <th scope="col">Competitors</th>
                            <th scope="col">Distance</th>
                            <th scope="col">Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeChallenges.map((element) => {
                            return <TableRow elem={element} key={element.match_id}/>
                        })}
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
                            <th scope="col">Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">62458736</th>
                            <td>Abdul, Siema</td>
                            <td>5 miles</td>
                            <td>12/26/22</td>
                        </tr>
                        <tr>
                            <th scope="row">13829753</th>
                            <td>Thouship, Siema</td>
                            <td>3 miles</td>
                            <td>05/21/23</td>
                        </tr>
                        <tr>
                            <th scope="row">09724437</th>
                            <td>Abdul, Thouship</td>
                            <td>8 miles</td>
                            <td>02/11/23</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardTable;