import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ParticleBackground.css";

gsap.registerPlugin(ScrollTrigger);

const createParticlePositions = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 90 + 5}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
  }));

const createCodePositions = (symbols) =>
  symbols.map((symbol, index) => ({
    id: index,
    symbol,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 90 + 5}%`,
    animationDelay: `${Math.random() * 5}s`,
  }));

function ParticleBackground() {
  const codeSymbols = useMemo(
    () => ["</>","{}","React", "Node","Express","HTML","CSS","JS","TS","API","JSON","MongoDB","MySQL"],
    [],
  );

  const [particles, setParticles] = useState(() => createParticlePositions(24));
  const [codePositions, setCodePositions] = useState(() => createCodePositions(codeSymbols));
  const particleRefs = useRef([]);
  const codeRefs = useRef([]);

  useEffect(() => {
    gsap.to(".portfolio-particles", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    const interval = window.setInterval(() => {
      setParticles(createParticlePositions(24));
      setCodePositions(createCodePositions(codeSymbols));
    }, 8000);

    return () => {
      window.clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [codeSymbols]);

  useEffect(() => {
    particleRefs.current.forEach((element, index) => {
      const target = particles[index];
      if (!element || !target) return;

      gsap.to(element, {
        left: target.left,
        top: target.top,
        duration: 2.6,
        ease: "power2.out",
      });
    });

    codeRefs.current.forEach((element, index) => {
      const target = codePositions[index];
      if (!element || !target) return;

      gsap.to(element, {
        left: target.left,
        top: target.top,
        duration: 2.6,
        ease: "power2.out",
      });
    });
  }, [particles, codePositions]);

  return (
    <div className="portfolio-particles" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={`particle-${particle.id}`}
          ref={(element) => {
            particleRefs.current[index] = element;
          }}
          className="portfolio-particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}

      {codePositions.map((item, index) => (
        <span
          key={`code-${item.id}`}
          ref={(element) => {
            codeRefs.current[index] = element;
          }}
          className="portfolio-particle-code"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.animationDelay,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}

export default ParticleBackground;
