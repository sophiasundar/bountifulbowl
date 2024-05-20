import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API } from "../global.js";
import BanquetCard from "./banquetCards.jsx";
import NavBar from "../navbar/navbar"
import { AuthContext } from '../Context/AuthContext.js';
import { useContext } from 'react';



    function Banquet(){
        const [banquetData, setBanquetData] = useState([])
        const { isAuthenticated, token }  = useContext(AuthContext);
        
        const getBanquet = async () => {
          try {
            const response = await axios.get(`${API}/crud/foodlist`, {
              headers: {
                Authorization: token ? `Bearer ${token}` : '', 
              },
            });
            setBanquetData(response.data);
          } catch (error) {
            console.error('Error fetching banquet data:', error);
          }
        };

          useEffect(()=>{
            if (isAuthenticated) {
              getBanquet();
            }
          },[isAuthenticated])

        return(

       <div>

         <NavBar/>

         {
            banquetData.map((item)=>{
                   return(
                        <>
                          <BanquetCard  key={item._id} value={item}/>
                        </>
                   )
            })
         }
       </div>
        
       )
    }

    export default Banquet