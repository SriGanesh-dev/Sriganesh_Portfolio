import './Skills.css';
import { FaReact, FaNodeJs, FaDatabase, FaTools,FaGithub, FaCss3Alt, FaJava } from "react-icons/fa";
import { AiFillHtml5 } from "react-icons/ai";
import { SiJavascript, SiExpress, SiMysql, SiC } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Skills(){
    const myskills = [
    { name: "HTML", icon: AiFillHtml5, level: 90, color: "#ff4c1b" },
    { name: "CSS", icon: FaCss3Alt, level: 85, color: "#0094f6" },
    { name: "JavaScript", icon: SiJavascript, level: 88, color: "#fbbf24" },
    { name: "React", icon: FaReact, level: 85, color: "#0ea5e9" },
    { name: "Node.js", icon: FaNodeJs, level: 80, color: "#10b981" },
    { name: "Express.js", icon: SiExpress, level: 78, color: "#6b7280" },
    { name: "MySQL", icon: FaDatabase, level: 82, color: "#3b82f6" },
    { name: "Git", icon: FaGitAlt, level: 85, color: "#ef4444" },
    { name: "GitHub", icon: FaGithub, level: 85, color: "#a855f7" },
    // { name: "Cybersecurity", icon: FaTools, level: 70, color: "#6366f1" },
  ];
  useEffect(() => {
  gsap.fromTo(
    ".skill-card",
    {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
}, []);
const handleMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
};
    return(<>
    <section id="skills" className="container">
      <div className="skills-container">
        <div className="skills-header">
          <span className="title">
            Skills & Technologies
          </span>
          <div className="title-line"></div>
          <p className="title-description">
            My technical expertise spans across modern web development
            technologies and tools
          </p>
        </div>

        <div className="skills-grid">
          {myskills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="skill-card"
                onMouseMove={handleMouseMove}
              >
                  <div className="icon-background" style={{ backgroundColor: skill.color}}>
                    <Icon className="skill-icon"/>
                  </div>
                  <div className="skill-info">
                    <h3>{skill.name}</h3>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>);
}

export default Skills;