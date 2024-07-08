import React, { createContext, useState } from 'react';
import axios from 'axios';
import { API } from '../global.js';



const AuthContext = createContext({
     token : '',
     user: null,
     role: '',
     setToken: (token)=>{},
     setUser: (user)=>{},
     setRole: (role)=>{},
     isAuthenticated: false,
     login: ()=>{},
     logout: ()=>{},
});



const AuthProvider = ({ children }) => {
  const [token,setToken] = useState(localStorage.getItem('x-auth-token'));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  


      const login = async (credent) =>{
             
             try{
                const response = await axios.post(`${API}/users/login`, credent);
                const token = response.data.token;
                localStorage.setItem('x-auth-token', token);
                setToken(token);

                const userData = response.data.user;
                setUser(userData);
                setRole(userData.role);
                localStorage.setItem('role', userData.role);
                setIsAuthenticated(true);

             } catch(error){
                  console.error('Login error:', error);
             }

      }

     const logout = () =>{
          
          localStorage.removeItem('x-auth-token');
          setToken('');
          setUser(null);
          localStorage.removeItem('role');
          setRole('');
          setIsAuthenticated(false);

      };


  return (
    <AuthContext.Provider value={{ token, user, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };