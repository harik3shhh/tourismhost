import {useState, useEffect} from "react"
import { useAuth } from "../context/auth"; 
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";


export default function AdminRoute(){
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(()=> {
        const url = "https://tourismhost-ubpc.vercel.app/api/auth/admin-auth";
        const authCheck = async()=>{
            const res = await fetch(url, {
                method: "GET",
                headers:{
                    "Authorization": auth?.token
                }
            })
            if(res.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }

        if(auth?.token) authCheck()
    }, [auth?.token]);

    return ok ? <Outlet/> : <Spinner path="" />;
}

