import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const BookService = () => {
  const [service, setservice] = useState([]);
  const submitHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/service/service");
      console.log(res.data.data);
      setservice(res.data.data)
    }
    catch (error) {
      console.log(error.response);
    }
  }
  const searchService = async (e) => {
    try {
      const res = await axios.get("http://localhost:4000/service/filterservice", {
        params: {
          servicename: e.target.value,
        }
      })
      console.log("response", res.data.data);
      setservice(res.data.data);
    }
    catch (error) {
      setservice([])
    }
  }
  useEffect(() => {
    submitHandler();
  }, [])

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
      <div className="row bg-gray-200" style={{ marginLeft: `20%`, maxWidth: `80%` }}>
        <div className="container-fluid py-3 justify-content-center">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group mb-3 input-group-outline mb-3 m-3 border border-primary">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Search services...."
                  aria-label="Recipient's username"
                  onChange={(e) => { searchService(e) }}
                  aria-describedby="basic-addon2"
                />
                <i className="fa fa-search  m-3" />
              </div>
            </div>
          </div>
        </div>
        {service?.map((service) => {
          return (
            <div className="col-lg-4 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                <div className="card-header p-0 position-relative mt-n2 mx-3 z-index-2 bg-transparent">
                  <div className=" border-radius-lg py-2 pe-1">
                    <div className="chart">
                      <img src={service.imageUrl} style={{ margin: `1%`, height: `200px`, width: `100%`, objectFit: `cover` }} />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="mb-0 ">{service?.servicename}</h6>
                  <p className="text-sm ">{service?.fees}</p>
                  <hr className="dark horizontal" />
                  <div className="d-flex ">
                    <button className="btn btn-primary">
                      <Link to={`/user/details/${service._id}`} style={{ color: `white` }} rel='stylesheet'>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
