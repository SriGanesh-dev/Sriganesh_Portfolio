import { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
  const tl = gsap.timeline();

  tl.fromTo(
    ".gradient-text",
    {
      opacity: 0,
      x: -60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    }
  ).fromTo(
    ".nav-links li",
    {
      opacity: 0,
      y: -30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: "back.out(1.2)",
    }
  );
}, []);

  const navItems = [
    { name: "Home", link: "#hero" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Services", link: "#services" },
    { name: "Resume", link: "#resume" },
    { name: "Contact", link: "#contact" },
  ];

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -3,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  return (
    <div className="navdiv">
      <nav className="navbar">
        {/* Logo */}
        <div className="gradient-text">
          &lt; SRIGANESH /&gt;
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <li
              key={item.name}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.link}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}

          {/* <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="hire-me-btn"
              onClick={() => setOpen(false)}
            >
              Hire Me
            </button>
          </li> */}
        </ul>

        {/* Mobile Hamburger */}
        <div
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;