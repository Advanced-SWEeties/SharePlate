import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiPostRequest } from '../functions/api'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    if (!username || !password) {
      throw new Error('Username and password are required.');
    }
  
    const data = {
      username,
      password,
    };
  
    try {
      console.log("In here")
      const response = await apiPostRequest('users/login', data)  
      if (response.jwt) {
        console.log(response.jwt);
        setJwt(response.jwt);
        setLoggedIn(true);
        setLoginError(false);
      } else {
        throw new Error(response|| 'Login failed');
      }
    } catch (error) {
        console.error(error.message || 'An error occurred during login.');
        setLoginError(true);
    }
  };
  
  const setJwt = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ loggedIn, token, login, logOut, loginError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
