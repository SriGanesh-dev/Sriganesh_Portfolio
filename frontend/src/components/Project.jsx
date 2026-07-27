import "./Project.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Project() {
  const projects = [
    {
      title: "Green Crown",
      description:
        "Developed and deployed the official website for Green Crown as a freelance project. Built a modern, responsive business website with engaging GSAP animations, integrated EmailJS for enquiry form submissions, and WhatsApp integration for instant customer communication. Designed to enhance the company's online presence and improve customer engagement.",
      tech: ["React", "GSAP", "EmailJS", "WhatsApp Integration"],
      liveDemo: "https://greencrown.in",
      github: "#", // Private Client Project
    },
    {
      title: "SWAG Coaching Center",
      description:
        "Designed and launched the official website for SWAG Coaching Center as a freelance project. Developed a responsive and interactive platform featuring smooth GSAP animations, EmailJS-powered admission enquiry forms, and direct WhatsApp integration, enabling students and parents to easily connect with the institute and explore its courses.",
      tech: ["React", "GSAP", "EmailJS", "WhatsApp Integration"],
      liveDemo: "https://swagcoachingcenter.in",
      github: "#", // Private Client Project
    },
    {
      title: "Placement Portal",
      description:
        "A full-stack campus recruitment management system currently under development. The platform provides role-based dashboards for students, placement officers, and administrators, enabling company drive management, student applications, profile management, notifications, and secure authentication to streamline the campus recruitment process.",
      tech: ["React", "Node.js", "Express.js", "MySQL"],
      liveDemo: "#", // Under Development
      github: "#",
    },
    {
      title: "ACCET Connect",
      description:
        "An all-in-one digital platform for ACCET students and alumni, currently under development. The application connects students, alumni, and faculty through project showcases, mentorship opportunities, event updates, resource sharing, and a collaborative community to strengthen academic and professional networking.",
      tech: ["React", "Node.js", "Express.js", "MySQL"],
      liveDemo: "#", // Under Development
      github: "#",
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      ".projects-container .project-header",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".projects-container .project-header",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    gsap.fromTo(
      ".projects-container .project-card",
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-container .grid-container",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  }, []);

  return (
    <section id="projects" className="container">
      <div className="projects-container">
        <div className="project-header">
          <span className="section-title">Featured Projects</span>
          <div className="title-line"></div>
          <p className="title-description">
            Here are some of my recent projects that showcase my skills in
            full-stack development
          </p>
        </div>

        <div className="grid-container">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                <div className="tags-container">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.liveDemo && project.liveDemo !== "#" && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link"
                    >
                      Live Demo
                    </a>
                  )}

                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
