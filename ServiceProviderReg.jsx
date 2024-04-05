import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const ServiceProviderReg = () => {
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/serviceprovider/serviceprovider", data
      );
      console.log(res.data.data);
      window.location.pathname = "/serviceprovider/dashboard";

    } catch (error) {
      console.log(error.response.data);
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
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage:
                        'url("../assets/img/illustrations/illustration-signup.jpg")',
                      backgroundSize: "cover"
                    }}
                  ></div>
                </div>
                <form role="form" onSubmit={handleSubmit(submitHandler)}>
                  <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                    <div className="card card-plain">
                      <div className="card-header rounded">
                        <h4 className="font-weight-bolder">Sign Up</h4>
                          Enter your email and password to register
                        <br/><br/>
                          <label className="form-label" htmlFor="serviceprovider">
                            <input
                              className="input-form-check"
                              type="radio"
                              name="serviceprovider"
                              value="65d704b5e4f72d683c6589f5" checked
                              {...register("role")}
                            />
                            ServiceProvider
                          </label><br/>
                        <label className="form-label">Name</label>
                        <div className="input-group input-group-outline mb-2">
                          <input type="text" className="form-control" {...register("name")} />
                        </div>
                        <label className="form-label">Email</label>
                        <div className="input-group input-group-outline mb-2">
                          <input type="email" className="form-control" {...register("email")} />
                        </div>
                        <label className="form-label">Password</label>
                        <div className="input-group input-group-outline mb-2">
                          <input type="password" className="form-control" {...register("password")} />
                        </div>
                        <label className="form-label">Phone</label>
                        <div className="input-group input-group-outline mb-2">
                          <input type="text" className="form-control" {...register("phone")} />
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                          >
                            Sign Up
                          </button>
                        </div><br />
                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                          <p className="mb-2 text-sm mx-auto">
                            Already have an account?
                            <Link
                              to="/"
                              className="text-primary text-gradient font-weight-bold"
                            >
                              Sign in
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
