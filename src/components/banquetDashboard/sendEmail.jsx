import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { API } from '../global';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function SendEmail(){
    const [name,setName] = useState('');
    const [orphanagename, setOrphanageName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [banquetname, setBanquetName] = useState('');
    const [banmanagername, setBanManagerName] = useState('');
    const [banquetemails, setBanquetEmails] = useState([]);
    const [selectedBanquetEmail, setSelectedBanquetEmail] = useState('');

    const navigate = useNavigate()


    const [validated, setValidated] = useState(false);
         
       useEffect(()=>{
            const getemails = async ()=>{
              try{
                const res = await fetch(`${API}/banquet/`);
                if(!res.ok){
                  throw new Error('Error fetching emails');
                }
                const data = await res.json();
                setBanquetEmails(data);
              }catch(error){
                 console.error('Error fetching emails:',error);
              }
            };
            getemails();
       }, [])

    const handleSubmit = async (e) => {
        
      
        const newEmail ={
          name : name,
          orphanagename : orphanagename,
          email : email,
          address : address,
          banquetname: banquetname,
          banmanagername: banmanagername,
          banquetemails: selectedBanquetEmail
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
       }else if(newEmail.orphanagename === ""){
          setValidated("VALID: orphanageName is required");
          return; 
       }else if(newEmail.banquetname === ""){
            setValidated("VALID: BanquetName is required");
            return; 
       }else if(newEmail.banmanagername === ""){
          setValidated("VALID: Banquet ManagerName is required");
          return; 
       }else if(newEmail.selectedBanquetEmail === ""){
        setValidated("VALID: Select a Banquet Email is required");
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

                const response = await fetch(`${API}/sendemail`, {
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
                        <Form.Label className="lab" >Orphanage Name :</Form.Label>
                        <Form.Control className='input3' type="text" placeholder="Enter The Orphanage Name"
                              value={orphanagename}
                              onChange={(e)=>
                                {setOrphanageName(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="lab" > Name :</Form.Label>
                        <Form.Control className='input3' type="text" placeholder="Enter The Orphanage Manager Name" 
                             value={name}
                             onChange={(e)=>{
                               setName(e.target.value)
                             }}  
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="lab">Orphanage Address :</Form.Label>
                        <Form.Control className='input3' type="text" placeholder="Enter The Orphanage Address" 
                            value={address}
                            onChange={(e)=>{
                              setAddress(e.target.value)
                            }} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="lab">Email :</Form.Label>
                        <Form.Control className='input3'  type="email" placeholder="Enter The Email"
                              value={email}
                              onChange={(e)=>
                                {setEmail(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="lab">Banquet Name :</Form.Label>
                        <Form.Control className='input3' type="text" placeholder="Enter The Banquet Name"
                              value={banquetname}
                              onChange={(e)=>
                                {setBanquetName(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="lab" > Banquet Manager Name :</Form.Label>
                        <Form.Control className='input3' type="text" placeholder="Enter The Manager Name"
                              value={banmanagername}
                              onChange={(e)=>
                                {setBanManagerName(e.target.value)}
                              }    
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                       
                         <Form.Label className="lab" >Banquet Email :</Form.Label>
                         <Form.Select  aria-label="Default select example"
                              value={selectedBanquetEmail}
                              onChange={(e)=>
                                {setSelectedBanquetEmail(e.target.value)}
                              } 
                         >
                          <option value=''>Select Banquet Email</option>
                              {banquetemails.map((email)=>(
                          <option key={email} value={email}>{email}</option>
                        ))}
                        </Form.Select>
                    </Form.Group>

                  

                        <div className='addbtn'>

                        <Button type='submit' onClick={handleSubmit}>
                            
                            Send Email
                        </Button>

                        <Button className='addbtn2' variant="primary"
                                    onClick={()=>{
                                        navigate('/banquetdashboard')
                                    }}
                        >
                            Back
                        </Button>
                        </div>
        </div>
    )
}

export default SendEmail