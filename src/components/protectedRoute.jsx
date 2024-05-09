import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }){
    const authToken = localStorage.getItem("x-auth-token");
              console.log("localStorage",typeof authToken);
    if(authToken && authToken !== "null" ){
        return <>
            
             { children }
        </>
    }else{
        return <Navigate replace to= '/' />
    }
}