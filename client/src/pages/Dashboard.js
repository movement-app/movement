import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import DashboardTable from "../components/DashboardTable";
import CreateChallenge from "../components/CreateChallenge";
import JoinChallenge from "../components/JoinChallenge";

function Dashboard(props) {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);

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
          let response = await fetch("/api/challenges");
          let allChallenges = await response.json();
          setChallenges(allChallenges);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching all active challenges", error);
          setError(true);
        }
    }

    if (loading) return <LoadingSpinner />;

    return (
        <>
            {error && <ErrorAlert details={"Failed to save the content"} />}   
            <div className="mb-4 d-flex align-items-start specialBtns">
                <button type="button" className="btn btn-dark w-25 me-3" data-bs-toggle="modal" data-bs-target="#createNew" data-bs-whatever="@createnew">+ Create New Challenge</button>
                <button type="button" className="btn btn-dark w-25" data-bs-toggle="modal" data-bs-target="#joinChallenge" data-bs-whatever="@joinchallenge">+ Join Challenge</button>
            </div>
            <div className="d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3 col-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Active Challenges</button>
                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Past Challenges</button>
                </div>
                <DashboardTable challenges={challenges}/>
            </div>
            <CreateChallenge getData={getData}/>
            <JoinChallenge getData={getData}/>
        </>
    )
}
export default Dashboard;
