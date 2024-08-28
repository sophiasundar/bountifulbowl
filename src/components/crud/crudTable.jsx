import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API} from '../global.js';
import NavBar from "../navbar/navbar"
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { IoMdPersonAdd } from "react-icons/io";
import { AuthContext } from '../Context/AuthContext';
import bgbanquet from "../bgbanquet.css";


    function CrudTable(){
      const [tableData, setTableData] = useState([])
      const { token } = useContext(AuthContext);
    
      const navigate = useNavigate()
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

      

       

        const handleDelete = async (id) => {
            try {
              const response = await axios.delete(`${API}/crud/foodlist/${id}`,{
                    headers:{
                      Authorization: 'Bearer ' + token
                    }
              });
              if (response.status === 200) {
                setTableData(tableData.filter((item) => item.id !== id)); 
                console.log('Record deleted successfully');
              } else if (response.status === 401){
                
                console.log(" Unauthorized access. Please login again.")
            } else {
                console.error('Deletion failed:', response.statusText);
              }
            } catch (error) {
              console.error('Error during deletion:', error);
            }
       };

      
      
        return(
            <div className="crudlist" >
               <NavBar/>
               
               <div className="addtable">
               <h3 >Manage Banquet Hall Details</h3>

              {/* add banquet hall button */}
               <Button variant="primary" 
                       onClick={()=>{
                        navigate('/addform')
                      }}
               >Add Banquet hall <IoMdPersonAdd size={25}/> 
               </Button>


               </div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Hall Name</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th >Email</th>
                        <th>Food Takein Date</th>
                        <th>Food Takein Time</th>
                        <th>Food List</th>
                        <th>Food Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index)=>(

                      <tr key = {item._id}>
                        <td>{index+1}</td>
                        <td>{item.hallname}</td>
                        <td>{item.name}</td>
                        <td> {item.address}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.foodlist}</td>
                        <td>{item.foodquantity}</td>
                        
                        <td > <div className="edbtn">
                        <Button variant="light">
                        <FaEdit color="green"
                             onClick={()=>{
                              navigate(`/editform/${item._id}`)
                            }}
                            />
                          </Button>{' '}
                           

                        <Button variant="light"
                         
                        > <MdDelete color="red"
                        
                        onClick={() =>{ console.log('Delete button clicked'); handleDelete(item._id)}}
                        /></Button> 
                        </div>    
                        
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>

            </div>
        )
    }

    export default CrudTable