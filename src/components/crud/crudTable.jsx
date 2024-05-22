import { useState, useEffect } from "react";
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
      let rowNumber = 1;

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
          
        },[])
      
        return(
            <div >
               <NavBar/>
               <div className="addtable">
               <h3 >Manage Banquet Hall Details</h3>
               <Button variant="primary" >Add Banquet hall <IoMdPersonAdd size={25} /> </Button>
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
                      {tableData.map((item)=>(
                      <tr key = {item.id}>
                        <td>{rowNumber++}</td>
                        <td>{item.hallname}</td>
                        <td>{item.name}</td>
                        <td> {item.address}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.foodlist}</td>
                        <td>{item.foodquantity}</td>
                        <td > <div className="edbtn"> <Button className="ed" variant="light" 
                        
                        ><FaEdit color="green"/></Button> 

                        <Button variant="light"
                        
                        ><MdDelete color="red"/></Button> 
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