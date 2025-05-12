import { useState, useEffect } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // To toggle menu open/close

  // Handle scroll event
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
        scrolled ? "bg-black" : "bg-transparent"
      } text-white fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-wide text-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-400">
          MyPortfolio
        </h1>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden">
          <button
            className="btn btn-circle swap swap-rotate"
            onClick={() => setMenuOpen(!menuOpen)} // Toggle menu open/close
          >
            {/* Hamburger icon */}
            {!menuOpen && (
              <svg
                className={`swap-off fill-current ${scrolled ? "text-white" : "text-black"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            )}

            {/* Close icon */}
            {menuOpen && (
              <svg
                className={`swap-on fill-current ${scrolled ? "text-white" : "text-black"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon
                  points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation links for desktop */}
        <nav className="space-x-8 flex items-center hidden lg:flex">
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

      {/* Mobile Menu (always transparent) */}
      <div className={`lg:hidden ${menuOpen ? "block" : "hidden"} bg-transparent`}>
        <nav className="flex flex-col items-center space-y-4 p-4">
          <a
            href="#home"
            className="text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
