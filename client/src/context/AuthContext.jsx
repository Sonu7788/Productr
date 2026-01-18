import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token on load (Optional: depending on backend implementation)
      // Here we just assume if token exists, we are logged in, 
      // or you can call an endpoint to validate it.
      try {
        // Example validation call:
        // axios.get('http://localhost:5000/api/auth/user', { headers: {'x-auth-token': token} })
        //   .then(res => setUser(res.data))
        
        // For this specific setup, we just set user if token exists
        // Ideally, you should decode the JWT or hit an endpoint
        setUser({ email: 'admin@shopytr.com', name: 'Admin User' }); 
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);