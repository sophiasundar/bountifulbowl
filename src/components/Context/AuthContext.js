import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: '',
  setToken: () => {}
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

 
  
  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  

  const handleSetToken = (newToken) => {
    localStorage.setItem('auth-token', newToken);
    setToken(newToken);
    setIsAuthenticated(!!newToken); 
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken: handleSetToken
  };


  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };