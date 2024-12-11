import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import { AuthContext, AuthProvider } from "../Context/AuthContext.js";
import { Link } from 'react-router-dom';



const LogIn=()=>{

   
    const [credent, setCredent] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const [state,setState] = useState('login');
    const [error,setError] = useState('');
    const [validated,setValidated] = useState(false);
  

    const navigate = useNavigate();


     
         
      const handleSubmit = async (e)=>{
          setState("Submitting...")
          e.preventDefault();

          if(credent.email===""){
            setValidated("Email is required and valid");
            return;
        }else if(credent.password==="" || credent.password.length < 4){
            setValidated("Password is required and more than 5 chr");
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
              
                const success = await login(credent);
                if (success) {
                  navigate("/home");
                } else {
                  setState(""); // Reset the state if login failed
                  setError("Invalid username or password.");
                }
            
        }catch(err){
            console.error("Login error:", err);
            setState("");
            setError('An error occured. Please try again later.');
        } 
    };

      return(
        <>
         

         
            <AuthProvider>
               
           <div className="scontainer">
          
                <div className="form">
                    <div className="login">
                
               
                <div className="figdiv">
             <Figure className="fig">
                <Figure.Image
                alt="authImage"
                src="https://th.bing.com/th/id/R.87e87fa8cb1c4d332a64470d5c3acd89?rik=vuWahGaWKYN5CQ&riu=http%3a%2f%2fdli-eduventure.um.ac.id%2fassets%2fimg%2flogin.png&ehk=hPJNQY6rdxBzsCPJa9ahwTJgf6KEPNQdNr1lfqo1NTk%3d&risl=&pid=ImgRaw&r=0"
                />

                </Figure>
                </div>
                    
                

                <Form onSubmit={handleSubmit}  >
               {error&&<div className="error-message">{error}</div>} 
                
                <h6 className="svalid">{validated}</h6>

                <Row xs={2} md={4} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <b><Form.Label className="label">Email address</Form.Label></b>
                <Form.Control className="input2"
                aria-label="Enter Your Email Address"
                placeholder="Enter Your Email Address"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => setCredent({...credent, email: e.target.value})}
                value={credent.email}
                />

                </Form.Group>
                </Row>

                <Row xs={2} md={4} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <b><Form.Label className="label">Password</Form.Label></b>

                <Form.Control className="input2"
                aria-label="Enter Your Password"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Enter Your Password"
                type="password"
                onChange={(e) => setCredent({...credent, password: e.target.value})}
                value={credent.password}
                />

                </Form.Group>
                </Row>

                

                </Form>
                
                <Button variant="primary" type="submit" className="loginbtn"
                onClick = {(e)=>handleSubmit(e)}
                >{state}</Button>{' '}
                <Row >



                <div>
                <h6 className="label">Not have an account? Just <Link to="/signup">SignUp</Link> </h6>
                </div>

               
                </Row>
                
                </div>

        
                

                </div>

                </div>
                </AuthProvider>

        </>
      )

}

export default LogIn