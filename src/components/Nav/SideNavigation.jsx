import React from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Import the menu list from the menuList file
import { menuList } from "./menuList";

function SideNavigation({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();


  return (
    <div
      className={`h-full bg-red-400 text-white shadow-xl rounded-r-3xl p-4 transition-all duration-300`}
    >
      {/* Header / Toggle Button Area */}
      <div className="flex items-center justify-between mb-8">
        {isMenuOpen && <h1 className="text-2xl font-bold">My Dashboard</h1>}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full bg-white text-black bg-opacity-20 hover:bg-opacity-30 transition-colors shadow-md"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav>
        {menuList.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.id} to={item.path}>
              <div
                className={`flex items-center gap-4 p-3 mb-3 rounded-lg cursor-pointer transition-all duration-300
                  ${isActive ? "bg-red-500 bg-opacity-20 border-l-6 border-white" : ""} 
                  hover:bg-red-500 hover:bg-opacity-10 hover:text-white 
                  ${isMenuOpen ? "justify-start" : "justify-center"}`}
              >
                <Icon size={24} />
                {isMenuOpen && (
                  <span className="text-lg font-medium">{item.name}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default SideNavigation;
