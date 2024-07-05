import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { API } from './global.js'

export function ProtectedRoute({ children, requiredRoles }){
     const [authToken , setAuthToken] = useState(localStorage.getItem("x-auth-token"))
     const userRole = localStorage.getItem("user-role");
     const [role,setRole] = useState(userRole);
          
     useEffect(()=>{
          const fetchUserRole = async () =>{
             if(authToken){
                try{
                    const response = await fetch(`${API}/users/login`,{
                        method: "POST",
                          body: JSON.stringify(data),
                         headers: {
                            Authorization: `Bearer ${authToken}`,
                        }   
                });

                     if(!response.ok){
                        throw new Error('Falied to fetch user role');
                     } 
                     const data = await response.json();
                     setRole(localStorage.getItem("user-role"))
                     setAuthToken(data.token)
                }catch(error){
                    console.log('Error fetching user role:', error);
                }
             }
             };
             fetchUserRole();

     }, [authToken]);
     
     if(!authToken){
          return <Navigate replace to= '/' />;
     }

     if(!role || !requiredRoles.includes(role)){
        return <Navigate replace to= '/unauthorized' />;
     }

     return <>
            
            { children }
           </>
}

// export function ProtectedRoute({ children }){
//     const authToken = localStorage.getItem("x-auth-token");
//               console.log("localStorage",typeof authToken);
//     if(authToken && authToken !== "null" ){
//         return <>
            
//              { children }
//         </>
//     }else{
//         return <Navigate replace to= '/' />
//     }
// }

