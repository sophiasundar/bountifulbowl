
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdFoodBank } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
// import { AuthProvider } from '../Context/AuthContext';


function BanquetCard({ value }){
    
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate()

    const handleClick = () =>{
        setSelected(true);
    }
    
    return(
        <>
         {/* <AuthProvider> */}

         <div className={`banquet-card ${selected ? 'selected' : ''}`} onClick={handleClick} >
        <div className='cardContainer' >

            
 
        <Card className='card' >

        
        <Card.Title className="title" ><b>{value.hallname}</b> <MdFoodBank color="brown" size={40}/></Card.Title>
        
        <ListGroup className="list-group-flush" >
                         <ListGroup.Item> <b>Hall Name  :  </b> {value.hallname} </ListGroup.Item>
                            <ListGroup.Item> <b>Name  :  </b> {value.name} </ListGroup.Item>
                            <ListGroup.Item> <b>Address  :  </b> {value.address} </ListGroup.Item>
                            <ListGroup.Item><b>Email : </b> {value.email}</ListGroup.Item>
                            <ListGroup.Item><b>Date Of Food Takein</b> {value.date}</ListGroup.Item>
                            <ListGroup.Item><b>Time Of Food Takein</b> {value.time} </ListGroup.Item>
                            <ListGroup.Item><b>Food List</b> {value.foodlist} </ListGroup.Item>
                            {selected && (
                            <ListGroup.Item className='quantity'> {value.foodquantity}</ListGroup.Item>
                            )}

                            <div >
                            
                            
                        
                            
                           
 
                    <Card.Body className='list'>
                    
                  
                    
                    <Button className='btn1' variant='primary'
                       onClick={()=>{
                        navigate(`/sendemail`)
                      }}
                    >
                     Send Email       
                    
                </Button>
                <p className="takein">Note: Check the Given time and take the food before get wasted</p>
            </Card.Body>
      
                            
                             
                       </div>     
                          
                </ListGroup>

               

        </Card>

        </div>
        </div>

        {/* </AuthProvider> */}
        </>
    )
}

export default BanquetCard