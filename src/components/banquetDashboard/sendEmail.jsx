import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { API } from '../global';
import Button from 'react-bootstrap/Button';



function SendEmail(){
    const [name,setName] = useState('');
    const [orphanageName, setOrphanageName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [banquetname, setBanquetName] = useState('');
    const [banmanagername, setBanManagerName] = useState('');
    const [banquetemail, setBanquetEmail] = useState('');
   

    const [validated, setValidated] = useState(false);


    const handleSubmit = async (e) => {
        

        const newEmail ={
          name : name,
          orphanageName : orphanageName,
          email : email,
          address : address,
          banquetname: banquetname,
          banmanagername: banmanagername,
          banquetemail: banquetemail
        }

        console.log(newEmail)

        if(newEmail.name === ""){
          setValidated("VALID: Name is required");
          return;
       }else if(newEmail.address === ""){
          setValidated("VALID: Address is required");
          return;
       }else if(newEmail.email === "" ){
          setValidated("VALID: Email is Required and Valid");
          return;
       }else if(newEmail.orphanageName === ""){
          setValidated("VALID: orphanageName is required");
          return; 
       }else if(newEmail.banquetname === ""){
            setValidated("VALID: BanquetName is required");
            return; 
       }else if(newEmail.banmanagername === ""){
          setValidated("VALID: Banquet ManagerName is required");
          return; 
       }else if(newEmail.banquetemail === ""){
        setValidated("VALID: Banquet Email is required");
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

            try {

                const response = await fetch(`${API}/sendemail/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    newEmail
                  }),
                  
                });



                if (!response.ok) {
                    throw new Error('Error sending email');
                  }
            
                  console.log('Email sent successfully!');
                 
                } catch (error) {
                  console.error('Error sending email:', error);
                  
                } 
              };

    return(

        <div>

             {/* form */}
             <h4 className="valid" >{validated}</h4>
                            <Form.Group className="mb-3" controlId="hallname">
                        <Form.Label >Orphanage Name :</Form.Label>
                        <Form.Control  type="text" placeholder="Enter The Orphanage Name"
                              value={orphanageName}
                              onChange={(e)=>
                                {setOrphanageName(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Name :</Form.Label>
                        <Form.Control  type="text" placeholder="Enter The Orphanage Manager Name" 
                             value={name}
                             onChange={(e)=>{
                               setName(e.target.value)
                             }}  
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Orphanage Address :</Form.Label>
                        <Form.Control  type="text" placeholder="Enter The Orphanage Address" 
                            value={address}
                            onChange={(e)=>{
                              setAddress(e.target.value)
                            }} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control  type="text" placeholder="Enter The Email"
                              value={email}
                              onChange={(e)=>
                                {setEmail(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Banquet Name :</Form.Label>
                        <Form.Control  type="text" placeholder="Enter The Banquet Name"
                              value={banquetname}
                              onChange={(e)=>
                                {setBanquetName(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Banquet Manager Name :</Form.Label>
                        <Form.Control  type="text" placeholder="Enter The Manager Name"
                              value={banmanagername}
                              onChange={(e)=>
                                {setBanManagerName(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Banquet Email :</Form.Label>
                        <Form.Control  type="text" placeholder="Enter The Manager Name"
                              value={banquetemail}
                              onChange={(e)=>
                                {setBanquetEmail(e.target.value)}
                              }    
                        />
                    </Form.Group>

                   <Button className="btn1" type='submit' onClick={handleSubmit}>
                            
                            Agree To Take In
                        </Button>
        </div>
    )
}

export default SendEmail