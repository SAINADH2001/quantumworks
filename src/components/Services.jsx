import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import { BiBrain, BiBot } from "react-icons/bi";
import { MdOutlineAnalytics } from "react-icons/md";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Theme colors
const themeColors = {
  red: '#ff0000',
  redAlt: '#dc2626',
  white: '#ffffff',
  black: '#000000'
};

const Services = () => {
  // Refs
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  
  // Services data
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites & web applications built with modern technologies to deliver exceptional user experiences.",
      icon: "web"
    },
    {
      id: 2,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android that engage users and drive results.",
      icon: "mobile"
    },
    {
      id: 3,
      title: "Generative AI",
      description: "Advanced AI solutions that create content, images, and text using state-of-the-art machine learning models.",
      icon: "genai"
    },
    {
      id: 4,
      title: "Agentic AI",
      description: "Intelligent AI agents that can perform tasks, make decisions, and solve complex problems autonomously.",
      icon: "agent"
    },
    {
      id: 5,
      title: "Digital Marketing",
      description: "Strategic SEO and social media campaigns that increase visibility and drive targeted traffic to your business.",
      icon: "marketing"
    }
  ];
  
  // Render icon based on service type with animated icons
  const renderIcon = (shape) => {
    switch(shape) {
      case 'web':
        return (
          <motion.div 
            className="w-20 h-20 flex items-center justify-center text-red-500"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaLaptopCode className="w-16 h-16" />
          </motion.div>
        );
      case 'mobile':
        return (
          <motion.div 
            className="w-20 h-20 flex items-center justify-center text-red-500"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaMobileAlt className="w-16 h-16" />
          </motion.div>
        );
      case 'genai':
        return (
          <motion.div 
            className="w-20 h-20 flex items-center justify-center text-red-500"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <BiBrain className="w-16 h-16" />
          </motion.div>
        );
      case 'agent':
        return (
          <motion.div 
            className="w-20 h-20 flex items-center justify-center text-red-500"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <BiBot className="w-16 h-16" />
          </motion.div>
        );
      case 'marketing':
        return (
          <motion.div 
            className="w-20 h-20 flex items-center justify-center text-red-500"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MdOutlineAnalytics className="w-16 h-16" />
          </motion.div>
        );
      default:
        return (
          <div className="w-16 h-16 bg-red-600 rounded-md"></div>
        );
    }
  };
  
  // ScrollTrigger for section reveal
  useEffect(() => {
    // Section reveal animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
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
      const cards = cardsRef.current.querySelectorAll('.service-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Card hover variants for Framer Motion
  const cardVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.03, 
      boxShadow: `0 10px 25px rgba(${parseInt(themeColors.red.slice(1, 3), 16)}, ${parseInt(themeColors.red.slice(3, 5), 16)}, ${parseInt(themeColors.red.slice(5, 7), 16)}, 0.3)`,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Text variants for Framer Motion
  const textVariants = {
    initial: { y: 0 },
    hover: { y: -5, transition: { duration: 0.3, ease: "easeOut" } }
  };
  
  // Arrow variants for Framer Motion
  const arrowVariants = {
    initial: { x: 0, opacity: 0.7 },
    hover: { x: 5, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-black text-white relative"
      id="services"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 70%), 
                          radial-gradient(circle at 80% 20%, rgba(255, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 50%)`
      }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff0000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Our <span className="text-red-600">Services</span>
        </h2>
        
        {/* Services Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="service-card group bg-gray-900 p-8 rounded-lg border-b-2 border-transparent hover:border-red-500 flex flex-col h-full transition-colors duration-300"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Icon */}
              <div className="mb-6">
                {renderIcon(service.icon)}
              </div>
              
              {/* Content */}
              <motion.h3 
                className="text-2xl font-bold mb-4 text-white group-hover:text-red-500 transition-colors duration-300"
                variants={textVariants}
              >
                {service.title}
              </motion.h3>
              
              <motion.p 
                className="text-base text-gray-300 mb-6 flex-grow"
                variants={textVariants}
              >
                {service.description}
              </motion.p>
              
              {/* Learn More Link removed */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;