import React from "react";

function AboutUsPage(props) {
  return (
    <>
      <div className="col text-center">
        <h2 className="mb-3">About our project</h2>
        <p className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          quidem adipisci nobis quia eum quaerat quos ducimus, deleniti
          exercitationem animi itaque iste illo reiciendis vitae atque
          necessitatibus voluptatum repellendus quisquam?
        </p>
        <h2 className="mb-3">About our Team</h2>
        <div className="row">
          <div className="col-lg-4">
            <h3>Siema Alam</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos in itaque nihil consectetur qui natus similique
              nostrum molestias, ipsa explicabo hic impedit aspernatur. Ipsa
              provident neque culpa alias incidunt amet.
            </p>
            <a href="https://github.com/siemaaa" type="button" className="btn btn-outline-dark" role="button">GitHub</a>
          </div>
          <div className="col-lg-4">
            <h3>Farhanul Thouship</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos in itaque nihil consectetur qui natus similique
              nostrum molestias, ipsa explicabo hic impedit aspernatur. Ipsa
              provident neque culpa alias incidunt amet.
            </p>
            <a href="https://github.com/thouship" type="button" className="btn btn-outline-dark" role="button">GitHub</a>
          </div>
          <div className="col-lg-4">
            <h3>Abdul Rafi</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos in itaque nihil consectetur qui natus similique
              nostrum molestias, ipsa explicabo hic impedit aspernatur. Ipsa
              provident neque culpa alias incidunt amet.
            </p>
            <a href="https://github.com/arafi6624" type="button" className="btn btn-outline-dark" role="button">GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
