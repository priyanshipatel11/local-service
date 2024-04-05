import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const ServiceProviderProfile = () => {
  const [serviceprovider, setserviceprovider] = useState([]);

  const id = localStorage.getItem("id");

  const getServiceProvider = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/serviceprovider/serviceprovider/${id}`
      );
      console.log(res.data.data);
      setserviceprovider(res.data.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  useEffect(() => {
    getServiceProvider();
  }, []);
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700"
        />

        <link href="../../assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="../../assets/css/nucleo-svg.css" rel="stylesheet" />

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
          href="../../assets/css/material-dashboard.css?v=3.0.0"
          rel="stylesheet"
        />
      </Helmet>
      <div style={{ marginLeft: `20%`,height:`100%`}}>
        <div className="container-fluid py-10">
          <div className="card me-12 ms-10">
            <div className="mt-5">
              <div className="d-flex">
                <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-xl mt-n3 ms-4">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <h4 className=" mb-2 ms-3">Service Provider Profile</h4>
              </div>
            </div>
           
            <div class="card-body px-6 pb-4">
              <div className="col-lg-10">
                <h6>Username : {serviceprovider.name}</h6>
                <h6>Email : {serviceprovider.email} </h6>
                <h6>Phone No : {serviceprovider.phone}</h6>
                <hr />
                <button className="btn btn-success">
                  <Link to={`/serviceprovider/profile/update`} style={{ color: `white` }}>
                    Update
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};