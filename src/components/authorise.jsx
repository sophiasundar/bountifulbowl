import Figure from 'react-bootstrap/Figure';



export const Authorise =()=>{
    return(
    <div>
       <h1 className='hauth'>You are Not Authorise to CRUD Page</h1>

       <br></br>
       <Figure className="aufig">
                <Figure.Image
                width={651}
                height={651}
                alt="authImage"
                src="https://t4.ftcdn.net/jpg/05/55/05/33/360_F_555053318_5JPmRYJVxb1upi4hLsFbqRMxxKn5jqyc.jpg"
                />

                </Figure>
    </div>
    )
}