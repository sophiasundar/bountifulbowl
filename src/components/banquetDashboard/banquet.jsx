import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API } from "../global.js";
import BanquetCard from './banquetCards.jsx';
import NavBar from "../navbar/navbar";
// import bgbanquet from "../bgbanquet.css";



    function Banquet(){
        const [banquetData, setBanquetData] = useState([])
       

        const getBanquet = async () => {
         
          try{
            const token = localStorage.getItem('x-auth-token');
            const res = await axios.get(`${API}/crud/foodlist`,{
              headers:{
                Authorization: 'Bearer ' + token 
              }
            });

            if(res.status === 200){
                console.log('Banquet data fetched successfully');
                setBanquetData(res.data);
            } else if (res.status === 401){
              console.log(" Unauthorized access. Please login again.")
          }

          }catch(error){
            console.error('Error fetching data:', error);
          }
          
        };

          useEffect(()=>{
           
              getBanquet();
            
          },[]);

        return(

       <div className='banquet'>

         <NavBar/>
        
         <h3 className='hall'>Banquet Hall Details</h3>
         {/* <p className='hall'>Description</p> */}

         <div className='bancard-container'>

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
        
       </div>
       )
    }

    export default Banquet