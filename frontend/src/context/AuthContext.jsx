import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw).user : null;
  });

  const login = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
