import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom styles with exact theme colors
const themeColors = {
  red: '#ff0000',
  redAlt: '#dc2626',
  white: '#ffffff',
  black: '#000000'
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef(null);
  const navLinksRef = useRef(null);
  
  // Locomotive Scroll integration
  const { scroll } = useLocomotiveScroll();
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Scrolling down - hide
      } else {
        setIsVisible(true); // Scrolling up - show
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Locomotive Scroll integration
  useEffect(() => {
    if (scroll) {
      scroll.on('scroll', ({ scroll }) => {
        const currentScrollY = scroll.y;
        
        // Show/hide header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false); // Scrolling down - hide
        } else {
          setIsVisible(true); // Scrolling up - show
        }
        
        setLastScrollY(currentScrollY);
      });
    }
  }, [scroll, lastScrollY]);

  // GSAP animations
  useEffect(() => {
    // Header slide animation based on visibility
    gsap.to(headerRef.current, {
      yPercent: isVisible ? 0 : -100,
      duration: 0.4,
      ease: 'power3.out'
    });
    
    // Stagger animation for nav links on mount
    if (navLinksRef.current) {
      const navItems = navLinksRef.current.querySelectorAll('li');
      gsap.from(navItems, {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
      });
    }
  }, [isVisible]);

  // Animation variants for Framer Motion
  const menuItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }),
    exit: { 
      opacity: 0, 
      x: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-lg border-b shadow-lg`}
      style={{
        backgroundColor: `rgba(${parseInt(themeColors.black.slice(1, 3), 16)}, ${parseInt(themeColors.black.slice(3, 5), 16)}, ${parseInt(themeColors.black.slice(5, 7), 16)}, 0.75)`,
        borderColor: `rgba(${parseInt(themeColors.white.slice(1, 3), 16)}, ${parseInt(themeColors.white.slice(3, 5), 16)}, ${parseInt(themeColors.white.slice(5, 7), 16)}, 0.1)`,
        boxShadow: `0 10px 15px -3px rgba(${parseInt(themeColors.black.slice(1, 3), 16)}, ${parseInt(themeColors.black.slice(3, 5), 16)}, ${parseInt(themeColors.black.slice(5, 7), 16)}, 0.1)`
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex-shrink-0 relative overflow-hidden group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-white text-xl md:text-2xl font-bold">
            Quantum<motion.span 
              style={{ color: themeColors.red }} 
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Works
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5"
                style={{ backgroundColor: themeColors.redAlt }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </h1>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul ref={navLinksRef} className="flex space-x-8">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item, i) => (
              <motion.li 
                key={item} 
                className="relative overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              >
                <motion.a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white text-sm uppercase tracking-wider font-medium relative group"
                  style={{ color: themeColors.white }}
                  whileHover={{ color: themeColors.red }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{ backgroundColor: themeColors.red }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        {/* CTA Button */}
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button 
            style={{ backgroundColor: themeColors.red }}
            className="text-white px-5 py-2 rounded-md text-sm font-medium"
            whileHover={{ 
              backgroundColor: themeColors.redAlt,
              scale: 1.05,
              boxShadow: `0 10px 15px -3px rgba(${parseInt(themeColors.red.slice(1, 3), 16)}, ${parseInt(themeColors.red.slice(3, 5), 16)}, ${parseInt(themeColors.red.slice(5, 7), 16)}, 0.3)`
            }}
            transition={{ duration: 0.2 }}
          >
            Get Started
          </motion.button>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <motion.span 
              className="w-full h-0.5"
              style={{ backgroundColor: themeColors.white }}
              animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="w-full h-0.5"
              style={{ backgroundColor: themeColors.white }}
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="w-full h-0.5"
              style={{ backgroundColor: themeColors.white }}
              animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed top-[72px] right-0 h-screen w-[80%] border-l"
            style={{
              background: `linear-gradient(to bottom, rgba(${parseInt(themeColors.black.slice(1, 3), 16)}, ${parseInt(themeColors.black.slice(3, 5), 16)}, ${parseInt(themeColors.black.slice(5, 7), 16)}, 0.95), rgba(${parseInt(themeColors.black.slice(1, 3), 16)}, ${parseInt(themeColors.black.slice(3, 5), 16)}, ${parseInt(themeColors.black.slice(5, 7), 16)}, 0.9))`,
              backdropFilter: 'blur(16px)',
              borderColor: `rgba(${parseInt(themeColors.white.slice(1, 3), 16)}, ${parseInt(themeColors.white.slice(3, 5), 16)}, ${parseInt(themeColors.white.slice(5, 7), 16)}, 0.1)`,
              boxShadow: `-5px 0 15px rgba(${parseInt(themeColors.black.slice(1, 3), 16)}, ${parseInt(themeColors.black.slice(3, 5), 16)}, ${parseInt(themeColors.black.slice(5, 7), 16)}, 0.3)`
            }}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
          >
            <div className="p-6">
              <nav>
                <ul className="space-y-6 py-8">
                  {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item, i) => (
                    <motion.li 
                      key={item} 
                      className="overflow-hidden"
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.a 
                        href={`#${item.toLowerCase()}`} 
                        className="text-lg font-medium block relative group"
                        style={{ color: themeColors.white }}
                        whileHover={{ color: themeColors.red, x: 5 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                        <motion.span 
                          className="absolute bottom-0 left-0 h-0.5"
                          style={{ backgroundColor: themeColors.red }}
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.button 
                className="mt-8 w-full px-5 py-3 rounded-md text-sm font-medium"
                style={{ 
                  backgroundColor: themeColors.red,
                  color: themeColors.white 
                }}
                whileHover={{ 
                  backgroundColor: themeColors.redAlt,
                  y: -2,
                  boxShadow: `0 10px 15px -3px rgba(${parseInt(themeColors.red.slice(1, 3), 16)}, ${parseInt(themeColors.red.slice(3, 5), 16)}, ${parseInt(themeColors.red.slice(5, 7), 16)}, 0.3)`
                }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;