// src/admin/components/Sidebar.jsx
import { ChartColumnDecreasing, ChartNoAxesCombined } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-2 border-r border-gray-200 mt-5 pr-4 h-full">
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `px-4 text-lg py-2 rounded flex gap-1.5 transition-all ${isActive
            ? "bg-blue-600 text-white font-semibold"
            : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <ChartColumnDecreasing /> Dashboard
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `px-4 text-lg py-2 rounded flex gap-1.5 transition-all ${isActive
            ? "bg-blue-600 text-white font-semibold"
            : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <ChartNoAxesCombined /> Payments
      </NavLink>
    </nav>
  );
};

export default Sidebar;
