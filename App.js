import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AddService } from './components/serviceprovider/AddService';
import { ServiceProviderDashboard } from './components/serviceprovider/ServiceProviderDashboard';
import { Myservice } from './components/serviceprovider/Myservice';
import { UserDashboard } from './components/user/UserDashboard';
import { MyBookings } from './components/user/MyBookings';
import { BookService } from './components/user/BookService';
import { Sidebar } from './components/Sidebar';
import { ProtectRoutes } from './components/hook/ProtectRoutes';
import { Update } from './components/serviceprovider/Update';
import { FileUpload } from './components/FileUpload';
import { ServiceProviderProfile } from './components/serviceprovider/ServiceProviderProfile';
import { UserProfile } from './components/user/UserProfile';
import { ServiceProviderReg } from './components/serviceprovider/ServiceProviderReg';
import { UserReg } from './components/user/UserReg';
import { Details } from './components/serviceprovider/Details';
import { ServiceDetails } from './components/user/ServiceDetails';
import { Payment } from './components/user/Payment';
import { DetailBooking } from './components/user/DetailBooking';
import { Logout } from './components/Logout';
import { UpdateUserProfile } from './components/user/UpdateUserProfile';
import { UpdateServiceProviderProfile } from './components/serviceprovider/UpdateServiceProviderProfile';




function App() {
  const path = window.location.pathname;
  console.log(path);
  return (
    <body className="g-sidenav-show   bg-gray-200 ">
      {path === "/" || path === "/login" || path === "/register" || path === "/serviceprovider/register" || path === "/user/register" || path === "" ? null : <Sidebar />}
      
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/serviceprovider/register' element={<ServiceProviderReg />}></Route>
          <Route path='/user/register' element={<UserReg />}></Route>

          <Route element={<ProtectRoutes />}>
            <Route path='/serviceprovider/dashboard' element={<ServiceProviderDashboard />}></Route>
            <Route path='/serviceprovider/addservice' element={<AddService />}></Route>
            <Route path='/serviceprovider/myservice' element={<Myservice />}></Route>
            <Route path='/serviceprovider/update/:id' element={<Update />}></Route>
            <Route path='/serviceprovider/details/:id' element={<Details />}></Route>
            <Route path='/serviceprovider/profile' element={<ServiceProviderProfile />}></Route>
            <Route path='/serviceprovider/profile/update' element={<UpdateServiceProviderProfile />}></Route>
            
           <Route path='/logout' element={<Logout/>} ></Route>
 
            <Route path='/user/dashboard' element={<UserDashboard />}></Route>
            <Route path='/user/mybookings' element={<MyBookings />}></Route>
            <Route path='/user/bookingdetails/:id' element={<DetailBooking />}></Route>
            <Route path='/user/bookservice' element={<BookService />}></Route>
            <Route path='/user/profile' element={<UserProfile />}></Route>
            <Route path='/user/details/:id' element={<ServiceDetails />}></Route>
            <Route path='/payment/:id' element={<Payment/>}></Route>
            <Route path='/user/profile/update' element={<UpdateUserProfile/>}></Route>

            <Route path='/fileupload' element={<FileUpload />}></Route>
          </Route>
        </Routes>
        <>
          <div className="ps__rail-x" style={{ left: 0, bottom: "-938px" }}>
            <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
          </div>
          <div className="ps__rail-y" style={{ top: 938, height: 341, right: 0 }}>
            <div
              className="ps__thumb-y"
              tabIndex={0}
              style={{ top: 251, height: 90 }}
            />
          </div>
        </>

     
    </body>
  );
}

export default App;
