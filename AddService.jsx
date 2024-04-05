import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

export const AddService = () => {
    const { register, handleSubmit } = useForm();
    const [categories, setcategories] = useState([]);
    const [subcategory, setsubcategory] = useState([])
    const [type, settype] = useState([])
    const submitHandler = async (data) => {
        const id = localStorage.getItem("id")
        const dataObj = Object.assign(data, { serviceprovider: id });
        if (id !== undefined) {
            try {
                var formData = new FormData();
                formData.append("servicename", data.servicename);
                formData.append("myImage", data.myImage[0]);
                formData.append("category", data.category);
                formData.append("subcat", data.subcat);
                formData.append("type", data.type);
                formData.append("fees", data.fees);
                formData.append("area", data.area);
                formData.append("city", data.city);
                formData.append("state", data.state);
                formData.append("serviceprovider", id)

                const res = await axios.post(
                    "http://localhost:4000/service/service",
                    formData
                );
                console.log(res.data.data);
                console.log(data);
                toast.info('🦄 Add Successfully!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                window.location.pathname = '/serviceprovider/myservice'
            } catch (error) {

            }
        }
    }
    const loadType = async () => {
        const res = await axios.get("http://localhost:4000/type/type");
        console.log(res.data.data);
        settype(res.data.data);
    };

    const loadSubCategories = async () => {
        const res = await axios.get("http://localhost:4000/subcategory/subcategory");
        console.log(res.data.data);
        setsubcategory(res.data.data);
    };
    const loadCategories = async () => {
        const res = await axios.get('http://localhost:4000/category/category');
        console.log(res.data.data);
        setcategories(res.data.data);
    }
    useEffect(() => {
        loadCategories();
        loadSubCategories();
        loadType();
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
        <main class="main-content border-radius-lg bg-gray-200" style={{ marginLeft: `15%` , height: `100%`}} >
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
            <div className="page-header align-items-start  " >
                <span className="mask  opacity-6 " />
                <div className="container my-3">
                    <div className="row">
                        <div className="col-lg-0 col-md-4 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-1 pe-1" style={{ marginTop: `5%` }}>
                                        <h5 className="text-white font-weight-bolder text-center mt-2 mb-0">
                                            Add Services
                                        </h5>
                                    </div>
                                </div>
                                <div className="card-body" style={{ padding: `12px` }}>
                                    <form role="form" className="text-start" onSubmit={handleSubmit(submitHandler)}>
                                        <label className="form-label" style={{ margin: `1px` }}>Service Name</label>
                                        <div className="input-group input-group-outline my-0" >
                                            <input type="text" className="form-control" {...register("servicename")} />
                                        </div>
                                        <label className="form-label" style={{ margin: `1px` }}>Category</label>
                                        <div className="input-group input-group-outline my-0">
                                            <select className="form-control" {...register("category")}>
                                                <option>SELECT CATEGORY</option>
                                                {categories?.map((cat) => {
                                                    return (
                                                        <>
                                                            <option value={cat._id}>{cat.name}</option>
                                                        </>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <label className="form-label" style={{ margin: `1px` }}>Subcategory</label>
                                        <div className="input-group input-group-outline my-0">
                                            <select className="form-control" {...register("subcat")}>
                                                <option>SELECT SUBCATEGORY</option>
                                                {subcategory?.map((subcat) => {
                                                    return (
                                                        <>
                                                            <option value={subcat._id}>{subcat.name}</option>
                                                        </>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <label className="form-label" style={{ margin: `1px` }}>Type</label>
                                        <div className="input-group input-group-outline my-0">
                                            <select className="form-control" {...register("type")}>
                                                <option>SELECT TYPE</option>
                                                {type?.map((type) => {
                                                    return (
                                                        <>
                                                            <option value={type._id}>{type.name}</option>
                                                        </>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        <label className="form-label" style={{ margin: `1px` }}>Fees</label>
                                        <div className="input-group input-group-outline mb-0">
                                            <input type="text" className="form-control" {...register("fees")} />
                                        </div>
                                        <label className="form-label" style={{ margin: `1px` }}>Area</label>
                                        <div className="input-group input-group-outline mb-0">
                                            <input type="text" className="form-control" {...register("area")} />
                                        </div>
                                        <label className="form-label" style={{ margin: `1px` }}>City</label>
                                        <div className="input-group input-group-outline mb-0">
                                            <input type="text" className="form-control" {...register("city")} />
                                        </div>
                                        <label className="form-label" style={{ margin: `1px` }}>State</label>
                                        <div className="input-group input-group-outline mb-0">
                                            <input type="text" className="form-control" {...register("state")} />
                                        </div>
                                        <label className="form-label" style={{ margin: `1px` }}>Upload Image</label>
                                        <div className="input-group input-group-outline mb-1">
                                            <input
                                                className="form-control"
                                                type="file"
                                                {...register("myImage")}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn bg-gradient-primary w-100 my-0 mb-1"
                                            >
                                                Add Service
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
}