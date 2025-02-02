import React, { useState } from "react";
import { useAuth } from "../../auth/authContext";
import { Link } from "react-router-dom";


function Header({ isMenuOpen }) {
  const { currentUser, logout } = useAuth(); // Get current user & logout function
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Adjust left padding to match the sidebar width.
  const leftPadding = isMenuOpen ? "pl-72" : "pl-20";

  return (
    <header
      className={`flex items-center justify-between bg-white shadow-md rounded-b-2xl p-4 transition-all duration-300 ${leftPadding}`}
    >
      <div className="text-2xl font-bold text-primary">Dashboard</div>

      {/* Profile Section */}
      <div className="relative">
        <button
          className="flex items-center gap-3 focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">
            {currentUser?.email.charAt(0).toUpperCase()}
          </div>
          {/* User Name */}
          <span className="font-medium text-primary">{currentUser?.email}</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-gray-700"
            >
              <Link to={"/profile"}>Profile</Link>
            </button>
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
