import React, { useState, useEffect } from 'react';
import './App.css';
// Import components
import LoadingScreen from './components/LoadingScreen';
// Removed CustomCursor import
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Define page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.61, 1, 0.88, 1] // Using valid cubic-bezier values
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5
    }
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple loading timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Use isLoading to conditionally render
  if (isLoading) return <LoadingScreen />;

  return (
    <div className="App">
      {/* Removed CustomCursor component */}
      
      <AnimatePresence mode="wait">
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
        >
          <Header />
          <main>
            <Hero id="home" />
            <About id="about" />
            <Services id="services" />
            <Projects id="projects" />
            <Contact id="contact" />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;