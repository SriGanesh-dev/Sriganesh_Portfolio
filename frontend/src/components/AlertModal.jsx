import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./StateStyles.css";

function AlertModal({ isOpen, title, message, type = "info", onClose, confirmLabel = "OK" }) {
  const iconRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "elastic.out(1, 0.55)" }
      );
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconMap = {
    success: "✓",
    error: "!",
    info: "i",
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className={`modal-card ${type}`}>
        <div ref={iconRef} className="modal-icon" aria-hidden="true">
          {iconMap[type] || iconMap.info}
        </div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-button" onClick={onClose}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
