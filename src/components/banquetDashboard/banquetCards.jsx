import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function BanquetCard({value}){
  


    return(
        <>
        
        <div className='cardContainer' >
 
        <Card className='card' >

        
        <Card.Title className="title" ><b>{value.hallname}</b></Card.Title>
            
        <ListGroup className="list-group-flush" >
                            <ListGroup.Item> <b>Name  :  </b> {value.name} </ListGroup.Item>
                            <ListGroup.Item> <b>Address  :  </b> {value.address} </ListGroup.Item>
                            <ListGroup.Item><b>Email : </b> {value.email}</ListGroup.Item>
                            <ListGroup.Item><b>Date Of Food Takein</b> {value.date}</ListGroup.Item>
                            <ListGroup.Item><b>Time Of Food Takein</b> {value.time} </ListGroup.Item>
                            <ListGroup.Item><b>Food List</b> {value.foodlist} </ListGroup.Item>
                            <ListGroup.Item><b>Food Quantity:</b> {value.foodquantity}</ListGroup.Item>
                </ListGroup>

               <Card.Body className='list'>
                    
            
                        <Button className="btn1" >
                      agree
                    </Button>
                </Card.Body>

        </Card>

        </div>


        </>
    )
}

export default BanquetCard