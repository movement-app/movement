import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
// import PostsListPage from "./pages/PostsListPage";
import PostFormPage from "./pages/PostFormPage";
import ShowPostPage from "./pages/ShowPostPage";
import AboutUsPage from "./pages/AboutUsPage";
import AddCharityPage from "./pages/AddCharityPage";
import RunTrackerPage from "./pages/RunTrackerPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import { AuthProvider } from "./context/AuthContext";
import AuthButton from "./components/AuthButton";
import "./App.css";
import PrivateRouteRequiresAuth from "./components/PrivateRouteRequiresAuth";
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-light mr-5 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          movement
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/run-tracker">
              My Runs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about-us">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sign-up">
              Join
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="rightNav">

      <AuthButton />
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="container-xl text-center">
          <div className="row justify-content-center">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/posts/new"
                element={
                  <PrivateRouteRequiresAuth>
                    {/* In react-router v6 we protect routes like this */}
                    <PostFormPage />
                  </PrivateRouteRequiresAuth>
                }
              />
              <Route path="/posts/:id" element={<ShowPostPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/add-charities" element={<AddCharityPage />} />
              <Route path="/run-tracker" element={
                  <PrivateRouteRequiresAuth>
                    <RunTrackerPage />
                  </PrivateRouteRequiresAuth>
                } 
              />
              <Route path="/dashboard" element={
                  <PrivateRouteRequiresAuth>
                    <Dashboard/>
                  </PrivateRouteRequiresAuth>
                } 
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-up" element={<SignUpPage />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
