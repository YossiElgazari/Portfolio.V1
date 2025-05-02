import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Intro from './components/Intro';
import Contact from './components/sections/Contact';
import RotatingCircularText from './components/RotatingCircularText';
import Footer from './components/Footer';

import { gsap } from 'gsap';

import 'normalize.css';

function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
  };

  useEffect(() => {
    if (introCompleted) {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [introCompleted]);

  useEffect(() => {
    if (introCompleted) {
      gsap.to('#main', { opacity: 1, duration: 0.5 });
    }
  }, [introCompleted]);


  return (
    <>
      {/* Global Wrapper */}
      <div className="min-h-[100vh]">
        {/* Intro - animation and overflow handling */}
        <Intro onIntroComplete={handleIntroComplete} />

        {/* Main content hidden initially */}
        <div id="main">
          <Navbar introCompleted={introCompleted} />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>

        {/* Rotating Circular Text */}
        <RotatingCircularText introCompleted={introCompleted} />
      </div>
    </>
  );
}


export default App;
