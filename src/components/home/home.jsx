import NavBar from "../navbar/navbar"
import bgbanquet from "../bgbanquet.css";
import Card from 'react-bootstrap/Card';
// import { GiBerriesBowl } from "react-icons/gi";
import home from '../home.css';

function HomePage({ isLoggedIn }){
    return(
        <div className='homepic'>
            <NavBar/>
            <div className={`welcomeheader ${isLoggedIn ? 'center' : ''}`}>
             <h2 >WELCOME TO BOUNTIFUL BOWL</h2>
             </div>
             <div>
                 <h2>Waste Less Food</h2>
                 <h2>Food Alert On Time</h2>
             </div>

             <div>
                <img/>

             </div>

             <div>
                <h2>About Bountiful Bowl</h2>
                <Card style={{ width: '28rem',  backgroundColor: 'transparent' }}>
                            <Card.Body>
                               
                                <Card.Text>
                               {/* <GiBerriesBowl color="blue" size={35}/>  */}
                                <h4>
                        Welcome to WEB App,Discover a platform dedicated to combating food waste and making 
                        a positive impact on your community. Bountiful Bowl connects banquet halls with orphanages 
                        and charitable organizations, ensuring that surplus food is not only preserved but also 
                        reaches those in need.
                             </h4>
                                </Card.Text>
                    
                            </Card.Body>
                            </Card>
                   
                      <div>

                      <Card style={{ width: '38rem',  backgroundColor: 'transparent' }}>
                            <Card.Body>
                               
                                <Card.Text>
                                <h4>
                     Our user-friendly web application provides a seamless platform for banquet halls to 
                            list their excess food, while orphanages and charities can easily browse available resources and request 
                            donations. By bridging this gap, we aim to promote sustainable food practices, reduce waste, and foster a 
                            more compassionate society.

                     </h4>
                                
                                </Card.Text>
                    
                            </Card.Body>
                            </Card>

                    
                     </div>
                     <div>
                        <h3>Join us in making a difference and contributing to a more equitable and food-secure future.</h3>
                     </div>
             </div>
        </div>
    )
}

export default HomePage