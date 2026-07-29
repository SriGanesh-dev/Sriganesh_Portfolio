import React, { useEffect } from "react";
import profilePic from "../assets/image.png";
import "./Hero.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  useEffect(() => {
    gsap.fromTo(
      ".hero-content",
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-content",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    gsap.fromTo(
      ".hero-image",
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    gsap.fromTo(
      ".hero-name",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero-name",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    // Particle layer scroll movement
    gsap.to(".particles", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="hero" className="container">
      <div className="hero">
        <div className="hero-content">
          <p className="wlm-txt">Welcome to My Portfolio</p>
          <h1>
            <span className="hero-name">Hi, I'm SriGanesh</span>
          </h1>
          <p className="hero-desc">
            A passionate Frontend Developer crafting engaging web experiences.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="hire-me-btn">
              View Projects
            </a>
            <a href="#contact" className="contact-btn">
              Contact Me
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-top">
            <div className="dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="line"></span>
          </div>
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <p className="terminal-output">
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1500,
                "Freelance React Developer",
                1500,
                "Building Modern Web Applications",
                1500,
                "React • Node.js • Express.js • MySQL",
                1500,
                "Turning Ideas into Digital Solutions",
                1500,
                "Open to Internships & Opportunities",
                1500,
              ]}
              speed={60}
              repeat={Infinity}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
