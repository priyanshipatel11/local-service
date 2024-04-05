import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';

export const MyBookings = () => {
  const [service, setservice] = useState([]);
  const id = localStorage.getItem("id");
  const getData = async () => {
    try {
      if (id !== undefined || id !== null) {
        const res = await axios.get("http://localhost:4000/booking/user/booking/" + id);
        console.log(res);
        console.log(res.data.data);
        setservice(res.data.data);
      }
    }
    catch (error) {
      console.log(error.response.data);
    }
  }
  // const deleteservice = async (id) => {
  //   try {
  //     if (id !== undefined || id !== null) {
  //       const res = await axios.delete("http://localhost:4000/booking/booking/" + id);
  //       if (res.status === 200) {
  //         alert("Deleted Successfully");
  //         getData();
  //       }
  //     }
  //   }
  //   catch (error) {
  //     console.log(error.response.data);
  //   }
  // }
  useEffect(() => {
    if (id !== undefined || id !== null) {
      console.log("Id...", id);
      getData();
      //deleteservice();
    }
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
      <main class="main-content border-radius-lg " style={{ width: 900, marginLeft: `27%`, height: `712px` }}>
        <div class="container-fluid py-5">
          <div class="row">
            <div class="col-12">
              <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">My Bookings</h6>
                  </div>
                </div>
                <div class="card-body px-0 pb-2">
                  <div class="table-responsive p-0">
                    <table class="table align-items-center mb-1">
                      <thead>
                        <tr>
                          <th class="text-xs font-weight-bold mb-0">Service Name</th>
                          <th class="text-xs font-weight-bold mb-0">Total Amount</th>
                          <th class="text-xs font-weight-bold mb-0">Status</th>
                          <th class="text-xs font-weight-bold mb-0" colSpan={3} style={{ textAlign: `center` }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {service?.map((ser) => {
                          return (
                            <tr>
                              <td style={{ paddingLeft: `20px` }}><p class="text-xs font-weight-bold mb-0">{ser?.service?.servicename}</p></td>
                              <td style={{ paddingLeft: `25px` }}><p class="text-xs font-weight-bold mb-0">{ser?.totalamount}</p></td>
                              <td style={{ paddingLeft: `25px` }}><p class="text-xs font-weight-bold mb-0">{ser?.status}</p></td>
                              <td class="align-middle text-center text-sm">
                                <button className='btn btn-info' >
                                  <Link to={`/user/bookingdetails/${ser._id}`} style={{ color: `white` }}>Details</Link></button>
                              </td>
                              {/* <td class="align-middle text-center text-sm" >
                                <button className='btn btn-danger' onClick={() => { deleteservice(ser._id) }}>Delete</button>
                              </td> */}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
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
