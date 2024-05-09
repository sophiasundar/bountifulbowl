// Form.Control
import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from '../global.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const SignUpForm=()=>{
    const [data, setData] = useState({name:"",email:"",password:"",role:""})
     const [state, setState] = useState("Signup")
     const [validated, setValidated] = useState(false);
     const navigate = useNavigate();

     const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) =>{
      setState("Submitting...")
      e.preventDefault();

      if(data.name===""){
         setValidated("Name is required and valid");
         return;
     }else if(data.email === ""){
        setValidated("email is required and valid");
        return;
    }else if(data.password === "" || data.password.length < 4){
        setValidated("password is required and more than 5 chr");
        return;
    }else if(data.role===""){
      setValidated("Role is valid, Enter Banquet-Manager or Orphanage-Manager");
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

      try{
           
         const response = await fetch(`${API}/users/signup`, {
            method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json",
              }
         });
         if (response.ok) {
            alert('Email Submitted!')
            navigate("/");
        } else {
            alert('Email Already Exists!')
            navigate("/");
        }
      }catch(error){
         console.error('error:',error);
              setState("");
      }
   }
     return(
      <div className="scontainer">
         <div className="form">
            <div className="signup">
    
            <Col>
         
         <Form  onSubmit={handleSubmit}>

         <Row xs={2} md={4} lg={6}>
         <h3 className="h3sign" style={{color:"black"}}>Create Account</h3>
          </Row>
          <h6   className="svalid" >{validated}</h6>

          <Row xs={2} md={4} lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
      <div className='formlabel'>
        <b><Form.Label>Name</Form.Label></b>
      </div>
   
        <input className='input' type="text" name="name" placeholder="Enter Your Name" 
          onChange={handleChange}
          value={data.name}
          
        required />
      </Form.Group>
          </Row>

         <Row xs={2} md={4} lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
      <div className='formlabel'>
        <b><Form.Label>Email address</Form.Label></b>
      </div>
   
        <input className='input' type="email" name="email" placeholder="Enter Your Email Address" 
          onChange={handleChange}
          value={data.email}
          
        required />
      </Form.Group>
          </Row>
    
          <Row xs={2} md={4} lg={6}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <div className='formlabel'>
        <b><Form.Label>Password</Form.Label></b>
        </div>
        <input className='input' type="password" name="password" placeholder="Enter Your Password" 
           onChange={handleChange}
           value={data.password}

        required/>
      </Form.Group>
      </Row>

      <Row xs={2} md={4} lg={6}>
      <Form.Group  className="mb-3" controlId="formBasicPassword">
         <div className='formlabel'>
        <b><Form.Label>Role:Type Banquet-Manager or Orphanage-Manager</Form.Label></b>
        </div>
        <input className='input' type="text" name="role" placeholder="Enter Your Role:" 
           onChange={handleChange}
           value={data.role}

        required/>
      </Form.Group>
      </Row>

         </Form>
         <Row className='signbtn'>

      <Button variant="primary" type="submit" className="signbtn1"
         onClick = {handleSubmit}
      
      >{state}</Button>{' '}

         <Button className='signbtn2' variant="primary"
                                 onClick={()=>{
                                    navigate('/')
                                 }}
                     >
                        back
                     </Button>


      </Row>
         </Col>
         
            </div>
         </div>
      </div>
     )
}

export default SignUpForm