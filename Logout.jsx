import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import './assets/css/loader.css'
import { CustomLoader } from './CustomLoader';

export const Logout = () => {
  const [isLoading, setisLoading] = useState(false)
  const logout = () => {
    setisLoading(true)
    localStorage.removeItem("id");
    window.location.pathname = "/";
    setisLoading(false);
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
      <main
        class="main-content border-radius-lg "
        style={{ width: 900, marginLeft: `27% `, height: `712px` }}
      >
        {
          isLoading ? (<CustomLoader/>) : (
            <>
              <div className="container-fluid py-5">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Logout</h4>
                    <br />
                    <h6 className="card-text">Are you sure you want to logout?</h6>
                    <br />
                    <button className="btn btn-primary" onClick={logout}>
                      Confirm Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </main>
    </>
  )
}
