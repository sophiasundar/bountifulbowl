import {useState} from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdFoodBank } from "react-icons/md";
import { API } from '../global';


function BanquetCard({value, orphanageManagerId}){
    const [show,setShow] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const  [error, setError] = useState(null);

    const toggleSummary ={
        display:show?"block":"none"
    }

    console.log(toggleSummary.display);

    const handleClick = async () => {
        setIsLoading(true);
        setError(null);

        
    try {
      const managerResponse = await fetch(`${API}/orphinfo/${id}`); // Replace with your endpoint
      if (!managerResponse.ok) {
        throw new Error('Error fetching orphanage manager ID');
      }
      const managerData = await managerResponse.json();
      orphanageManagerId = managerData.id;
    } catch (error) {
      console.error('Error fetching orphanage manager ID:', error);
      setError(error.message);
      setIsLoading(false);
      return;
    }
    
        try {
          const response = await fetch(`${API}/agree/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              banquetDetailsId: value._id, 
              orphanageManagerId, 
            }),
          });
    
          if (!response.ok) {
            throw new Error('Error sending email');
          }
    
          console.log('Email sent successfully!');
         
        } catch (error) {
          console.error('Error sending email:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };


    return(
        <>
        
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
                            <div className='bluebtn'>
                            <div >
                            <button
                                onClick={()=>{
                                    setShow(!show)
                                    console.log(show)
                                }}
                            >  {  show?"🔽":"🔼"}
                            </button> 
                        </div>
                        { show? <div  >
                        <ListGroup className="list-group-flush" >
                            <ListGroup.Item><b>Food List</b> {value.foodlist} </ListGroup.Item>
                            
                            </ListGroup>
                            </div>
                            :null}
                             <div  >
                            <button
                                onClick={()=>{
                                    setShow(!show)
                                    console.log(show)
                                }}
                            >  {  show?"🔽":"🔼"}
                            </button> 
                        </div>
                            { show? <div  >
                        <ListGroup className="list-group-flush" >
                            
                            <ListGroup.Item className='quantity'><b>Quantity:</b> {value.foodquantity}</ListGroup.Item>
                            </ListGroup>
                            </div>
                            :null}
                          </div>
                </ListGroup>

               <Card.Body className='list'>
                    
            
                        <Button className="btn1" disabled={isLoading} onClick={handleClick}>
              {isLoading ? 'Sending...' : 'Agree'}
                        agree
                    </Button>
                    {error && <p className="error">{error}</p>}
                </Card.Body>

        </Card>

        </div>


        </>
    )
}

export default BanquetCard