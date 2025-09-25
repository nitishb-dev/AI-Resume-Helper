import React, { useRef, useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Home } from "../components/Home";
import Features from "../components/Features";
import { About } from "../components/About";
import { Footer } from "../components/Footer";

export const LandingPage: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (sectionId: string) => {
    switch (sectionId) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "features":
        featuresRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "about":
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  useEffect(() => {
    const sections = [homeRef, aboutRef, featuresRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Triggers when the section is in the middle of the viewport
      }
    );

    sections.forEach((sectionRef) => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    });

    return () => {
      sections.forEach((sectionRef) => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      });
    };
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 scroll-smooth">
      {/* Navbar */}
      <Navbar onNavClick={handleNavClick} activeSection={activeSection} />

      {/* Home Section */}
      <section
        id="home"
        ref={homeRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-16 lg:px-32 py-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
      >
        <Home />
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-32 py-20 bg-white dark:bg-slate-900"
      >
        <About />
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-32 py-20 bg-slate-100 dark:bg-slate-800"
      >
        <Features />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
