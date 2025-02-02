import React from "react";

function Header({ isMenuOpen }) {
  // Adjust left padding to match the sidebar width.
  const leftPadding = isMenuOpen ? "pl-72" : "pl-20";

  return (
    <header
      className={`flex items-center justify-between bg-white shadow-md rounded-b-2xl p-4 transition-all duration-300 ${leftPadding}`}
    >
      <div className="text-2xl font-bold text-primary">Dashboard</div>
      {/* Profile or additional header icons */}
      <div className="flex items-center gap-4">
        {/* Placeholder for a profile picture */}
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <span className="font-medium text-primary">John Doe</span>
      </div>
    </header>
  );
}

export default Header;
