import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Components
import LoadingScreen from './LoadingScreen';
import CustomCursor from './CustomCursor';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Hide loading screen after components are loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
    
    return () => clearTimeout(timer);
  }, []);
  
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };
  
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          lerp: 0.075, // Linear interpolation, lower = smoother
          multiplier: 0.9, // Scroll speed multiplier
          tablet: {
            smooth: true,
            breakpoint: 1024,
          },
          smartphone: {
            smooth: false, // Disable smooth scrolling on mobile
          },
        }}
        watch={[]}
        containerRef={containerRef}
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="App"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            data-scroll-container
            ref={containerRef}
          >
            <Header />
            <main>
              <Hero />
              <About />
              <Services />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </LocomotiveScrollProvider>
    </>
  );
};

export default App;