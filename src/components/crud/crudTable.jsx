import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API} from '../global.js';
import NavBar from "../navbar/navbar"
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { IoMdPersonAdd } from "react-icons/io";





    function CrudTable(){
      const [tableData, setTableData] = useState([])
      
    
      const navigate = useNavigate()
      const getTable= () => {
          
        axios.get(`${API}/crud/foodlist`)
        .then((res)=>{
            if(res.status === 401){
                console.log(" Data Not Found ! ")
            }
            console.log(res.data);
            
          setTableData(res.data);
          
            })
      };

        useEffect(()=>{
         getTable();
          
        },[]);

      

       

        const handleDelete = async (id) => {
            try {
              // console.log('Deleting item:', id);
              const response = await axios.delete(`${API}/crud/foodlist/${id}`);
              if (response.status === 200) {
                setTableData(tableData.filter((item) => item.id !== id)); 
                console.log('Record deleted successfully');
              } else {
                console.error('Deletion failed:', response.statusText);
              }
            } catch (error) {
              console.error('Error during deletion:', error);
            }
       };

      //  const handleAddForm = () => {
      //   setShowAddForm(!showAddForm)
      //  }
      
        return(
            <div >
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