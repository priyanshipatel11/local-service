import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import { Login } from "../Login";

const useAuth = () => {
    const [isAuthenticate,setisAuthenticated] = useState(false);

    useEffect (() =>{
        if(localStorage.getItem("id") != null){
            setisAuthenticated(true);
        }
    },[]);
    return isAuthenticate;
}

export const ProtectRoutes = () => {
    const auth = useAuth();
    console.log("auth....",auth);

    return auth == true ? <Outlet/> : <Login/>;
}