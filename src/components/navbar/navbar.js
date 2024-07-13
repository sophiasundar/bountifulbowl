import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GiBerriesBowl } from "react-icons/gi";
import React, { useContext }from 'react';
import { AuthContext } from '../Context/AuthContext';
 

    function NavBar(){
       const navigate = useNavigate()
       const { logout } = useContext(AuthContext);
       
        
       const handleLogout = () =>{
             
             logout()
             alert('Successfully LoggedOut')
             navigate('/');
       } 
       
       return(
            <>
              <Navbar bg="secondary" data-bs-theme="light">
                <Container>
                <Button variant="light">
                  <Navbar.Brand href="" variant="light" > Bountiful Bowl <GiBerriesBowl color="blue" size={35}/> </Navbar.Brand>
                  </Button>{' '}
                 
                  <Nav className="me-auto">
                   
                  <Button className='addbtn2' variant="primary"
                                onClick={()=>{
                                  navigate('/banquetdashboard')
                                }}
                    >
                        Banquet Info
                    </Button>
                    <Button className='addbtn3' variant="primary"
                                onClick={()=>{
                                  navigate('/orphanagedashboard')
                                }}
                    >
                        Orphanage Info
                    </Button>

                    <Button className='addbtn4' variant="primary"
                                onClick={()=>{
                                  navigate('/banquetcrud')
                                }}
                    >
                        CRUD Page
                    </Button>
                  <Button variant="dark" className='logoutbtn'  size="sm" >
                    <Nav.Link href=""
                            onClick={handleLogout}
                  ><b>Log Out</b></Nav.Link>
                  </Button>
                  
                  
                  </Nav>
                </Container>
              </Navbar>

            </>
        )
        

    }

    export default NavBar