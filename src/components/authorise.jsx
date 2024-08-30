import Figure from 'react-bootstrap/Figure';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export const Authorise =()=>{
    const navigate = useNavigate()


    return(
    <div>
         <Button className='back' variant="primary"
                                onClick={()=>{
                                  navigate('/home')
                                }}
                    >
                        Back
                    </Button>

       <h4 className='hauth'>You are unauthorized to access this page.</h4>

       <br></br>
       <Figure className="aufig">
                <Figure.Image
                width={551}
                height={551}
                alt="authImage"
                src="https://t4.ftcdn.net/jpg/05/55/05/33/360_F_555053318_5JPmRYJVxb1upi4hLsFbqRMxxKn5jqyc.jpg"
                />

                </Figure>
    </div>
    )
}