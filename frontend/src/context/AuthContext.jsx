// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   const login = (newToken) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   const isAuthenticated = !!token;

//   return (
//     <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
