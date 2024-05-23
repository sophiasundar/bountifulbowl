import { Navigate } from "react-router-dom";
import React from 'react';
// import { AuthContext } from "./Context/AuthContext";

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

// export function ProtectedRoute({ children }) {
//     const { isAuthenticated } = useContext(AuthContext); // Access token through context
  
//     if (!isAuthenticated) {
//       return <Navigate replace to='/' />;
//     }
  
//     return <>
//       {children}
//     </>
//   }
