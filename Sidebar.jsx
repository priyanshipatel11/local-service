import React from 'react'
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const path = window.location.pathname;
    const ServiceProviderLinks = [
        {
            name: "ServiceProvider Dashboard",
            link: "/serviceprovider/dashboard",
            icon: "dashboard"
        },
        {
            name: "Add Service",
            link: "/serviceprovider/addservice",
            icon: "add_circle_outline"
        },
        {
            name: "My Service",
            link: "/serviceprovider/myservice",
            icon: " import_contacts"
        },
        {
            name: "Profile",
            link: "/serviceprovider/profile",
            icon: "person"
        },
        {
            name : "Sign Out",
            link : "/logout",
            icon : "login"
        }
    ];
    const userLinks = [
        {
            name: "User Dashboard",
            link: "/user/dashboard",
            icon: "dashboard"
        },
        {
            name: "Book Service",
            link: "/user/bookservice",
            icon: "add_circle_outline"
        },
        {
            name: "My Bookings",
            link: "/user/mybookings",
            icon: "import_contacts"
        },
        {
            name: "Profile",
            link: "/user/profile",
            icon: "person"
        },
        {
            name : "Sign Out",
            link : "/logout",
            icon : "login"
        }
    ]
    return (
        <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-4 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
            <div class="sidenav-header bg-gradient-primary">
                <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <img src="../assets/img/Local_Service.png"  alt="main_logo" style={{height:`85%`, marginLeft:`35px`}} className='me-1 mt-1 mb-2 img-fluid'/>
            </div>
            <hr class="horizontal light mt-0 mb-2" />
            <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    {path.includes("serviceprovider")
                        ? ServiceProviderLinks.map((serpro) => {
                            return (
                                <li class="nav-item">
                                    <Link className="nav-link text-white" to={serpro.link}>
                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">{serpro.icon}</i>
                                        </div>
                                        <span class="nav-link-text ms-1">{serpro.name}</span>
                                    </Link>
                                </li>
                            );
                        })
                        : userLinks.map((user) => {
                            return (
                                <li class="nav-item">
                                    <Link className="nav-link text-white" to={user.link}>
                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">{user.icon}</i>
                                            <span class="nav-link-text ms-1">{user.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>

        </aside>
    )
}
