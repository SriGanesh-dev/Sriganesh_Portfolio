import { FaGithub, FaLinkedin } from "react-icons/fa";
import {CiMail ,CiHeart} from "react-icons/ci"
import "./Footer.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/SriGanesh-dev", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/sri-ganesh-b-8852a1330", label: "LinkedIn" },
    { icon: CiMail, href: "mailto:sriganeshbm07@gmail.com", label: "Email" },
  ];
  useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "top 90%",
      toggleActions: "play reverse play reverse",
    },
  });

  tl.fromTo(
    ".footer-brand",
    {
      opacity: 0,
      x: -60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    }
  )
    .fromTo(
      ".footer-links",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .fromTo(
      ".footer-connect",
      {
        opacity: 0,
        x: 60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .fromTo(
      ".social-link",
      {
        opacity: 0,
        scale: 0,
        rotation: -180,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    )
    .fromTo(
      ".footer-bottom",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.2"
    );

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-title">Sriganesh</div>
            <p className="footer-description">
              Full-Stack Web Developer passionate about creating modern,
              scalable web applications.
              
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="links-grid">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-connect">
            <h4 className="footer-heading">Connect</h4>
            <div className="socials">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                  >
                    <Icon className="social-icon" size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>© {currentYear} Sriganesh. All rights reserved.</p>
            <p className="made-with">
              Made with <CiHeart className="heart" size={16} fill="currentColor" /> by Sriganesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
