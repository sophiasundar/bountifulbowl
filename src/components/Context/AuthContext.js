import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: '',
  setToken: () => {},
   role: '',
   setRole: () => {}
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
 
  
  useEffect(() => {
    const storedToken = localStorage.getItem('x-auth-token');
    const storedRole = localStorage.getItem('x-auth-role');
    if (storedToken && storedRole) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  

  const handleSetToken = (newToken, newRole) => {
    localStorage.setItem('x-auth-token', newToken);
    setToken(newToken);
    setIsAuthenticated(!!newToken); 
    setRole(newRole);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken: handleSetToken,
    role,
    setRole,
  };


  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };