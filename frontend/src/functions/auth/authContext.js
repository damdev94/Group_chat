import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfos, setUserInfos] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserEmail = localStorage.getItem('userEmail');
    if (savedToken && savedUserEmail) {
      setIsAuthenticated(true);
      setToken(savedToken);
      setUserEmail(savedUserEmail);
    }
  }, []);

  const user = (user) => {
    setUserInfos(user)
  }

  const login = (userToken, usermail) => {
    setIsAuthenticated(true);
    setToken(userToken);
    setUserEmail(usermail);
    localStorage.setItem('token', userToken);
    localStorage.setItem('userEmail', usermail);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userEmail, userInfos, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
