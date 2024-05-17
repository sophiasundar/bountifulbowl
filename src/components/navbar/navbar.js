import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GiBerriesBowl } from "react-icons/gi";



    function NavBar(){
       const navigate = useNavigate()
        return(
            <>
              <Navbar bg="info" data-bs-theme="light">
                <Container>
                <Button variant="light">
                  <Navbar.Brand href="/home" variant="light" > Bountiful Bowl <GiBerriesBowl color="red" size={35}/> </Navbar.Brand>
                  </Button>{' '}
                 
                  <Nav className="me-auto">
                  <Button className='addbtn2' variant="primary"
                                onClick={()=>{
                                  navigate('/home')
                                }}
                    >
                        Home page
                    </Button>
                  <Button variant="dark" className='logoutbtn'  size="sm" ><Nav.Link href="/"
                            
                  ><b>Log Out</b></Nav.Link></Button>{' '}
                  
                  </Nav>
                </Container>
              </Navbar>

            </>
        )
        

    }

    export default NavBar