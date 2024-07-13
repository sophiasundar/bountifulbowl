import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API } from '../global';
import { AuthContext } from '../Context/AuthContext';


export function EditForm(){
    const {id} = useParams();
    const [hall,setHall] = useState();
    const { token } = useContext(AuthContext);

    useEffect(()=>{
       
        axios.get(`${API}/crud/foodlist/${id}`,{
            headers:{
                Authorization: 'Bearer ' + token 
              }
        })
        .then((res)=>{
            console.log(res.data);
            setHall(res.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
             console.error('Unauthorized request! Please check your authentication credentials.');
            } else {
               console.error('Error:', error);
            }  
          })

    },[token,id]);


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
    const { token } = useContext(AuthContext);
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

        

         axios.put(`${API}/crud/foodlist/${hall._id}`,newDetails,{
           headers:{
              Authorization: `Bearer ${token} `
           },
         }).then((data)=>data.json())
            .catch(error => {
            if (error.response && error.response.status === 401) {
             console.error('Unauthorized request! Please check your authentication credentials.');
            } else {
               console.error('Error:', error);
            }  
          })
         .then(()=>navigate('/banquetcrud'))
        }

    return(
        <div className='editform'>
        
        <Form>

            <h4 className='hall' >Edit Banquet Hall</h4>

            <h4 className="valid" >{validated}</h4>
                <Form.Group className="mb-3" controlId="hallname">
                    <Form.Label className="lab"><b>Hall Name :</b></Form.Label>
                    <Form.Control className='input3' type="text" placeholder="Enter The Hall Name"
                            value={hallname}
                            onChange={(e)=>
                            {setHallName(e.target.value)}
                            }    
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="lab"><b>Name :</b></Form.Label>
                    <Form.Control className="input3" type="text" placeholder="Enter The Name" 
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}  
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label className="lab"><b>Address :</b></Form.Label>
                    <Form.Control className="input3" type="text" placeholder="Enter The Address" 
                        value={address}
                        onChange={(e)=>{
                            setAddress(e.target.value)
                        }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="lab"><b>Email :</b></Form.Label>
                    <Form.Control className='input3' type="text" placeholder="Enter The Email"
                            value={email}
                            onChange={(e)=>
                            {setEmail(e.target.value)}
                            }    
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                    <Form.Label className="lab"><b>Food Takein Date :</b></Form.Label>
                    <Form.Control className="input3" type="text" placeholder="Enter The Food Takein Date" 
                        value={date}
                        onChange={(e)=>{
                            setDate(e.target.value)
                        }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="time">
                    <Form.Label className="lab"><b>Food Takein Time :</b></Form.Label>
                    <Form.Control className='input3' type="text" placeholder="Enter The Food Takein Time" 
                            value={time}
                            onChange={(e)=>{
                            setTime(e.target.value)
                            }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="foodlist">
                    <Form.Label className="lab"><b>Foodlist :</b></Form.Label>
                    <Form.Control  className='input3' type="text" placeholder="Enter The Foodlist" 
                            value={foodlist}
                            onChange={(e)=>{
                            setFoodlist(e.target.value)
                            }} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="food quantity">
                    <Form.Label className="lab"><b>Food Quantity :</b></Form.Label>
                    <Form.Control className='input3' type="text" placeholder="Enter The Food Quantity" 
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

