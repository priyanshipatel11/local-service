import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
export const Payment = () => {
  const [service, setservice] = useState([]);
  const {id} = useParams();
  const paynow = async (data) => {
    try {
      const obj = {
        id: id,
        status: "done"
      }
      const res = await axios.put("http://localhost:4000/booking/bookstatus/"+id,obj);
      console.log(res.data.data);
      setservice(res.data.data);
      toast.success('🦄 Payment Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      // alert("Payment Successfully")
    }
    catch (error) {
      console.log(error);
    }
  }
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
      <main className="main-content  mt-0">
        <div className="page-header align-items-start min-vh-100 ">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <span className="mask bg-gray-200 opacity-6" />
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-2 pe-0">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        PAYMENT
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <form role="form" className="text-start">
                      <label className="form-label">Credit Card</label>
                      <div className="input-group input-group-outline mb-3">
                        <input type="text" className="form-control" placeholder="1111-2222-3333-4444" maxLength={19}></input>
                        <span>
                          <img
                            class="w-10 me-3 mb-0"
                            src="../assets/img/logos/mastercard.png"
                            alt="logo"
                          ></img>
                        </span>
                      </div>
                      <label className="form-label">Name On Card</label>
                      <div className="input-group input-group-outline mb-3">
                        <input type="text" className="form-control" />
                      </div>
                      <label className="form-label">CVV</label>
                      <div className="input-group input-group-outline mb-3">
                        <input type="password" className="form-control" maxLength={3} />
                      </div>
                      <label className="form-label">Expiration Date</label>
                      <div className="input-group input-group-outline mb-3">
                        <input type="month" className="form-control" />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          value="Sign In"
                          className="btn bg-gradient-primary w-100 my-4 mb-2"
                          onClick={() => {
                            paynow()
                          }}>
                          PAY NOW
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

