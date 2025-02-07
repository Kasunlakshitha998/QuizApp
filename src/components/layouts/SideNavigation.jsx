import React from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { menuList } from "./menuList";

function SideNavigation({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();

  return (
    <div className={`relative h-full bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-700 text-white shadow-2xl
      ${isMenuOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out
      border-r border-gray-700/50 backdrop-blur-lg`}>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-green-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header Area */}
      <div className="relative flex items-center justify-between p-4 border-b border-gray-700/50 mb-6">
        {isMenuOpen && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent
            transform transition-all duration-300 ease-out">
            My Dashboard
          </h1>
        )}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white 
            transition-all duration-300 ease-in-out transform hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
            shadow-lg shadow-gray-900/20"
        >
          <Menu size={20} className="transform transition-transform duration-300" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="px-3 space-y-2">
        {menuList.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.id} to={item.path}>
              <div
                className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${isActive 
                    ? "bg-gradient-to-r from-green-600/20 to-green-500/10 border-l-4 border-green-500" 
                    : "border-l-4 border-transparent hover:border-green-500/50"
                  }
                  ${isMenuOpen ? "justify-start" : "justify-center"}
                  hover:bg-gradient-to-r hover:from-green-600/20 hover:to-green-500/5`}
              >
                <Icon 
                  size={22} 
                  className={`transition-all duration-300
                    ${isActive ? "text-green-400" : "text-gray-300"}
                    group-hover:text-green-400 group-hover:scale-110`}
                />
                
                {isMenuOpen && (
                  <span className={`text-base font-medium whitespace-nowrap
                    transition-all duration-300
                    ${isActive 
                      ? "text-green-400" 
                      : "text-gray-300 group-hover:text-green-400"}`}>
                    {item.name}
                  </span>
                )}

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute right-3 w-2 h-2 rounded-full bg-green-500/50 
                    shadow-lg shadow-green-500/20" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t 
        from-green-500/5 to-transparent pointer-events-none" />
    </div>
  );
}

export default SideNavigation;