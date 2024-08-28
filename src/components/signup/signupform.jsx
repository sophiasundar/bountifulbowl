// Form.Control
import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from '../global.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


const SignUpForm=()=>{
    const [data, setData] = useState({name:"",email:"",password:"",role:""})
     const [state, setState] = useState("Signup")
     const [validated, setValidated] = useState(false);
     const navigate = useNavigate();

         const handleChange = (event) => {
            const { name, value } = event.target;
            setData({ ...data, [name]: value });
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
      <div className="lcontainer">
         <div className="form">
            <div className="signup">
    
            <Col>
         
         <Form  onSubmit={handleSubmit}>

          <h6   className="svalid" >{validated}</h6>

          <Row xs={2} md={4} lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
      
        <b><Form.Label className='label1'>Name</Form.Label></b>
     
      <Form.Control
                aria-label="Enter Your Name"
                aria-describedby="inputGroup-sizing-sm"
                className='input' type="text" name="name" placeholder="Enter Your Name" 
                onChange={handleChange}
                value={data.name}
                />
      </Form.Group>
          </Row>

         <Row xs={2} md={4} lg={6}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >

        <b><Form.Label className='label1'>Email address</Form.Label></b>
      <Form.Control
                aria-label="Enter Your Email Address"
                aria-describedby="inputGroup-sizing-sm"
                className='input' type="email" name="email" placeholder="Enter Your Email Address" 
          onChange={handleChange}
          value={data.email} 
                />
      </Form.Group>
          </Row>
    
          <Row xs={2} md={4} lg={6}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      
        <b><Form.Label className='label1'>Password</Form.Label></b>
        <Form.Control
                aria-label="Enter Your Password"
                aria-describedby="inputGroup-sizing-sm"
                className='input' type="password" name="password" placeholder="Enter Your Password" 
           onChange={handleChange}
           value={data.password}
                />
      </Form.Group>
      </Row>

      <Row xs={2} md={4} lg={6}>
      <Form.Group  className="mb-3" controlId="formBasicPassword">
         <div className='formlabel'>
        <b><Form.Label className='label1'>Role</Form.Label></b>
        </div>

        <Form.Select className='input' name="role" onChange={handleChange}
           value={data.role} enabled >
          <option value="">Select the Role</option>
          <option value="Banquet-Manager">Banquet-Manager</option>
          <option value="Orphanage-Manager">Orphanage-Manager</option>
        </Form.Select>
        
      </Form.Group>
      </Row>

         </Form>
         <Row className='signbtn'>

      <Button variant="primary" type="submit" className="signbtn1"
         onClick = {handleSubmit}
      
      >{state}</Button>{' '}
       
       
      </Row>
      <div className="plog">
       <h6 >Already have an account ? <Link to="/">Login</Link>  </h6>
         </div>
         </Col>
        
            </div>
         </div>
      </div>
     )
}

export default SignUpForm