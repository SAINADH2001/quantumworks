import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Theme colors
const themeColors = {
  red: '#ff0000',
  redAlt: '#dc2626',
  white: '#ffffff',
  black: '#000000'
};

const Hero = () => {
  // Refs
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const shapesRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  // Mouse position for cursor follow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse movement to smaller values for subtle effect
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // State for magnetic buttons
  // Remove these lines
  // const [magneticProps, setMagneticProps] = useState({ x: 0, y: 0 });
  // const controls = useAnimation();
  const buttonRef = useRef(null);
  const secondButtonRef = useRef(null);
  
  // Animation controls
  const controls = useAnimation();
  
  // Handle mouse move for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the container
    const xPos = clientX - left - width / 2;
    const yPos = clientY - top - height / 2;
    
    // Update motion values
    mouseX.set(xPos);
    mouseY.set(yPos);
    x.set(xPos);
    y.set(yPos);
  };
  
  // Magnetic button effect
  const handleMagneticMove = (e, buttonElement) => {
    if (!buttonElement) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonElement.getBoundingClientRect();
    
    // Calculate the center of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate the distance from mouse to center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Calculate the magnetic pull (stronger when closer)
    const magneticX = distanceX * 0.2; // Adjust strength as needed
    const magneticY = distanceY * 0.2;
    
    // Apply the magnetic effect
    gsap.to(buttonElement, {
      x: magneticX,
      y: magneticY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  // Reset magnetic effect when mouse leaves
  const resetMagneticEffect = (buttonElement) => {
    if (!buttonElement) return;
    
    gsap.to(buttonElement, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };
  
  // Initialize animations
  useEffect(() => {
    // Create geometric shapes
    const shapes = [];
    const shapesContainer = shapesRef.current;
    const numShapes = 10;
    
    // Create and append shapes
    for (let i = 0; i < numShapes; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 100 + 50; // Random size between 50-150px
      const isCircle = Math.random() > 0.5;
      
      // Apply styles
      shape.style.position = 'absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.opacity = '0.1';
      shape.style.zIndex = '0';
      
      // Randomly choose between circle and square
      if (isCircle) {
        shape.style.borderRadius = '50%';
      } else {
        shape.style.transform = `rotate(${Math.random() * 45}deg)`;
      }
      
      // Randomly position shapes
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      // Alternate between red and white
      shape.style.backgroundColor = i % 2 === 0 ? themeColors.red : themeColors.white;
      
      shapesContainer.appendChild(shape);
      shapes.push(shape);
    }
    
    // Animate shapes with GSAP
    shapes.forEach((shape) => {
      // Random duration and delay for varied movement
      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      // Create floating animation
      gsap.to(shape, {
        x: `${Math.random() * 100 - 50}px`,
        y: `${Math.random() * 100 - 50}px`,
        rotation: `${Math.random() * 360}`,
        duration,
        delay,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    });
    
    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    
    // Parallax effect on scroll
    gsap.fromTo(
      shapesContainer,
      { y: 0 },
      {
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );
    
    // Clean up animations on unmount
    return () => {
      shapes.forEach(shape => {
        if (shapesContainer.contains(shape)) {
          shapesContainer.removeChild(shape);
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Text animation variants
  // Update animation variants for smoother transitions
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9], // Updated to valid cubic-bezier
        staggerChildren: 0.1
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9], // Updated to valid cubic-bezier
        delay: 0.2
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9], // Updated to valid cubic-bezier
        delay: 0.4
      }
    }
  };
  
  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 1.2
      }
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${themeColors.black} 0%, ${themeColors.black} 85%, ${themeColors.redAlt}22 100%)`
      }}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
    >
      {/* Animated shapes background */}
      <div ref={shapesRef} className="absolute inset-0 overflow-hidden z-0"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 z-10 text-center relative">
        <motion.div
          style={{
            rotateX,
            rotateY,
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
          className="max-w-5xl mx-auto"
        >
          {/* Main heading */}
          <motion.h1 
            ref={headingRef}
            className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight"
            variants={headingVariants}
          >
            Crafting Digital Excellence
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            variants={textVariants}
          >
            We transform ideas into powerful digital experiences
          </motion.p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Primary CTA */}
            <motion.div
              custom={0}
              variants={buttonVariants}
              onMouseMove={(e) => handleMagneticMove(e, buttonRef.current)}
              onMouseLeave={() => resetMagneticEffect(buttonRef.current)}
            >
              <button 
                ref={buttonRef}
                className="px-8 py-3 rounded-md text-white font-medium relative overflow-hidden group"
                style={{ backgroundColor: themeColors.red }}
                onClick={() => window.location.href = '#projects'}
              >
                <span className="relative z-10">View Our Work</span>
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: themeColors.redAlt }}
                ></span>
              </button>
            </motion.div>
            
            {/* Secondary CTA */}
            <motion.div
              custom={1}
              variants={buttonVariants}
              onMouseMove={(e) => handleMagneticMove(e, secondButtonRef.current)}
              onMouseLeave={() => resetMagneticEffect(secondButtonRef.current)}
            >
              <button 
                ref={secondButtonRef}
                className="px-8 py-3 rounded-md text-white font-medium relative overflow-hidden group border-2 border-white/30 hover:border-white transition-colors duration-300"
                onClick={() => window.location.href = '#contact'}
              >
                <span className="relative z-10">Get In Touch</span>
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: themeColors.white }}
                ></span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        variants={scrollIndicatorVariants}
      >
        <span className="text-white/50 text-sm mb-2">Scroll</span>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/50"
        >
          <path 
            d="M12 5L12 19M12 19L19 12M12 19L5 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      
      {/* Mouse follower effect */}
      <motion.div
        className="hidden md:block w-12 h-12 rounded-full pointer-events-none fixed z-50 mix-blend-difference"
        style={{
          backgroundColor: themeColors.white,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0.2
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.section>
  );
};

export default Hero;