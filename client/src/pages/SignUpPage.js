import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import runnersgraphic from "./images/rungraphic.png";
import runfriends from "./images/runningfriends.gif"


function SignUpPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [error, setError] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const fieldChanged = (name) => {
        return (event) => {
            let { value } = event.target;
            setData((prevData) => ({ ...prevData, [name]: value }));
        };
    };

    const signup = async (e) => {
        e.preventDefault();
        let { firstName, lastName, email, password } = data;

        try {
            await auth.signup(firstName, lastName, email, password);
            // setRedirectToReferrer(true); // used in react-router v5
            // in react-router v6 navigate changes the pages directly.
            // comment from official docs example:
            //    Send them back to the page they tried to visit when they were
            //    redirected to the login page. Use { replace: true } so we don't create
            //    another entry in the history stack for the login page.  This means that
            //    when they get to the protected page and click the back button, they
            //    won't end up back on the login page, which is also really nice for the
            //    user experience.
            navigate(from, { replace: true });
        } catch (error) {
            setError(true);
        }
    };

    let errorMessage = "";
    if (error) {
        errorMessage = (
            <div className="alert alert-danger" role="alert">
                Signup Failed
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img className="h-100 img-fluid mt-5" src={runfriends} alt="runners graphic"></img>
                    </div>
                    <div className="col-6">
                        <div className="loginForm">
                            <h3>Join the Movement</h3>
                            <br></br>
                            <form onSubmit={signup}>
                                {errorMessage}
                                <div className="form-row">
                                    <div className="row">
                                        <div className="col">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={data.firstName}
                                                onChange={fieldChanged("firstName")}
                                            />
                                        </div>
                                        <div className="col">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={data.lastName}
                                                onChange={fieldChanged("lastName")}
                                            />
                                        </div>
                                    </div>
                                    <br></br>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={fieldChanged("email")}
                                    />
                                    <br></br>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={fieldChanged("password")}
                                    />
                                    <br></br>
                                    <button type="submit" className="btn btn-dark ml-auto w-100">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div></div>
        </>

    );
}

export default SignUpPage;
