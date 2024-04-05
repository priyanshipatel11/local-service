import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
} from "chart.js";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(BarElement);

export const ServiceProviderDashboard = () => {
  const [book, setbook] = useState([])
  const [totalBook, settotalBook] = useState([])
  const [doneBook, setdoneBook] = useState([]);
  const [amount, setamount] = useState([])

  const id = localStorage.getItem("id");
  const totalAmount = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/booking/doneStatusByServiceProvider/${id}`);
      console.log(res.data.data);
      setamount(res.data.data);
      if (res.data.data && res.data.data.length > 0) {
        var amountBooking = 0;
        for (const booking of res.data.data) {
          amountBooking += booking.totalamount
          setamount({ totalamount: amountBooking });
        }
        console.log("Total Amount of Done Bookings:", amountBooking);
      }
    } catch (error) {
      // console.log(error.response.data);
    }
  }

  const getBookingByServiceProviderId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/service/services/${id}`
      );
      console.log(res.data.data);
      // Update totalBook with the array of all bookings
      settotalBook(res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getBooking = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/booking/doneStatusByServiceProvider/${id}`)
      console.log(res.data.data);
      setbook(res.data.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  }

  const getDoneBooking = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/booking/doneStatusByServiceProvider/${id}`
      );
      if (res.data && res.data.data) {
        console.log(res.data.data);
        // Update doneBook with the array of done bookings
        setdoneBook(res.data.data);
      } else {
        console.error("Invalid response format:", res);
      }
    } catch (error) {
      console.error("Error fetching done bookings:", error);
    }
  };

  const getAllservice = async () => {
    try {
      const res = await axios.get("http://localhost:4000/service/service");
      console.log("service", res.data.data);
      if (res.data.data && res.data.data.length > 0) {
        const categoryCounts = {};

        for (const service of res.data.data) {
          // service ma category che k nai check karse
          if (service.category) {
            //category nu name set karse
            const categoryName = service.category.name;
            //check karse k categoryName pelethi che k nai
            if (categoryCounts[categoryName]) {
              // jo hoy toh count vadhshe
              categoryCounts[categoryName]++;
            } else {
              // navi category aave toh ene count ma add kari ne initial value 1 aapse
              categoryCounts[categoryName] = 1;
            }
          }
        }
        const transformedData = {
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              label: "Service",
              data: Object.values(categoryCounts).map(value => Math.floor(value)),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        };
        setdata(transformedData);
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      alert("Error fetching service");
    }
  };

  useEffect(() => {
    getAllservice();
    getBookingByServiceProviderId();
    getBooking();
    getDoneBooking();
    totalAmount();
  }, []);

  const [data, setdata] = useState({
    labels: [],
    datasets: [],
  });
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
      <div style={{ marginLeft: `20%` }}>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="row mt-5">
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 me-5">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">weekend</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">
                        Total Services
                      </p><br />

                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <h4 className="mb-0 text-end">{totalBook.length}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 me-5">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">person</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">
                        Bookings
                      </p><br />
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <h4 className="mb-0 text-end">{doneBook.length}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 me-5">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">weekend</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Revenue</p><br />

                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <h4 className="mb-0 text-end">${amount.totalamount}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ }}>
            {book?.map((booking) => {
              return (
                <div className="col-lg-4 col-md-4 mt-4 mb-4">
                  <div className="card z-index-2 ">
                    <div className="card-header p-0 position-relative mt-n2 mx-3 z-index-2 bg-transparent">
                      <div className=" border-radius-lg py-2 pe-1">
                        <div className="chart">
                          <img src={booking?.service?.imageUrl} style={{ margin: `1%`, height: `200px`, width: `100%`, objectFit: `cover` }} />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="mb-0 ">{booking?.service?.servicename}</h5>
                      <hr className="dark horizontal my-0 mb-2 mt-2" />
                      <p className="text-sm ">{booking?.service?.area}</p>
                      <p className="text-sm ">{booking?.service?.city}</p>
                      <p className="text-sm ">{booking?.service?.fees}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="container-fluid mt-5 mb-8">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card">
                  <div
                    className="card-header bg-gradient-primary"
                    style={{
                      textAlign: `center`,
                      justifyContent: `center`,
                      alignContent: `center`,
                      color: `White`,
                    }}
                  >
                    Total Expense of Individual Category
                  </div>
                  <div className="card-body bg-gradient-light">
                    <Bar data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

