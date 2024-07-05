import React, { createContext, useState } from 'react';



const AuthContext = createContext();



const AuthProvider = ({ children }) => {
  
  const [user, setuser] = useState(null);
 
      const login = (userData) =>{
           setuser({ token: userData.token, role: userData.role});
           localStorage.setItem('token', userData.token);
           localStorage.setItem('role', userData.role);
      }

     const logout = () =>{
          setuser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          
      }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };