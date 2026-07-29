import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Project from './components/Project';
import Contact from './components/Contact';
import Services from './components/Services';
import './styles/global.css';
import Resume from './components/Resume';
import Footer from './components/Footer';
import OfflinePage from './components/OfflinePage';
import PageNotFound from './components/PageNotFound';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handlePathChange = () => setCurrentPath(window.location.pathname);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  if (!isOnline) {
    return <OfflinePage />;
  }

  if (currentPath !== '/') {
    return <PageNotFound />;
  }

  return (
    <>
      <ParticleBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Project />
      <Services />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
