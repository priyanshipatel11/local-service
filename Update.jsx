import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

export const Update = () => {
    const id = useParams().id;
    const [categories, setcategories] = useState([]);
    const [subcategory, setsubcategory] = useState([])
    const [type, settype] = useState([])
    const navigate = useNavigate();
    const submitHandler = async (data) => {
        console.log(data);
        try {
            const res = await axios.put(
                "http://localhost:4000/service/service/" + id,
                data
            );
            if (res.status === 200) {
                toast.success("🦄 Update Successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate("/serviceprovider/myservice"); 
                }, 3000);  
            }
        }
        catch (error) {
            console.error("Error:", error); // Log the error for debugging
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
    const { register, handleSubmit } = useForm({

        defaultValues: async () => {
            const res = await axios.get("http://localhost:4000/service/service/" + id);
            return {
                servicename: res.data.data.servicename,
                fees: res.data.data.fees,
                area: res.data.data.area,
                city: res.data.data.city,
                state: res.data.data.state
            }
        }
    })
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
            <main class="main-content position-relative h-100 border-radius-lg " style={{ marginLeft: `12%` }}>
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
                <div className="page-header align-items-start min-vh-100 " >
                    <span className="mask  opacity-6 " />
                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 col-12 mx-auto">
                                <div className="card z-index-0 fadeIn3 fadeInBottom">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-primary shadow-primary border-radius-lg py-1 pe-1" style={{ marginTop: `5%` }}>
                                            <h5 className="text-white font-weight-bolder text-center mt-2 mb-0">
                                                Update Services
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card-body" style={{ padding: `12px` }}>
                                        <form className="text-start" onSubmit={handleSubmit(submitHandler)}>
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
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="btn bg-gradient-primary w-100 my-4 mb-2"
                                                >
                                                    Update Service
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
    )
}
