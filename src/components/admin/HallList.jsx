import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {API} from '../global.js';
import Table from 'react-bootstrap/Table';
import { AuthContext } from '../Context/AuthContext';
// import bgbanquet from "../bgbanquet.css";


    const HallList = () => {
      const [tableData, setTableData] = useState([])
      const { token } = useContext(AuthContext);
    
      
      const getTable= async () => {


        try{
          
          const res = await axios.get(`${API}/crud/foodlist`,{
            headers:{
              Authorization: 'Bearer ' + token 
            }
          });

          if(res.status === 200){
              console.log('Banquet data fetched successfully');
              setTableData(res.data);
          } else if (res.status === 401){
            console.log(" Unauthorized access. Please login again.")
        }

        }catch(error){
          console.error('Error fetching data:', error);
        }
        
      };

        useEffect(()=>{
         getTable()
          
        },[]);
      
      
        return(
            <div className="crudlist" >
               <div className="addtable">
               <h3 className="halllist" >Hall avaliability Lists</h3>

               </div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Hall Name</th>
                        <th>Name</th>
                        <th>Food Takein Date</th>
                        <th>Food List</th>
                        <th>Food Quantity</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index)=>(

                      <tr key = {item._id}>
                        <td>{index+1}</td>
                        <td>{item.hallname}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.foodlist}</td>
                        <td>{item.foodquantity}</td>
                    
                      </tr>
                    ))}
                    </tbody>
                  </Table>

            </div>
        )
    }

    export default HallList