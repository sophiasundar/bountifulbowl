import NavBar from "../navbar/navbar"
import Card from 'react-bootstrap/Card';
import { GiBerriesBowl } from "react-icons/gi";
import Carousel from 'react-bootstrap/Carousel';
import { FaArrowRight } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { IoIosMailUnread } from "react-icons/io";
import { GiFoodTruck } from "react-icons/gi";
import home from '../home.css';
import bgbanquet from "../bgbanquet.css";


function HomePage({ isLoggedIn }){
    

      
    return(
        <div className='homepic'>
            <NavBar/>
            <div className={`welcomeheader ${isLoggedIn ? 'center' : ''}`}>
             <h2 className="header" >WELCOME TO BOUNTIFUL BOWL</h2>
             </div>
             <div  className="card-1">
                 
                 <Card style={{ width: '18rem' , height: "18rem", backgroundColor: 'palegreen' }}>
                    <Card.Img variant="top" src="https://cfaes.osu.edu/sites/cfaes_main/files/CFAES_OrgChart.pdf/news/ThinkstockPhotos-185170282.jpg" />
                    <Card.Body>
                        <Card.Text>
                            <h4>Waste Less Food</h4> 
                        </Card.Text>
                    </Card.Body>
                    </Card>
             </div>
              <div className="card-2">
              <Card style={{ width: '18rem' , height: "16.5rem", backgroundColor: 'yellow' }}>
                    <Card.Img variant="top" src="https://img.freepik.com/premium-photo/mindful-time-restricted-eating-clock-plate-with-thoughtfully-chosen-food-representing_925414-16095.jpg" />
                    <Card.Body>
                        <Card.Text>
                        <h4>Food Alert On Time</h4>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                
              </div>
              
             <div>
                

             </div>

             <div>
                <h2 className="header-2">About Bountiful Bowl</h2>

                        <Carousel data-bs-theme="dark">
                                <Carousel.Item>
                                    <img
                                    className="slide"
                                    src="https://img.freepik.com/free-vector/dark-blue-waves-dots-abstract-background_79603-879.jpg"
                                    alt="First slide"
                                    />
                                    <Carousel.Caption>
                                    <h5> Welcome to WEB App</h5>
                                                <h4>
                                   Discover a platform dedicated to combating food waste and making 
                                    a positive impact on your community. Bountiful Bowl connects banquet halls with orphanages 
                                    and charitable organizations, ensuring that surplus food is not only preserved but also 
                                    reaches those in need.
                                        </h4>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="slide"
                                    src="https://t4.ftcdn.net/jpg/02/49/11/67/360_F_249116700_mHeIhTScrnUO945kwOBGTI0GeA4oEV1r.jpg"
                                    alt="Second slide"
                                    />
                                    <Carousel.Caption>
                                    
                                                <h4>
                                Our user-friendly web application provides a seamless platform for banquet halls to 
                                        list their excess food, while orphanages and charities can easily browse available resources and request 
                                        donations. By bridging this gap, we aim to promote sustainable food practices, reduce waste, and foster a 
                                        more compassionate society.
                                        </h4>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="slide"
                                    src="https://t4.ftcdn.net/jpg/03/93/33/61/360_F_393336128_TBpWZmTC8tHdAXUThg7UmilSr4ULsw2C.jpg"
                                    alt="Third slide"
                                    />
                                    <Carousel.Caption>
                                    
                                    <h3>Join us in making a difference and contributing to a more equitable and food-secure future.  <GiBerriesBowl color="blue" size={35}/> </h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                </Carousel>
                                        


                            
                   </div>
               
                <div >
                    

                   
                <Card style={{ width: '75rem',  backgroundColor: 'transparent' }}>
                <h2 className="header2">How It Works</h2>
                            <Card.Body>
                           
                            <div className="small-cards">
                              {/* card 1 */}
                              <Card style={{ width: '10rem', height: '10rem',  backgroundColor: 'transparent' }}>
                              
                            <Card.Body>
                                 <FaBowlFood className="icon" size = '28px'  />
                                <Card.Text>
                              
                               <p> Orphanage manager will browse for food</p>
                                </Card.Text>
                    
                            </Card.Body>
                            </Card>

                            <div className="arrow">
                            <FaArrowRight className="arrow-icon animated"  />
                            </div>

                             {/* card 2 */}
                             <Card style={{ width: '10rem', height: '10rem',  backgroundColor: 'transparent' }}>
                            <Card.Body>
                            <IoMdTime className="icon" size = '28px' />
                                <Card.Text>
                              
                                 <p>Check for Local avaliability of Time and Date</p>
                                </Card.Text>
                    
                            </Card.Body>
                            </Card>
                             
                            <div className="arrow">
                            <FaArrowRight   className="arrow-icon"/>
                            </div>

                             {/* card 3 */}
                             <Card style={{ width: '10rem', height: '10rem',  backgroundColor: 'transparent' }}>
                            <Card.Body>
                            <IoIosMailUnread className="icon" size='28px'/>
                                <Card.Text>
                                   <p>Send mail to the respective Banquet hall manager</p>
                               
                                </Card.Text>
                    
                            </Card.Body>
                            </Card>

                            <div className="arrow">
                            <FaArrowRight   className="arrow-icon" />
                            </div>
                             {/* card 4 */}
                             <Card style={{ width: '10rem', height: '10rem',  backgroundColor: 'transparent' }}>
                            <Card.Body>
                            <GiFoodTruck className="icon" size='30px' />
                                <Card.Text>
                                  <p>Pick up Your Food from banaquet hall</p>
                               
                                </Card.Text>
                    
                            </Card.Body>
                            </Card>

                            </div>
             </Card.Body>
            </Card>
                </div>
            
        </div>
    )
}

export default HomePage