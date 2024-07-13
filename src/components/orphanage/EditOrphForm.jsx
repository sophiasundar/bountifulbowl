import React, { useState,  useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API } from '../global.js';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext.js';
import { useParams } from 'react-router-dom';

export function EditOForm(){
      
    const {id} = useParams();
    const [orph,setOrph] = useState();
    const { token } = useContext(AuthContext);

    useEffect(()=>{
       
        axios.get(`${API}/orphinfo/${id}`,{
            headers:{
                Authorization: 'Bearer ' + token 
              }
        })
        .then((res)=>{
            console.log(res.data);
            setOrph(res.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
             console.error('Unauthorized request! Please check your authentication credentials.');
            } else {
               console.error('Error:', error);
            }  
          })

    },[token,id]);

    if(orph){
        return <EditOrphForm orph={orph} id={id} />
    }else{
        return "Loading...";
    }

}

 function  EditOrphForm({orph, id}){
    
    const [orphanagename, setOrphanageName] = useState(orph.orphanagename);
    const [name,setName] = useState(orph.name)
    const [address,setAddress] = useState(orph.address)
    const [email,setEmail] = useState(orph.email)
    const { token } = useContext(AuthContext);
    const [validated, setValidated] = useState(false);
 
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        const newInfo ={
           orphanagename:orphanagename,
           name: name,
           address:address,
           email: email,
        }
        console.log(newInfo) 

        if(newInfo.orphanagename === ""){
            setValidated("VALID: Hall Name is required");
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

          axios.put(`${API}/orphinfo/${orph._id}`,newInfo,{
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
          .then(()=>navigate('/orphanagedashboard'))

        }
    return(
        <div className='editform'>
             
             <Form>

              <h4 className='hall' > Edit Orphanage Info </h4>

                <h4 className="valid" >{validated}</h4>
                    <Form.Group className="mb-3" controlId="orphanagename">
                        <Form.Label className='input3'><b>Orphanage Name :</b></Form.Label>
                        <Form.Control className="lab"  type="text" placeholder="Enter The Orphanage Name"
                              value={orphanagename}
                              onChange={(e)=>
                                {setOrphanageName(e.target.value)}
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
                         Submit
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
    


