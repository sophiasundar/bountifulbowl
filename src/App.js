import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
// import { useState } from 'react';
import LogIn from './components/signup/login';
import SignUpForm from './components/signup/signupform';
import Banquet from './components/banquetDashboard/banquet';
import OrphanInfo from './components/orphanage/orphanage';
import { ProtectedRoute } from './components/protectedRoute';
import CrudTable from './components/crud/crudTable';



function App() {
  // const [banquetData, setBanquetData] = useState([])

  return (
    <div className="App">
      
      <BrowserRouter>

      <Routes>

      <Route path='/' element={ <LogIn/> }></Route>
      <Route path='/signup' element={ <SignUpForm/>}></Route>

      
       
      <Route path='/banquetdashboard' element={
         <ProtectedRoute>
      <Banquet/>
      </ProtectedRoute>
      }></Route>

      <Route path='/orphanagedashboard' element={<OrphanInfo/>}></Route>

      <Route path='/banquetcrud' element = {<CrudTable/>}></Route>

      </Routes>
      
      </BrowserRouter>
       

    </div>
  );
}

export default App;
