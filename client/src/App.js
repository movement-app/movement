import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import PostsListPage from "./pages/PostsListPage";
import PostFormPage from "./pages/PostFormPage";
import ShowPostPage from "./pages/ShowPostPage";
import AboutUsPage from "./pages/AboutUsPage";
import RunTrackerPage from "./pages/RunTrackerPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import { AuthProvider } from "./context/AuthContext";
import AuthButton from "./components/AuthButton";

import "./App.css";
import PrivateRouteRequiresAuth from "./components/PrivateRouteRequiresAuth";

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-light mr-5 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          movement
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts/new">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/homepage">
              Homepage
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/RunTrackerPage">
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
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/RunTrackerPage" element={<RunTrackerPage />} />
              <Route path="/" element={<PostsListPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
