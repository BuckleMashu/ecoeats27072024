import React, { createContext, useState } from 'react';

// Create a Context for the user data
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};