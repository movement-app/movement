import React from "react";

function AboutUsPage(props) {
  return (
    <>
      <div className="col text-center">
        <h1 className="mb-3">Our Mission</h1>
        <h4 className="mb-5">
          By matching users to a challenge with their friends,<br></br>
          users will be able to bond over running and push themselves<br></br> to achieve their running goals.

        </h4>
        <h2 className="mb-3">Our Team</h2>
        <div className="row">
          <div className="col-lg-4">
            <h3>Siema Alam</h3>
            <p>
              Frontend Engineering
            </p>
            <a href="https://github.com/siemaaa" type="button" className="btn btn-outline-dark" role="button">GitHub</a>
          </div>
          <div className="col-lg-4">
            <h3>Farhanul Thouship</h3>
            <p>
              Middleware Engineering
            </p>
            <a href="https://github.com/thouship" type="button" className="btn btn-outline-dark" role="button">GitHub</a>
          </div>
          <div className="col-lg-4">
            <h3>Abdul Rafi</h3>
            <p>
              Backend Engineering
            </p>
            <a href="https://github.com/arafi6624" type="button" className="btn btn-outline-dark" role="button">GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
