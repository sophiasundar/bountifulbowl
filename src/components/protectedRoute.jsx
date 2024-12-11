import { Navigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AuthContext } from "./Context/AuthContext.js";

export function ProtectedRoute({ children, allowedRoles }){
      const { isAuthenticated, role } = useContext(AuthContext);

      console.log('isAuthenticated:', isAuthenticated);
  console.log('role:', role);
      
      if(!isAuthenticated){
         return <Navigate to= '/' replace />;
      }

      if(!allowedRoles.includes(role)){
          return <Navigate to='/notauthorise' replace/>
      }

      return <>
           {children}
      </>
         
}



