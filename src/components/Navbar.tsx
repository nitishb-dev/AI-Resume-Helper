import React from "react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeSection }) => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md z-50 transition-colors">
      <ul className="flex justify-center space-x-4 sm:space-x-8 py-4 text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300">
        {navLinks.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <li
              key={id}
              className="relative cursor-pointer px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => onNavClick(id)}
            >
              <span className={`${isActive ? "text-blue-600 dark:text-blue-400" : "hover:text-blue-600 dark:hover:text-blue-400"} transition-colors`}>{label}</span>
              <span className={`absolute bottom-[-8px] left-0 right-0 mx-auto h-[2px] bg-blue-600 rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0"}`} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
