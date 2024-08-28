import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import {  useState } from 'react';
import LogIn from './components/signup/login';
import SignUpForm from './components/signup/signupform';
import Banquet from './components/banquetDashboard/banquet';
import OrphanInfo from './components/orphanage/orphanage';
import CrudTable from './components/crud/crudTable';
import AddForm from './components/crud/addForm';
import { EditForm } from './components/crud/editForm';
import SendEmail from './components/banquetDashboard/sendEmail';
import {  AuthProvider } from './components/Context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute.jsx';
import { Authorise } from './components/authorise.jsx';
import AddOrphForm from './components/orphanage/addOrphForm.jsx';
import { EditOForm } from './components/orphanage/EditOrphForm.jsx';
import HomePage from './components/home/home.jsx';





function App() {
 
  const [tableData, setTableData] = useState([])
  const [ orphData, setOrphData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>

      <Routes>

      <Route path='/' element={ <LogIn/> }></Route>
      <Route path='/signup' element={ <SignUpForm/>}></Route>

      <Route path='/notauthorise' element={ <Authorise/>}></Route>
      <Route path='/home' element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
       
      <Route path='/banquetdashboard' element={
         <ProtectedRoute allowedRoles={['Banquet-Manager','orphanage-manager']}>
            <Banquet/>
      </ProtectedRoute>
      }></Route>

      <Route path='/orphanagedashboard' element={
        <ProtectedRoute allowedRoles={['Banquet-Manager','orphanage-manager']} >
      <OrphanInfo/>
      </ProtectedRoute>
      }></Route>

      <Route path='/banquetcrud' element = {
        <ProtectedRoute allowedRoles={['Banquet-Manager']} >
      <CrudTable/>
      </ProtectedRoute>
      }></Route>

      <Route path='/addform' element = {
         <ProtectedRoute allowedRoles={['Banquet-Manager']} >
      <AddForm tableData={tableData} setTableData={setTableData}/>
      </ProtectedRoute>
      }></Route>

      <Route path='/editform/:id' element = {
      <ProtectedRoute allowedRoles={['Banquet-Manager']} >
      <EditForm tableData={tableData} setTableData={setTableData}/>
      </ProtectedRoute>
      }></Route>

      <Route path='/addorphinfo' element = {
         <ProtectedRoute allowedRoles={['orphanage-manager']} >
          <AddOrphForm orphData={orphData} setOrphData={setOrphData}/>
      </ProtectedRoute>
      }></Route>

      <Route path='/editorphinfo/:id' element = {
      <ProtectedRoute allowedRoles={['orphanage-manager']} >
        <EditOForm orphData={orphData} setOrphData={setOrphData}/>
      </ProtectedRoute>
      }></Route>

     <Route path='/sendemail' element = {<SendEmail/>}></Route>



      </Routes>
      
      </BrowserRouter>
       
      </AuthProvider>
    </div>
  );
}

export default App;
