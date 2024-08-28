import NavBar from "../navbar/navbar";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API } from "../global.js";
import OrphCard from "./orphanageCards.jsx";
import { AuthContext } from "../Context/AuthContext.js";
import Button from 'react-bootstrap/Button';
import { IoMdPersonAdd } from "react-icons/io";
import bgbanquet from "../bgbanquet.css";

   function OrphanInfo(){
    const [ orphData, setOrphData] = useState([])
    const { token } = useContext(AuthContext);

    const navigate = useNavigate()

    const getOrphInfo = async () => {
          try{
            
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
          },[]);

          const handleDelete = async (id) =>{
           try{
               const res = await axios.delete(`${API}/orphinfo/${id}`,{
                headers:{
                  Authorization: 'Bearer ' + token
                }
               });
               if(res.status === 200){
                console.log('Banquet data fetched successfully');
                getOrphInfo();
            } else if (res.status === 401){
              console.log(" Unauthorized access. Please login again.")
          }
               
           }catch (error){
            console.error('Error fetching data:', error);
           }
            
         }

        
       
    return(
        <div className="banquet">
        <NavBar/>

        <Button className='addinfo' variant="primary" 
                       onClick={()=>{
                        navigate('/addorphinfo')
                      }}
               >Add Orphanage Info <IoMdPersonAdd size={25}/> 
               </Button>

        <h3 className='hall'>Orphanage Details</h3>
          {
             orphData.map((item)=>{
                return(
                    <>
                       <OrphCard key={item._id} value={item} handleDelete={()=>handleDelete(item._id)}/>
                    </>
                )
             })
          }
        
        
        </div>
    )
   }

   export default OrphanInfo