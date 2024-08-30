import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API } from '../global.js';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext.js';



function AddOrphForm({setOrphData}){
     
    const { token } = useContext(AuthContext);
    const [orphanagename, setorphanagename] = useState("");
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
    const [email,setEmail] = useState("")
 
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        const newInfo ={
           orphanagename:orphanagename,
           name: name,
           address:address,
           email: email,
        }
        console.log(orphanagename)
        console.log(newInfo) 

        if(newInfo.orphanagename === ""){
            setValidated("VALID: Orphanage Name is required");
            return;
         }else if(newInfo.name === ""){
            setValidated("VALID: Name is required");
            return;
         }else if(newInfo.address === ""){
            setValidated("VALID: Address is required");
            return;
         }else if(newInfo.email === "" ){
            setValidated("VALID: Email is Required and Valid");
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

          axios.post(`${API}/orphinfo/`, newInfo, {
            headers:{
               Authorization: `Bearer ${token} `
           }
            })
          .then((res)=>{
            setOrphData(res.data);
            console.log(res.data)
          })
          .catch(error => {
           if (error.response && error.response.status === 401) {
            console.error('Unauthorized request! Please check your authentication credentials.');
           } else {
              console.error('Error:', error);
           }  
         })
          .then(()=>navigate('/orphanagedashboard'));
    }

    return(
        <div className='editform'>
             
             <Form>

              <h4 className='hall' > Add Orphanage Info </h4>

                <h4 className="valid" >{validated}</h4>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className='input3'><b>Orphanage Name :</b></Form.Label>
                        <Form.Control className="lab"  type="text" placeholder="Enter The Orphanage Name"
                              value={orphanagename}
                              onChange={(e)=>
                                {setorphanagename(e.target.value)}
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


                   
                    <h6 className="valid" >{validated}</h6>
                    
                    <div className='addbtn'>

                    <Button  className='addbtn1' variant="primary"
                                onClick={handleSubmit}
                    >
                        Add orphanageinfo 
                    </Button>

                    <Button className='addbtn2' variant="primary"
                                onClick={()=>{
                                  navigate('/orphanagedashboard')
                                }}
                    >
                        Back
                    </Button>
                    </div>
                </Form>

        </div>
    )
}

export default AddOrphForm