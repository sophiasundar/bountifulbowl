import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
// import { useState } from 'react';
import LogIn from './components/signup/login';
import SignUpForm from './components/signup/signupform';
// import { ProtectedRoute } from './components/protectedRoute';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>

      <Routes>

      <Route path='/' element={ <LogIn/> }></Route>
      <Route path='/signup' element={ <SignUpForm/>}></Route>

      </Routes>
      
      </BrowserRouter>
       

    </div>
  );
}

export default App;
