import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const Details = () => {
  const id = useParams().id;
  const [services, setservice] = useState([]);

  const submitHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/service/service/" + id);
      console.log(res.data.data);

      setservice(res.data.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    submitHandler()
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
      <main class="main-content border-radius-lg " style={{ marginLeft: `27%`, objectFit: 'cover' ,height:`100%`}}>
        <div class="container-fluid py-7">
          <div class="row">
            <div class="col-10">
              <div class="card my-4 bg-gray-100">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                    <h5 class="text-white text-capitalize ps-3" style={{ textAlign: `center` }}>Details</h5>
                  </div>
                </div>
                <div class="card-body px-4 pb-5" >
                  <div className="row mt-4">
                    <div className="col-lg-5 mb-lg-0 mb-4">
                      <div className="card z-index-2 mt-4">
                        <div className="card-body mt-n0 px-3">
                          <div className="bg-gradient-dark shadow-black border-radius-lg py-2 pe-3 mb-3">
                            <div className="chart">
                              <img src={services.imageUrl} style={{ margin: `3%`, height: `100%`, width: `100%`, objectFit: `cover` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7" >
                      <div className="card z-index-2">
                        <div className="card-header pb-0 ">
                          <h4>{services.servicename}</h4>
                          <h6>Category : {services?.category?.name}</h6>
                          <h6>Subcategory : {services?.subcat?.name}</h6>
                          <h6>Type : {services?.type?.name}</h6>
                          <h6>Fees : {services.fees}</h6>
                          <h6>Area : {services.area}</h6>
                          <h6>City : {services.city}</h6>
                          <h6>State : {services.state}</h6>
                        </div>
                        <div className="card-body p-0">
                          <div c lassName="chart">
                            <canvas id="chart-line" className="chart-canvas" height={40} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
