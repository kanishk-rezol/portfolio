import { useState, useEffect } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Track if the page has been scrolled to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      } text-white fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Title with glowing effect */}
        <h1 className="text-4xl font-extrabold tracking-wide text-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-400">
          MyPortfolio
        </h1>
        
        <nav className="space-x-8 flex items-center">
          <a
            href="#home"
            className="relative text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 transition-all duration-300 ease-in-out group-hover:scale-x-100"></span>
          </a>
          <a
            href="#about"
            className="relative text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 transition-all duration-300 ease-in-out group-hover:scale-x-100"></span>
          </a>
          <a
            href="#projects"
            className="relative text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 transition-all duration-300 ease-in-out group-hover:scale-x-100"></span>
          </a>
          <a
            href="#contact"
            className="relative text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 transition-all duration-300 ease-in-out group-hover:scale-x-100"></span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
