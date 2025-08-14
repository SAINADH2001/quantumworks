// This file has been cleared as the CustomCursor component is no longer needed.

// If you need to reuse this file for other purposes, you can add new content here.
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Theme colors
const themeColors = {
  red: '#ff0000',
  redAlt: '#dc2626',
  white: '#ffffff',
  black: '#000000'
};

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Show cursor when mouse moves
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };
    
    // Hide cursor when mouse leaves window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    // Track hoverable elements
    const handleMouseEnter = (e) => {
      if (!e || !e.target) return;
      
      if (e.target.classList && e.target.classList.contains('hoverable') || 
          e.target.tagName === 'BUTTON' || 
          e.target.tagName === 'A' ||
          (e.target.closest && e.target.closest('a')) ||
          (e.target.closest && e.target.closest('button'))) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: {
          type: 'spring',
          damping: 25,
          stiffness: 300,
        },
        opacity: {
          duration: 0.2,
        },
      }}
    >
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: '24px',
          height: '24px',
        }}
      >
        {/* Main cursor circle */}
        <motion.div
          className="absolute rounded-full"
          style={{
            backgroundColor: themeColors.white,
            width: '100%',
            height: '100%',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            border: `1px solid ${themeColors.white}`,
            width: '48px',
            height: '48px',
            opacity: 0.5,
          }}
          animate={{
            scale: isHovering ? 0.6 : [0.8, 1, 0.8],
          }}
          transition={{
            scale: isHovering 
              ? { type: 'spring', damping: 25, stiffness: 300 }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>
    </motion.div>
  );
};

export default CustomCursor;