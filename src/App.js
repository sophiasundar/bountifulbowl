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
import AdminDashboard from './components/admin/adminDashboard.jsx';





function App() {
 
  const [tableData, setTableData] = useState([])
  const [ orphData, setOrphData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLoginSuccess = (success) => {
    setIsLoggedIn(success);  // Set the login state based on the login result
  };

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>

      <Routes>

      <Route path='/' element={ <LogIn handleLoginSuccess={handleLoginSuccess}/> }></Route>
      <Route path='/signup' element={ <SignUpForm/>}></Route>

      <Route path='/notauthorise' element={ <Authorise/>}></Route>
      <Route path='/home' element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
       
      <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
           <AdminDashboard/>
          </ProtectedRoute>
        } />
      <Route path='/banquetdashboard' element={
         <ProtectedRoute allowedRoles={['banquet-manager','orphanage-manager','admin']}>
            <Banquet/>
      </ProtectedRoute>
      }></Route>

      <Route path='/orphanagedashboard' element={
        <ProtectedRoute allowedRoles={['banquet-manager','orphanage-manager','admin']} >
      <OrphanInfo/>
      </ProtectedRoute>
      }></Route>

      <Route path='/banquetcrud' element = {
        <ProtectedRoute allowedRoles={['banquet-manager','admin']} >
      <CrudTable/>
      </ProtectedRoute>
      }></Route>

      <Route path='/addform' element = {
         <ProtectedRoute allowedRoles={['banquet-manager','admin']} >
      <AddForm tableData={tableData} setTableData={setTableData}/>
      </ProtectedRoute>
      }></Route>

      <Route path='/editform/:id' element = {
      <ProtectedRoute allowedRoles={['banquet-manager','admin']} >
      <EditForm tableData={tableData} setTableData={setTableData}/>
      </ProtectedRoute>
      }></Route>

      <Route path='/addorphinfo' element = {
         <ProtectedRoute allowedRoles={['orphanage-manager','admin']} >
          <AddOrphForm orphData={orphData} setOrphData={setOrphData}/>
      </ProtectedRoute>
      }></Route>

      <Route path='/editorphinfo/:id' element = {
      <ProtectedRoute allowedRoles={['orphanage-manager', 'admin']} >
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
