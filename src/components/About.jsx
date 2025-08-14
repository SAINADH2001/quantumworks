import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
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

const About = () => {
  // Refs
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  
  // State for counter animation
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    years: 0
  });
  
  // Animation controls
  const controls = useAnimation();
  
  // Card content
  const cards = [
    {
      title: "Our Mission",
      content: "Transform digital landscapes through innovative solutions that empower businesses to reach their full potential in the modern tech ecosystem."
    },
    {
      title: "Our Vision",
      content: "Lead the industry in technological innovation, creating digital experiences that inspire, engage, and drive meaningful results for our clients worldwide."
    },
    {
      title: "Our Values",
      content: "Excellence in every detail, creativity that breaks boundaries, and results that exceed expectations. We're committed to integrity and continuous growth."
    }
  ];
  
  // Stats data
  const stats = [
    { label: "Projects", value: 100, symbol: "+" },
    { label: "Clients", value: 50, symbol: "+" },
    { label: "Years", value: 5, symbol: "+" }
  ];
  
  // ScrollTrigger for section reveal
  useEffect(() => {
    // Section reveal animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Cards stagger animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Image scale animation
    gsap.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Stats counter animation
    const statsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate each stat counter
    stats.forEach((stat, index) => {
      statsTimeline.to(
        counters,
        {
          duration: 2,
          ease: "power2.out",
          [Object.keys(counters)[index]]: stat.value,
          roundProps: Object.keys(counters)[index],
          onUpdate: () => {
            setCounters(prevCounters => ({
              ...prevCounters,
              [Object.keys(counters)[index]]: Math.round(gsap.getProperty(counters, Object.keys(counters)[index]))
            }));
          }
        },
        "<"
      );
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Card hover variants for Framer Motion
  const cardVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.05, 
      boxShadow: `0 10px 25px rgba(${parseInt(themeColors.red.slice(1, 3), 16)}, ${parseInt(themeColors.red.slice(3, 5), 16)}, ${parseInt(themeColors.red.slice(5, 7), 16)}, 0.3)`,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 text-white"
      id="about"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold mb-16 text-center">
          About <span className="text-red-600">QuantumWorks</span>
        </h2>
        
        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="card bg-gray-900 p-8 rounded-lg border-l-4 border-red-500 flex flex-col h-full"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-red-500">{card.title}</h3>
              <p className="text-lg text-gray-300 flex-grow">{card.content}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Stats and Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-gray-800 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold text-red-500 mb-2">
                  {counters[Object.keys(counters)[index]]}{stat.symbol}
                </h3>
                <p className="text-xl text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Team Image */}
          <motion.div 
            ref={imageRef}
            className="relative overflow-hidden rounded-lg h-80 lg:h-96"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            {/* Placeholder image with red overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/80 to-red-900/50 z-10"></div>
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-0">
              <p className="text-2xl font-bold text-gray-600">Team Image</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;