import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavigation from "../components/Nav/SideNavigation";
import Header from "../components/Nav/Header";

function DashboardLayout() {
  // Manage the sidebar state for the layout.
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // Define dynamic widths for open/closed states.
  const sidebarWidth = isMenuOpen ? "w-72" : "w-20";
  const contentMargin = isMenuOpen ? "ml-72" : "ml-20";

  return (
    <div className="min-h-screen flex bg-red-50 transition-all duration-300">
      {/* Fixed Sidebar */}
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ${sidebarWidth}`}>
        <SideNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
        <Header isMenuOpen={isMenuOpen} />
        <div className="p-10">
          {/* This is where your child routes will render */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
