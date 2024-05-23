import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API } from '../global';



export function EditForm(){
    const {id} = useParams();
    const [hall,setHall] = useState();

    useEffect(()=>{

        axios.get(`${API}/crud/foodlist/${id}`)
        .then((res)=>{
            console.log(res.data);
            setHall(res.data);
        })

    },[id]);


     if(hall){
        return <EditHallForm hall={hall} id={id}/>
     }else{
        return "Loading...";
    }

    
}

function EditHallForm({hall, id}){

    const [hallname,setHallName] = useState(hall.hallname)
    const [name,setName] = useState(hall.name)
    const [address,setAddress] = useState(hall.address)
    const [email,setEmail] = useState(hall.email)
    const [date,setDate] = useState(hall.date)
    const [time,setTime] = useState(hall.time)
    const [foodlist,setFoodlist] = useState(hall.foodlist)
    const [foodquantity,setFoodQuantity] = useState(hall.foodquantity) 
    
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        const newDetails ={
           hallname: hallname,
           name: name,
           address:address,
           email: email,
           date: date,
           time:time,
           foodlist:foodlist,
           foodquantity:foodquantity,
        }
        console.log(newDetails)
    

    if(newDetails.hallname === ""){
       setValidated("VALID: Hall Name is required");
       return;
    }else if(newDetails.name === ""){
       setValidated("VALID: Name is required");
       return;
    }else if(newDetails.address === ""){
       setValidated("VALID: Address is required");
       return;
    }else if(newDetails.email === "" ){
       setValidated("VALID: Email is Required and Valid");
       return;
    }else if(newDetails.date === ""){
       setValidated("VALID: Date is required");
       return; 
    }else if(newDetails.time === ""){
       setValidated("VALID: Time is required");
       return;
    }else if(newDetails.foodlist === ""){
       setValidated("VALID: Foodlist is required");
       return;
    }else if(newDetails.foodquantity === ""){
       setValidated("VALID: Food Quantity is required");
       return;
    }else{
       setValidated("")
    }

    const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
         setValidated(true);

        //  if (!isAuthenticated) {
        //   setValidated('Error: You are not authorized to add data.');
        //   return; // Prevent submission if not authenticated
        // }
    

         fetch(`${API}/crud/foodlist/${hall._id}`,{
           method: "PUT",
           body:JSON.stringify(newDetails),
           headers:{
            "Content-Type": "application/json",
            //  Authorization: `Bearer ${token}`
           },
         }).then((data)=>data.json())
         .then(()=>navigate('/banquetcrud'))
        }

    return(
        <div>
        
        <Form>

            <h4 className='titleform' >Add Banquet Hall</h4>

            <h4 className="valid" >{validated}</h4>
                <Form.Group className="mb-3" controlId="hallname">
                    <Form.Label>Hall Name :</Form.Label>
                    <Form.Control className='ph1' type="text" placeholder="Enter The Hall Name"
                            value={hallname}
                            onChange={(e)=>
                            {setHallName(e.target.value)}
                            }    
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name :</Form.Label>
                    <Form.Control className='ph2' type="text" placeholder="Enter The Name" 
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}  
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address :</Form.Label>
                    <Form.Control className='ph3' type="text" placeholder="Enter The Address" 
                        value={address}
                        onChange={(e)=>{
                            setAddress(e.target.value)
                        }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email :</Form.Label>
                    <Form.Control className='ph1' type="text" placeholder="Enter The Email"
                            value={email}
                            onChange={(e)=>
                            {setEmail(e.target.value)}
                            }    
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Food Takein Date :</Form.Label>
                    <Form.Control className='ph8' type="text" placeholder="Enter The Food Takein Date" 
                        value={date}
                        onChange={(e)=>{
                            setDate(e.target.value)
                        }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="time">
                    <Form.Label>Food Takein Time :</Form.Label>
                    <Form.Control className='ph5' type="text" placeholder="Enter The Food Takein Time" 
                            value={time}
                            onChange={(e)=>{
                            setTime(e.target.value)
                            }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="foodlist">
                    <Form.Label>Foodlist :</Form.Label>
                    <Form.Control  className='ph6' type="text" placeholder="Enter The Foodlist" 
                            value={foodlist}
                            onChange={(e)=>{
                            setFoodlist(e.target.value)
                            }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="food quantity">
                    <Form.Label>Food Quantity :</Form.Label>
                    <Form.Control className='ph7' type="text" placeholder="Enter The Food Quantity" 
                        value={foodquantity}
                        onChange={(e)=>{
                            setFoodQuantity(e.target.value)
                        }} 
                    />
                </Form.Group>

                
                <h6 className="valid" >{validated}</h6>
                
                <div className='addbtn'>

                <Button  className='addbtn1' variant="primary"
                            onClick={handleSubmit}
                >
                    Submit
                </Button>

                <Button className='addbtn2' variant="primary"
                            onClick={()=>{
                                navigate('/banquetcrud')
                            }}
                >
                    Back
                </Button>
                </div>
            </Form>

        </div>
    )
}

