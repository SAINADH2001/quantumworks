import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// Custom hook for magnetic effect
const useMagneticEffect = () => {
  const elementRef = useRef(null);
  
  const handleMagneticMove = (e) => {
    const element = elementRef.current;
    if (!element) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = element.getBoundingClientRect();
    
    // Calculate the center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate the distance from mouse to center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Calculate the magnetic pull (stronger when closer)
    const magneticX = distanceX * 0.2; // Adjust strength as needed
    const magneticY = distanceY * 0.2;
    
    // Apply the magnetic effect
    gsap.to(element, {
      x: magneticX,
      y: magneticY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  const resetMagneticEffect = () => {
    const element = elementRef.current;
    if (!element) return;
    
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };
  
  // Return the ref and event handlers for use in components
  return {
    ref: elementRef,
    onMouseMove: handleMagneticMove,
    onMouseLeave: resetMagneticEffect
  };
};

// Project card component
const ProjectCard = ({ project }) => {
  const magnetic = useMagneticEffect();
  
  return (
    <motion.div 
      {...magnetic}
      className="project-card bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.image || `https://via.placeholder.com/400x300?text=${project.title}`} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tech.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-500"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <button className="text-red-500 font-medium flex items-center gap-1 group">
          View Project
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 transform transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

// Main component
const Projects = () => {
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Artha AI Assistant",
      tech: ["React", "Node.js", "AI/ML", "NLP"],
      description: "Intelligent AI assistant with natural language processing capabilities",
      image: "https://miro.medium.com/v2/resize:fit:700/1*Rcm3lsWEgZ7UJ6WsKlhSiA.jpeg"},
    {
      id: 2,
      title: "E-commerce Platform",
      tech: ["React", "Node.js", "MongoDB"],
      description: "Modern online store with real-time inventory",
      image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Brand Redesign",
      tech: ["Figma", "Adobe CC"],
      description: "Complete brand identity transformation",
      image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "SaaS Dashboard",
      tech: ["React", "D3.js", "Express"],
      description: "Analytics dashboard with real-time data",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ], []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <section id="projects" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Featured <span className="text-red-500">Projects</span>
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;