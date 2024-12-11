import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../global.js';



const AuthContext = createContext({
     token : '',
     user: null,
     role: '',
     roles: {}, 
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
  const [roles, setRoles] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
        
  // Fetch roles from the backend API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API}/roles/`);
        setRoles(response.data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);



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
                    return true;
             } catch(error){
                  console.error('Login error:', error);
                  setIsAuthenticated(false);
                  return false;
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
    <AuthContext.Provider value={{ token, user, role, roles,  isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };