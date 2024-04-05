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

export const UserDashboard = () => {
  const [book, setbook] = useState([])
  const [totalBook, settotalBook] = useState([])
  const [doneBook, setdoneBook] = useState([]);
  const [amount, setamount] = useState([])

  const id = localStorage.getItem("id");
  const totalAmount = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/booking/statusdone/${id}`);
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

  const getAllBooking = async () => {
    try {
      const res = await axios.get("http://localhost:4000/booking/booking")
      console.log(res.data.data);
      settotalBook(res.data.data);
      if (res.data.data && res.data.data.length > 0) {
        const bookingCounts = 0;
        for (const booking of res.data.data) {
          bookingCounts++;
          settotalBook(bookingCounts);
        }
      }
    } catch (error) {
      // console.log(error.response.data);
    }
  }

  const getPendingBooking = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/booking/statuspending/${id}`)
      console.log(res.data.data);
      setbook(res.data.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  }

  const getDoneBooking = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/booking/statusdone/${id}`);
      console.log(res.data.data);
      setdoneBook(res.data.data);
      if (res.data.data && res.data.data.length > 0) {
        const bookingCounts = 0;
        for (const booking of res.data.data) {
          bookingCounts++;
          setdoneBook(bookingCounts);
        }
      }
    } catch (error) {
      // console.log(error.response.data);
    }
  };
  const [data, setdata] = useState({
    labels: [],
    datasets: [],
  });
  const getAllservice = async () => {
    try {
      const res = await axios.get("http://localhost:4000/service/service");
      console.log("service", res.data.data);
      if (res.data.data && res.data.data.length > 0) {
        const categoryCounts = {};
  
        for (const service of res.data.data) {
          if (service.category) {
            const categoryName = service.category.name;
            const categoryAmount = service.fees || 0;
            if (categoryCounts[categoryName]) {
              categoryCounts[categoryName] += categoryAmount;
            } else {
              categoryCounts[categoryName] = categoryAmount;
            }
          }
        }
        const transformedData = {
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              label: "Service",
              data: Object.values(categoryCounts),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        };
  
        // Update state with new data
        setdata(transformedData);
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      alert("Error fetching service");
    }
  };
  
  useEffect(() => {
    getAllservice();
    getAllBooking();
    getPendingBooking();
    getDoneBooking();
    totalAmount();
  }, []);

  
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700"
        />

        <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />

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
          href="../assets/css/material-dashboard.css?v=3.0.0"
          rel="stylesheet"
        />
      </Helmet>
      <div className='bg-gray-200' style={{ marginLeft: `20%` }} >
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
                        Total Booking
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
                        Done Booking
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
            <div className="row mt-6">
            <div className="col-20">
              <div className="card mb-4 ">
                <div className="d-flex">
                  <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-xl mt-n3 ms-4">
                    <i
                      className="material-icons opacity-10"
                      aria-hidden="true"
                    >
                      language
                    </i>
                  </div>
                  <h6 className="mt-3 mb-2 ms-3">Pending Booking</h6>
                </div>
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-lg-12 col-md-7">
                      <div className="table-responsive">
                        <table className="table align-items-center ">
                          <thead>
                            <tr>
                              <th className="text-uppercase  text-xs font-weight-bold mb-0">
                                Service Name
                              </th>
                              <th className="text-uppercase text-xs font-weight-bold mb-0">
                                Total Amount
                              </th>
                              <th className="text-uppercase text-xs font-weight-bold mb-0">
                                Status
                              </th>
                              <th className="text-center text-uppercase text-xs font-weight-bold mb-0">
                                Action
                              </th>
                              <th className="text-secondary opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                            {book?.map((booking) => {
                              return (
                                <tr>
                                  <td style={{ paddingLeft: `25px` }}>
                                    <div className="d-flex flex-column justify-content-center">
                                      <p className="text-xs font-weight-bold mb-0">
                                        {booking?.service?.servicename}
                                      </p>
                                    </div>
                                  </td>
                                  <td style={{ paddingLeft: `25px` }}>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {booking?.service?.fees}
                                    </p>
                                  </td>
                                  <td style={{ paddingLeft: `20px` }}>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {booking.status}
                                    </p>
                                  </td>
                                  <td className="align-middle text-center text-sm" style={{ paddingLeft: `30px`, paddingTop: `20px` }}>
                                    <button className="btn btn-primary">
                                      <Link
                                        to={`/payment/${booking._id}`}
                                        style={{ color: `white` }}
                                      >
                                        PAY NOW
                                      </Link>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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