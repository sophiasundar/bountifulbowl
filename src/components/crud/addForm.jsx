import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API } from '../global.js';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext.js';



function AddForm({setTableData }){
  
    const { token } = useContext(AuthContext);
    const [hallname,setHallName] = useState("")
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
    const [email,setEmail] = useState("")
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [foodlist,setFoodlist] = useState("")
    const [foodquantity,setFoodQuantity] = useState("") 
    
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

        
         axios.post(`${API}/crud/foodlist`, newDetails, {
           headers:{
              Authorization: `Bearer ${token} `
          }
           })
         .then((res)=>{
           setTableData(res.data);
           console.log(res.data)
         })
         .catch(error => {
          if (error.response && error.response.status === 401) {
           console.error('Unauthorized request! Please check your authentication credentials.');
          } else {
             console.error('Error:', error);
          }  
        })
         .then(()=>navigate('/banquetcrud'));
    }

    return(
        <div className='editform'>
             
             <Form>

              <h4 className='hall' >Add Banquet Hall</h4>

                <h4 className="valid" >{validated}</h4>
                    <Form.Group className="mb-3" controlId="hallname">
                        <Form.Label className='input3'><b>Hall Name :</b></Form.Label>
                        <Form.Control className="lab"  type="text" placeholder="Enter The Hall Name"
                              value={hallname}
                              onChange={(e)=>
                                {setHallName(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className='input3'><b>Name :</b></Form.Label>
                        <Form.Control className="lab" type="text" placeholder="Enter The Name" 
                             value={name}
                             onChange={(e)=>{
                               setName(e.target.value)
                             }}  
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label className='input3'><b>Address :</b></Form.Label>
                        <Form.Control className="lab" type="text" placeholder="Enter The Address" 
                            value={address}
                            onChange={(e)=>{
                              setAddress(e.target.value)
                            }} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className='input3'><b>Email :</b></Form.Label>
                        <Form.Control className="lab" type="text" placeholder="Enter The Email"
                              value={email}
                              onChange={(e)=>
                                {setEmail(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label className='input3'><b>Food Takein Date :</b></Form.Label>
                        <Form.Control className="lab" type="text" placeholder="Enter The Food Takein Date" 
                             value={date}
                             onChange={(e)=>{
                               setDate(e.target.value)
                             }} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="time">
                        <Form.Label className='input3'><b>Food Takein Time :</b></Form.Label>
                        <Form.Control className="lab" type="text" placeholder="Enter The Food Takein Time" 
                              value={time}
                              onChange={(e)=>{
                                setTime(e.target.value)
                              }} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="foodlist">
                        <Form.Label className='input3'><b>Foodlist :</b></Form.Label>
                        <Form.Control  className="lab" type="text" placeholder="Enter The Foodlist" 
                              value={foodlist}
                              onChange={(e)=>{
                                setFoodlist(e.target.value)
                              }} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="food quantity">
                        <Form.Label className='input3'><b>Food Quantity :</b></Form.Label>
                        <Form.Control className="lab" type="text" placeholder="Enter The Food Quantity" 
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
                        Add BanquetHall
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

export default AddForm