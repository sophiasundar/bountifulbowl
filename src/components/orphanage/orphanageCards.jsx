import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FcHome } from "react-icons/fc";

    function OrphCard({value}){


        return(
            <>
               <div className='cardContainer' >

            
 
                    <Card className='or' >


                    <Card.Title className="title" ><b>{value.Orphanagename}</b> <FcHome size={40}/> </Card.Title>

                    <ListGroup className="list-group-flush" >
                                    <ListGroup.Item> <b>Hall Name  :  </b> {value.Orphanagename} </ListGroup.Item>
                                        <ListGroup.Item> <b>Name  :  </b> {value.name} </ListGroup.Item>
                                        <ListGroup.Item> <b>Address  :  </b> {value.address} </ListGroup.Item>
                                        <ListGroup.Item><b>Email : </b> {value.email}</ListGroup.Item>
                                        
                            </ListGroup>

                        <Card.Body className='list'>
                                
                        
                                 
                            </Card.Body>

                    </Card>

                    </div>

            </>
        )
    }
    export default OrphCard