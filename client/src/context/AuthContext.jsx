/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import  { createContext, useState, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 


 

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
