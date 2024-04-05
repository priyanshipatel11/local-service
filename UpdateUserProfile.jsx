import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const UpdateUserProfile = () => {
  const id = localStorage.getItem("id");

  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const res = await axios.get(
        `http://localhost:4000/user/user/${id}`
      );
      console.log(res.data.data);
      return { 
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
      };
    },
  });

  const submitHandler = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/user/user/${id}`,
        data
      );
      console.log(res.data);
      if (res.status === 200) { 
        toast.success('🦄 Update Successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        window.location.pathname = "/user/profile"
      } else {
        console.log("Error in updating....");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
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
      <div style={{ marginLeft: `21%`,height:'712px' }}>
        <div className="container-fluid py-7">
          <div className="card me-12 ms-10">
            <div className="mt-5">
              <div className="d-flex">
                <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-xl mt-n3 ms-4">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <h4 className=" mb-2 ms-3">Update User Profile</h4>
              </div>
            </div>
            <br />
            <div className="card-body ms-5 me-5" style={{ padding: `12px` }}>
              <form onSubmit={handleSubmit(submitHandler)}>
                <label className="form-label" style={{ margin: `3px` }}>
                  Username
                </label>
                <div className="input-group input-group-outline my-0">
                  <input
                    type="text"
                    className="form-control"
                    {...register("name")}
                  />
                </div>
                <br />
                <label className="form-label" style={{ margin: `3px` }}>
                  Email
                </label>
                <div className="input-group input-group-outline my-0">
                  <input
                    type="text"
                    className="form-control"
                    {...register("email")}
                  />
                </div>
                <br />
                <label className="form-label" style={{ margin: `3px` }}>
                  Phone No.
                </label>
                <div className="input-group input-group-outline my-0">
                  <input
                    type="text"
                    className="form-control"
                    {...register("phone")}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ color: `white` }}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>  )
}