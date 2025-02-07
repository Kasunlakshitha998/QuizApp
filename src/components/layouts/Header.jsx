import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/authContext";
import { Link } from "react-router-dom";
import { db } from "../../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Bell, Settings, User, LogOut } from "lucide-react";

function Header({ isMenuOpen }) {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Adjust width based on sidebar state instead of padding
  const headerWidth = isMenuOpen
    ? "w-[calc(100%-256px)] left-64"
    : "w-[calc(100%-80px)] left-20";

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <header
      className={`fixed top-0 ${headerWidth} z-100 flex items-center justify-between 
        bg-white/80 backdrop-blur-md border-b border-gray-100
        px-6 py-3 transition-all duration-300
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]`}
    >
      {/* Left Section - Title & Search */}
      <div className="flex items-center gap-6">
        <h1
          className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 
          bg-clip-text text-transparent"
        >
          Dashboard
        </h1>

        <div
          className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5
          border border-gray-100 focus-within:border-green-500 transition-colors"
        >
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Quick search..."
            className="bg-transparent border-none outline-none text-sm w-48
              placeholder:text-gray-400 focus:ring-0"
          />
        </div>
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings size={20} className="text-gray-600" />
        </button>

        {/* Profile Section */}
        <div className="relative">
          <button
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 
              transition-all duration-200 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={userData?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-gray-100"
            />
            <span className="hidden sm:block font-medium text-gray-700">
              {userData?.fullName || "User"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="fixed z-300 right-0 mt-2 w-56 bg-white rounded-xl shadow-lg 
              border border-gray-100 py-1.5 transform opacity-100 scale-100
              transition-all duration-200 origin-top-right "
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {userData?.fullName}
                </p>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
              </div>

              <Link to="/profile">
                <button
                  className="flex items-center gap-2 w-full text-left px-3 py-2 
                  hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                >
                  <User size={16} />
                  View Profile
                </button>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 w-full text-left px-3 py-2 
                  hover:bg-red-50 text-sm text-red-600 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
