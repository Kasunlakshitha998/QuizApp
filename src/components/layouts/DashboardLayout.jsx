import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavigation from "./SideNavigation";
import Header from "./Header";

function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  
  // Define dynamic widths for open/closed states
  const sidebarWidth = isMenuOpen ? "w-64" : "w-20";
  const contentWidth = isMenuOpen ? "pl-64" : "pl-20";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-gray-50 to-green-50">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-20 transition-all duration-300 ease-in-out ${sidebarWidth}`}>
        <SideNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Main Content Wrapper */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ${contentWidth}`}>
        {/* Header */}
        <Header isMenuOpen={isMenuOpen} />

        {/* Main Content Area */}
        <main className="pt-20 px-6 pb-6 min-h-[calc(100vh-80px)]">
          {/* Content Grid */}
          <div className="max-w-[1920px] mx-auto">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-100/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-green-100/20 rounded-full blur-3xl" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-[calc(100vh-120px)]">
              {/* Page Content */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                  <Outlet />
                </div>
              </div>

              {/* Footer */}
              <footer className="mt-6 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Your Dashboard. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout;