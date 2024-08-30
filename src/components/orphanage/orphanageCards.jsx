import React from 'react';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FcHome } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

    function OrphCard({value,handleDelete}){
        
        const navigate = useNavigate();
      
        return(
            <>
               <div className='cardContainer' >

            
 
                    <Card className='card' >


                    <Card.Title className="title" ><b>{value.orphanagename}</b> <FcHome size={40}/> </Card.Title>

                    <ListGroup className="list-group-flush" >
                                    <ListGroup.Item> <b>Orphanage Name  :  </b> {value.orphanagename} </ListGroup.Item>
                                        <ListGroup.Item> <b>Name  :  </b> {value.name} </ListGroup.Item>
                                        <ListGroup.Item> <b>Address  :  </b> {value.address} </ListGroup.Item>
                                        <ListGroup.Item><b>Email : </b> {value.email}</ListGroup.Item>
                                        
                            </ListGroup>

                            <div className='button'>
                        <Button className="btn1" >
                          <MdEdit
                              onClick={()=>{
                                navigate(`/editorphinfo/${value._id}`)
                              }}
                            />  
                        </Button>
                        <Button variant="contained" className="btn2" >
                          <MdDelete
                               onClick={()=>handleDelete(value.id)}
                            /> 
                        </Button>
                    </div>

                    </Card>

                    </div>

            </>
        )
    }
    export default OrphCard