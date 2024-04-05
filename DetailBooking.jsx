import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

export const DetailBooking = () => {
  const id = useParams().id;
  const [service, setservice] = useState([]);
  const getDetail = async () => {
    try {
      const res = await axios.get("http://localhost:4000/booking/booking/" + id);
      console.log(res.data.data);
      setservice(res.data.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDetail()
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
      <main class="main-content border-radius-lg bg-gray-200" style={{ marginLeft: `40%`, objectFit: 'cover', height: `712px` }}>
        <div class="container-fluid py-5">
          <div class="row">
            <div class="col-6">
              <div class="card my-4 bg-gray-100">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                    <h5 class="text-white text-capitalize ps-3" style={{ textAlign: `center` }}>Details</h5>
                  </div>
                </div>
                <div class="card-body px-6 pb-4" >
                  <div className="col-lg-11 ps-4" >
                    <div className="bg-gradient-dark shadow-secondary border-radius-lg py-2 pe-3 mb-2">
                      <img src={service?.service?.imageUrl} style={{ margin: `3%`, height: `100%`, width: `100%`, objectFit: `cover` }} />
                    </div><br/>
                    <label className='h6 pe-1'>Servcie Name :</label> {service?.service?.servicename}
                    <label className='h6 pe-1'>Service Provider :</label>  {service?.serviceprovider?.name}
                    <label className='h6 pe-1'>Total Amount : </label>  {service?.totalamount}<br/>
                    <label className='h6 pe-1'>Area : </label>  {service?.service?.area}<br/>
                    <label className='h6 pe-1'>City : </label>  {service?.service?.city}<br/>
                    <label className='h6 pe-1'>State : </label>  {service?.service?.state}<br/>
                    <label className='h6 pe-1'>Status : </label>  {service?.status}<br/>
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
