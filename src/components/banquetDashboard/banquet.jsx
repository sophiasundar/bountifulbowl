import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API } from "../global.js";
import BanquetCard from "./banquetCards.jsx";
import NavBar from "../navbar/navbar"
// import { AuthContext } from '../Context/AuthContext.js';
// import { useContext } from 'react';



    function Banquet(){
        const [banquetData, setBanquetData] = useState([])
        // const { isAuthenticated, token }  = useContext(AuthContext);
        
        const getBanquet = () => {
          
          axios.get(`${API}/crud/foodlist`)
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
            
          },[])

        return(

       <div>

         <NavBar/>
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
       </div>
        
       )
    }

    export default Banquet