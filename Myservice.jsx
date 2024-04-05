import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

export const Myservice = () => {
  const [service, setservice] = useState([]);
  const id = localStorage.getItem("id");
  const getApidata = async () => {
    try {
      if (id !== undefined || id !== null) {
        const res = await axios.get("http://localhost:4000/service/services/" + id);
        console.log(res);
        console.log(res.data.data);
        setservice(res.data.data);
      }
    }
    catch (error) {
      console.log(error.response.data)
    }
  }
  const deleteservice = async (id) => {
    try {
      const res = await axios.delete("http://localhost:4000/service/service/" + id);
      if (res.status === 200) {
        toast.error('🦄 Deleted Successfully!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getApidata();
      }
    }
    catch (error) {
      console.log(error);
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
    getApidata();
    deleteservice();
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
      <main class="main-content border-radius-lg bg-gray-200" style={{ width: 900, marginLeft: `25%`, minHeight: `710px` }}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"

        />
        <div className="container justify-content-center">
          <div className="row">
            <div className="col-md-6 mt-3">
              <div className="input-group mb-3 input-group-outline mb-3 m-3  border border-primary">
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
        <div class="container-fluid py-3">
          <div class="row">
            <div class="col-12">
              <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">My Services</h6>
                  </div>
                </div>
                <div class="card-body px-0 pb-2">
                  <div class="table-responsive p-0">
                    <table class="table align-items-center mb-1">
                      <thead>
                        <tr>
                          <th class="text-xs font-weight-bold mb-0">Service Name</th>
                          <th class="text-xs font-weight-bold mb-0">Category</th>
                          <th class="text-xs font-weight-bold mb-0">Sub Category</th>
                          <th class="text-xs font-weight-bold mb-0" colSpan={3} style={{ textAlign: `center` }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {service?.map((ser) => {
                          return (
                            <tr>
                              <td style={{ paddingLeft: `20px` }}><p class="text-xs font-weight-bold mb-0">{ser?.servicename}</p></td>
                              <td style={{ paddingLeft: `25px` }}><p class="text-xs font-weight-bold mb-0">{ser?.category?.name}</p></td>
                              <td style={{ paddingLeft: `25px` }}><p class="text-xs font-weight-bold mb-0">{ser?.subcat?.name}</p></td>
                              <td class="align-middle text-center text-sm">
                                <button className='btn btn-info' >
                                  <Link to={`/serviceprovider/details/${ser._id}`} style={{ color: `white` }}>Details</Link></button>
                              </td>
                              <td class="align-middle text-center text-sm">
                                <button className='btn btn-success' >
                                  <Link to={`/serviceprovider/update/${ser._id}`} style={{ color: `white` }}>Update</Link></button>
                              </td>
                              <td class="align-middle text-center text-sm" >
                                <button className='btn btn-danger' onClick={() => { deleteservice(ser._id) }}>Delete</button>
                              </td>
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
