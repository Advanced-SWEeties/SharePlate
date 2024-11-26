import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setJwt(result);
        return true;
      } else {
        // throw new Error(result.message || 'Login failed');
        return false;
      }
    } catch (error) {
        console.error(error.message || 'An error occurred during login.');
        return false;
    }
  };
  
  const setJwt = (jwt) => {
    localStorage.setItem('token', jwt);
    setUser(null);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ loggedIn, user, login, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
