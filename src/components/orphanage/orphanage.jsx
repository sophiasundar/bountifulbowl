import NavBar from "../navbar/navbar";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API } from "../global.js";
import OrphCard from "./orphanageCards.jsx";




   function OrphanInfo(){
    const [ orphData, setOrphData] = useState([])

    const getOrphInfo = () => {
          
        axios.get(`${API}/orphinfo`)
        .then((res)=>{
            if(res.status === 401){
                console.log(" Data Not Found ! ")
            }
            console.log(res.data);
            
          setOrphData(res.data);
            })
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