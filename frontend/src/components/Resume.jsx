import { useEffect, useState } from "react";
import "./Resume.css";
import { AiFillFileText } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AlertModal from "./AlertModal";
import LoadingPage from "./LoadingPage";

gsap.registerPlugin(ScrollTrigger);

function Resume() {
  const [isPreparingDownload, setIsPreparingDownload] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: "", message: "", type: "info" });

  useEffect(() => {
    gsap.fromTo(
      ".resume-section",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: ".resume-section",
          start: "top 90%",
          end: "bottom 40%",
          scrub: true,
        },
      },
    );
  }, []);

  const handleDownload = (event) => {
    event.preventDefault();

    if (!navigator.onLine) {
      setModalState({
        isOpen: true,
        title: "You are offline",
        message: "Reconnect to the internet to download the resume.",
        type: "error",
      });
      return;
    }

    setIsPreparingDownload(true);
    window.open("http://localhost:5000/api/resume/download", "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      setIsPreparingDownload(false);
      setModalState({
        isOpen: true,
        title: "Resume ready",
        message: "Sriganesh_B resume downloaded successfully.",
        type: "success",
      });
    }, 1200);
  };

  if (isPreparingDownload) {
    return <LoadingPage title="Preparing resume" message="Please wait while your download is being prepared." />;
  }

  return (
    <section id="resume" className="container">
      <div className="resume-section">
        <div className="resume-content">
          <div className="resume-icon-container">
            <AiFillFileText className="resume-icon" size={48} />
          </div>

          <span className="section-title">
            Want to know more about my skills and experience?
          </span>

          <p className="resume-desc">
            Download my resume to get detailed information about my education,
            projects, skills, and professional journey.
          </p>

          <a
            href="http://localhost:5000/api/resume/download"
            className="resume-dnl-btn"
            onClick={handleDownload}
          >
            <FaFileDownload size={20} />
            Download Resume
          </a>
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

export default Resume;
