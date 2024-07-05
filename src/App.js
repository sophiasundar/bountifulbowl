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




function App() {
  // const { user, login } = useContext(AuthContext)
  const [tableData, setTableData] = useState([])

  
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>

      <Routes>

      <Route path='/' element={ <LogIn/> }></Route>
      <Route path='/signup' element={ <SignUpForm/>}></Route>

      
       
      <Route path='/banquetdashboard' element={
         <ProtectedRoute requiredRoles={['Banquet-Manager','orphanage-manager']}>
      <Banquet/>
      </ProtectedRoute>
      }></Route>

      <Route path='/orphanagedashboard' element={
        <ProtectedRoute requiredRoles={['Banquet-Manager','orphanage-manager']} >
      <OrphanInfo/>
      </ProtectedRoute>
      }></Route>

      <Route path='/banquetcrud' element = {
        <ProtectedRoute requiredRoles={['Banquet-Manager']} >
      <CrudTable/>
      </ProtectedRoute>
      }></Route>

      <Route path='/addform' element = {
         <ProtectedRoute requiredRoles={['Banquet-Manager']} >
      <AddForm tableData={tableData} setTableData={setTableData}/>
      </ProtectedRoute>
      }></Route>

      <Route path='/editform/:id' element = {
      <ProtectedRoute requiredRoles={['Banquet-Manager']} >
      <EditForm tableData={tableData} setTableData={setTableData}/>
      </ProtectedRoute>
      }></Route>

     <Route path='/sendemail' element = {
      <ProtectedRoute  >
      <SendEmail/>
      </ProtectedRoute>
      }></Route>
       
      </Routes>
      
      </BrowserRouter>
       
      </AuthProvider>
    </div>
  );
}

export default App;
