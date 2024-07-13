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
         
   //   const [authToken , setAuthToken] = useState(localStorage.getItem("x-auth-token"));
   //   const [userRole,setUserRole] = useState(localStorage.getItem("user-role"));
     

   //   useEffect(()=>{
   //        const fetchUserRole = async () =>{
   //           if(authToken){
   //              try{
   //                  const response = await fetch(`${API}/users/login`,{
   //                      method: "POST",
   //                       headers: {
   //                          Authorization: `Bearer ${authToken}`,
   //                      }   
   //              });

   //                   if(!response.ok){
   //                      throw new Error('Falied to fetch user role');
   //                   } 
   //                   const data = await response.json();
   //                   setUserRole(data.role);
   //                   setAuthToken(data.token);
   //              }catch(error){
   //                  console.log('Error fetching user role:', error);
   //              }
   //           }
   //           };
   //           fetchUserRole();

   //   }, [authToken]);
     
   //   if(!authToken){
   //        return <Navigate replace to= '/' />;
   //   }

   //   if(!userRole || !requiredRoles.includes(userRole)){
   //      return <Navigate replace to= '/unauthorized' />;
   //   }

   //   return <>
            
   //          { children }
   //         </>
}



