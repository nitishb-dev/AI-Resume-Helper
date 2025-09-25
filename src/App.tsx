import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import AnalyzeResume from "./components/AnalyzeResume";

const App: React.FC = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Background gradient animation */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite',
        }}
      />

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: 'twinkle 2s infinite alternate',
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center animate-fade-in">
        {/* Rocket */}
        <div
          className="rocket text-7xl md:text-8xl mb-6"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          🚀
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          AI Resume Helper
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl opacity-80 mb-10 max-w-xl">
          This project is currently under construction. Stay tuned!
        </p>

        {/* Social links */}
        <div className="flex gap-5">
          <a
            href="mailto:nitishb057@gmail.com"
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl hover:bg-white/30 hover:scale-110 transition"
            title="Email"
          >
            📧
          </a>
          <a
            href="https://www.linkedin.com/in/nitishb-dev/"
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl hover:bg-white/30 hover:scale-110 transition"
            title="LinkedIn"
          >
            💼
          </a>
          <a
            href="https://github.com/nitishb-dev"
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl hover:bg-white/30 hover:scale-110 transition"
            title="GitHub"
          >
            ⚡
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
