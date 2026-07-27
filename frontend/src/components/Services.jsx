import "./Services.css";
import { CiGlobe } from "react-icons/ci";
import { FaPalette } from "react-icons/fa6";
import { FaServer, FaDatabase, FaCloud } from "react-icons/fa";
import { useEffect } from "react";
import gsap from "gsap";

function Services() {
  const services = [
    {
      icon: CiGlobe,
      title: "Website Development",
      description:
        "Building modern, responsive websites with cutting-edge technologies and best practices.",
      features: ["Custom Web Apps", "E-commerce Sites", "Landing Pages"],
    },
    {
      icon: FaPalette,
      title: "Responsive UI Design",
      description:
        "Creating beautiful, user-friendly interfaces that work seamlessly across all devices.",
      features: ["Mobile-First Design", "Modern Layouts", "Interactive UIs"],
    },
    {
      icon: FaServer,
      title: "Backend API Development",
      description:
        "Developing robust and scalable backend systems with RESTful APIs and secure authentication.",
      features: ["REST APIs", "Authentication", "Business Logic"],
    },
    {
      icon: FaDatabase,
      title: "Database Design",
      description:
        "Designing and optimizing database structures for efficient data management and retrieval.",
      features: ["Schema Design", "Query Optimization", "Data Migration"],
    },
    {
      icon: FaCloud,
      title: "Website Hosting & Maintenance",
      description:
        "Providing reliable hosting solutions and ongoing maintenance to keep your website running smoothly.",
      features: [
        "Cloud Deployment",
        "Performance Monitoring",
        "Regular Updates",
      ],
    },
  ];
  useEffect(() => {
    gsap.fromTo(
      ".services-container .project-header",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".services-container .project-header",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    gsap.fromTo(
      ".services-container .project-card",
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
          trigger: ".services-container .grid-container",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  }, []);
  return (
    <section id="services" className="container">
      <div className="services-container">
        <div className="project-header">
          <span className="section-title">Services I Offer</span>
          <div className="title-line"></div>
          <p className="title-description">
            Comprehensive web development services to bring your ideas to life
          </p>
        </div>

        <div className="grid-container">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="project-card">
                <div className="icon-container">
                  <Icon className="text-primary" size={32} />
                </div>

                <div>
                  <h3 className="project-title">{service.title}</h3>
                  <p className="title-description">{service.description}</p>
                </div>

                <ul className="features-list">
                  {service.features.map((feature, i) => (
                    <li key={i} className="list-item">
                      <div className="dot"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
