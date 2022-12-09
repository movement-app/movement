import React from "react";
import runners from "./images/group_run_image.png";
//import duorun from "./images/duo_run.png";
import handshake from "./images/handshake.png";
// import runfriends from "./images/runningfriends.gif"


function HomePage(props) {
    return (
        <>
            <div className="container-hp">
                <h1>The Social and Physical Movement</h1>
                <h3 className="text-uppercase mb-5">Challenges for Charity</h3>
                <img className="img-fluid mainrunners" src={runners} alt="group of runners">
                </img>
                <div className="row">
                    <div className="col-8">
                        <img className="img-fluid" src={handshake} alt="handshake">
                        </img>
                    </div>
                    <div className="col-4 blurbs">
                        <h4>Challenge Your Friends</h4>
                        <p>Competition drives motivation. Whoever completes the fitness challenge first chooses the charity to be donated to. The loser of the challenge donates to the charity.</p>
                    </div>
                    {/* <img className="img-fluid mainrunners" src={runfriends} alt="gif runners"></img> */}

                </div>
            </div>
        </>
    );
}

export default HomePage;
