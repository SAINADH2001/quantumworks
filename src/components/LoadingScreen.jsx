import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Theme colors
const themeColors = {
  red: '#ff0000',
  redAlt: '#dc2626',
  white: '#ffffff',
  black: '#000000'
};

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Logo animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9] // Changed -0.01 to 0.01
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9] // Changed -0.01 to 0.01
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9], // Changed -0.01 to 0.01
        delay: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9] // Changed -0.01 to 0.01
      }
    }
  };

  // Progress bar animation variants
  const progressVariants = {
    hidden: { width: '0%' },
    visible: {
      width: '100%',
      transition: {
        duration: 2.2,
        ease: [0.6, 0.05, 0.01, 0.9] // Changed -0.01 to 0.01
      }
    }
  };

  // Screen exit animation
  const screenVariants = {
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9], // Changed -0.01 to 0.01
        delay: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: themeColors.black }}
          initial="visible"
          animate="visible"
          exit="exit"
          variants={screenVariants}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center mb-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={logoVariants}
          >
            <div className="w-16 h-16 bg-red-600 rounded-md mr-4 flex items-center justify-center font-bold text-3xl text-white">Q</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Quantum<motion.span
                style={{ color: themeColors.red }}
                className="relative inline-block"
                animate={{
                  color: [themeColors.red, themeColors.redAlt, themeColors.red],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Works
              </motion.span>
            </h1>
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="text-white/70 mb-8 text-lg"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
          >
            Crafting Digital Excellence
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-600"
              initial="hidden"
              animate="visible"
              variants={progressVariants}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;