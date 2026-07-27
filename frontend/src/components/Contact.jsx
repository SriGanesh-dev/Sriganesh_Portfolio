import React, { useState, useEffect } from "react";
import "./Contact.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AlertModal from "./AlertModal";
import LoadingPage from "./LoadingPage";

gsap.registerPlugin(ScrollTrigger);



function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      setModalState({
        isOpen: true,
        title: "You are offline",
        message: "Please reconnect to the internet and try sending your message again.",
        type: "error",
      });
      return;
    }

    setIsSending(true);

    try {
      await axios.post("https://sriganesh-portfolio-bogx.onrender.com/api/contact/send", formData);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setModalState({
        isOpen: true,
        title: "Email sent",
        message: "Your message was sent successfully. I will get back to you soon.",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setModalState({
        isOpen: true,
        title: "Message failed",
        message: "The message could not be sent right now. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
  gsap.fromTo(".contact-container .project-header",
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".contact-container .project-header",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );

  gsap.fromTo(".contact-form",
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );

  gsap.fromTo(".connect-container",
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".connect-container",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );

  gsap.fromTo(".mail-container .edu",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".mail-container",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
  gsap.fromTo(
  ".msg",
  {
    opacity: 0,
    y: 60,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".msg",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },
  }
);
}, []);

  if (isSending) {
    return <LoadingPage title="Sending email" message="Please wait while your message is on its way." />;
  }

  return (
    <section className="container" id="contact">
      <div className="contact-container">
        <div className="project-header">
          <h2 className="section-title">
            Get In Touch
          </h2>
          <div className="title-line"></div>
          <p className="title-description">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </div>

        <div className="contact-grid">
            <div className="contact-form">
              <form onSubmit={handleSubmit} className="form">
                <div>
                  <label className="labletag">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="inputtag"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="labletag">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="inputtag"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="labletag">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="inputtag"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="labletag">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="inputtag"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  <IoMdSend size={20} />
                  Send Message
                </button>
              </form>
          </div>
          
            <div className="connect-container">
              <h3 className="connect-title">Connect With Me</h3>

              <div className="mail-container">
                <a
                  href="mailto:sriganeshbm07@gmail.com"
                  className="edu"
                >
                  <div className="icon-container">
                    <CiMail className="icon" size={24} />
                  </div>
                  <div className="edu-text">
                    <div className="edu-title">Email</div>
                    <div className="edu-desc">
                      sriganeshbm07@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/SriGanesh-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edu"
                >
                  <div className="icon-container">
                    <FaGithub className="icon" size={24} />
                  </div>
                  <div className="edu-text">
                    <div className="edu-title">GitHub</div>
                    <div className="edu-desc">
                      github.com/ganesh
                    </div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/sri-ganesh-b-8852a1330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edu"
                >
                  <div className="icon-container">
                    <FaLinkedin className="icon" size={24} />
                  </div>
                  <div className="edu-text">
                    <div className="edu-title">
                      LinkedIn
                    </div>
                    <div className="edu-desc">
                      linkedin.com/in/sriganesh
                    </div>
                  </div>
                </a>
              </div>
            

            <div className="msg">
              <h3 className="msg-title">Let's Build Something Amazing!</h3>
              <p className="msg-txt">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>
            </div>
          </div>
      </div>

      <AlertModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        confirmLabel="Close"
      />
    </section>
  );
}

export default Contact;