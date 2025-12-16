// src/admin/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();


  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">
          Welcome, {admin.email}
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
  );
};

export default Header;
