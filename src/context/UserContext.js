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

  const logIn = (jwt) => {
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
    <UserContext.Provider value={{ loggedIn, user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
