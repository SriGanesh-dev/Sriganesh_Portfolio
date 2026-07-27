import "./About.css";
import { LuGraduationCap } from "react-icons/lu";
import { IoIosCode } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  useEffect(() => {
    gsap.fromTo(
      ".about-title",
      {
        opacity: 0,
        y: -40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      ".about-pic",
      {
        opacity: 0,
        x: -100,
        rotate: -10,
      },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-pic",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      ".about-description",
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
          trigger: ".about-description",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      ".edu",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".edu",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
    return(
    <>
    <section id="about" className="container">
        <div className="about-title">
            <span className="section-title">About Me</span>
            <span className="title-line"></span>
        </div>
        <div className="about">
        <div className="about-pic">
            <div className="pic-con">
                <FaCode className="code-icon"/>
            </div>
        </div>
        <div className="about-content">
            <div className="about-text">
                <p className="about-description">I’m Sriganesh, a Computer Science Engineering student and aspiring Full-Stack Web Developer. I enjoy building modern, responsive, and user-friendly web applications using modern technologies. I’m focused on improving my development skills by creating real-world projects and learning industry-level web development practices.</p>
            </div>
            <div className="edu">
                <div className="edu-icon">
                    <LuGraduationCap />
                </div>
                <div className="edu-text">
                    <h3 className="edu-title">Education</h3>
                    <p className="edu-description">Bachelor of Science in Computer Science Engineering, Alagappa chettiar govt college of engineering and technology (2024-2028)</p>
                </div>
            </div>
            <div className="edu">
                <div className="fullstack-icon">
                    <IoIosCode />
                </div>
                <div className="edu-text">
                    <h3 className="edu-title">Full-Stack Developer</h3>
                    <p className="edu-description">Experienced in building scalable web applications using modern technologies.</p>
                </div>
            </div>
            {/* <div className="edu">
                <div className="fullstack-icon">
                    <IoIosCode />
                </div>
                <div className="edu-text">
                    <h3 className="edu-title">Full-Stack Developer</h3>
                    <p className="edu-description">Experienced in building scalable web applications using modern technologies.</p>
                </div>
            </div> */}
        </div>  
        </div>
    </section>
    </>);
}

export default About;