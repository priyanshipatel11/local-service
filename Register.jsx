import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700"
        />

        <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />

        <script
          src="https://kit.fontawesome.com/42d5adcbca.js"
          crossorigin="anonymous"
        ></script>

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />

        <link
          id="pagestyle"
          href="../assets/css/material-dashboard.css?v=3.1.0"
          rel="stylesheet"
        />
      </Helmet>
      <main
        class="main-content border-radius-lg bg-gray-200 "
        style={{ width: 900, marginLeft: `23%`, height:`712px` }}
      >
        <div className="container-fluid py-4">
          <div class="d-flex aligns-items-center justify-content-center card text-center w-100 mt-11">
            <div className="card">
              <div className="card-body " >
                <h5 class="card-title">Please</h5>
                <h6 class="card-text">Select Your Type</h6>
                <br />
                <button className="btn btn-primary">
                  <Link to="/user/register" style={{ color: `white` }}>
                    Registration As User
                  </Link>
                </button>
                <br />
                <button className="btn btn-primary">
                  <Link
                    to="/serviceprovider/register"
                    style={{ color: `white` }}
                  >
                    Registration As Service Provider
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};