import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/admin/me")
      .then(res => setAdmin(res.data.admin))
      .catch(() => {
        localStorage.removeItem("admin_token");
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem("admin_token", token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
