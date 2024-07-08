import NavBar from "../navbar/navbar";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API } from "../global.js";
import OrphCard from "./orphanageCards.jsx";




   function OrphanInfo(){
    const [ orphData, setOrphData] = useState([])

    const getOrphInfo = async () => {
          try{
            const token = localStorage.getItem('x-auth-token');
            const res = await axios.get(`${API}/orphinfo`,{
                headers:{
                  Authorization: 'Bearer ' + token 
                }
              });
              
              if(res.status === 200){
                console.log('Orphanage data fetched successfully');
                setOrphData(res.data);
            } else if (res.status === 401){
              console.log(" Unauthorized access. Please login again.")
          }

          }catch(error){
            console.error('Error fetching data:', error);
          }
        
      };

        useEffect(()=>{
         
            getOrphInfo();
          
        },[])
       
    return(
        <div>
        <NavBar/>
        <h3 className='hall'>Orphanage Details</h3>
          {
             orphData.map((item)=>{
                return(
                    <>
                       <OrphCard key={item._id} value={item}/>
                    </>
                )
             })
          }
        
        
        </div>
    )
   }

   export default OrphanInfo