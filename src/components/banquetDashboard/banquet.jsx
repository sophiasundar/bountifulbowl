import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { API } from "../global.js";
import BanquetCard from "./banquetCards.jsx";
import NavBar from "../navbar/navbar"
import { AuthProvider } from '../Context/AuthContext.js';
import { AuthContext } from '../Context/AuthContext.js';



    function Banquet(){
        const [banquetData, setBanquetData] = useState([])
        const { token, isAuthenticated } = useContext(AuthContext); 
        const headers ={
          'authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }

        const getBanquet = () => {

          if (!isAuthenticated) {
            
            return; 
          }
          
          axios.get(`${API}/crud/foodlist`,{ headers })
          .then((res)=>{
              if(res.status === 401){
                  console.log(" Data Not Found ! ")
              }
              console.log(res.data);
              
            setBanquetData(res.data);
              })
        };

          useEffect(()=>{
           
              getBanquet();
            
          },[]);

        return(

       <div>

         <NavBar/>
         <AuthProvider>
         <h3 className='hall'>Banquet Hall Details</h3>

         {
            banquetData.map((item)=>{
                   return(
                        <>
                          <BanquetCard  key={item._id} value={item}/>
                        </>
                   )
            })
         }
         </AuthProvider>
       </div>
        
       )
    }

    export default Banquet