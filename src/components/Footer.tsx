import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/nitishb-dev",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/nitishb-dev",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:nitishdeveloper2003@gmail.com",
    },
  ];

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto py-6 px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left">
          &copy; {new Date().getFullYear()} AI Resume Helper. All Rights Reserved.
        </p>
        <div className="flex items-center space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              <link.icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};