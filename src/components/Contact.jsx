import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);



// Contact component
const Contact = () => {
  // Refs
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Input focus state for floating labels
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Project type options
  const projectTypes = [
    'Web Development',
    'Mobile Apps',
    'Generative AI',
    'Agentic AI',
    'Digital Marketing',
    'Consulting'
  ];
  
  // Social links
  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'GitHub', icon: 'github', url: '#' },
    { name: 'Dribbble', icon: 'dribbble', url: '#' }
  ];
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle input focus
  const handleFocus = (input) => {
    setFocusedInput(input);
  };
  
  // Handle input blur
  const handleBlur = () => {
    setFocusedInput(null);
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Project type validation
    if (!formState.projectType) {
      newErrors.projectType = 'Please select a project type';
    }
    
    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default to handle submission manually

      // Validate form
      const isValid = validateForm();

      if (isValid) {
        setIsSubmitting(true);

        try {
          // Submit form data to Netlify using fetch
          const formData = new FormData(e.target);

          const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
          });

          if (response.ok) {
            // Clear form fields after successful submission
            setFormState({
              name: '',
              email: '',
              projectType: '',
              message: ''
            });

            // Show success message
            setSubmitSuccess(true);

            // Hide success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          setErrors({ submit: 'Failed to send message. Please try again.' });
        } finally {
          setIsSubmitting(false);
        }
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
    
    // Form fields stagger animation
    if (formRef.current) {
      const formFields = formRef.current.querySelectorAll('.form-field');
      gsap.fromTo(
        formFields,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Contact info reveal animation
    if (infoRef.current) {
      const infoItems = infoRef.current.querySelectorAll('.info-item');
      gsap.fromTo(
        infoItems,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
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
  
    
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-black text-white"
      id="contact"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Let's <span className="text-red-600">Work Together</span>
          </h2>
          <p className="text-xl text-gray-300">Ready to transform your digital presence?</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-gray-900 rounded-lg p-8 shadow-xl"
              data-netlify="true"
              name="contact"
              method="POST"
              id="contact-form"
            >
              <input type="hidden" name="form-name" value="contact" />

              {/* Name Field */}
              <div className="form-field mb-6 relative">
                <label 
                  htmlFor="name" 
                  className={`absolute left-4 transition-all duration-200 ${focusedInput === 'name' || formState.name ? 'text-xs text-red-500 top-2' : 'text-gray-400 top-1/2 -translate-y-1/2'}`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={`w-full bg-gray-800 text-white border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-md py-4 px-4 pt-6 focus:outline-none focus:border-red-500 transition-colors duration-200`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              {/* Email Field */}
              <div className="form-field mb-6 relative">
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-200 ${focusedInput === 'email' || formState.email ? 'text-xs text-red-500 top-2' : 'text-gray-400 top-1/2 -translate-y-1/2'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full bg-gray-800 text-white border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md py-4 px-4 pt-6 focus:outline-none focus:border-red-500 transition-colors duration-200`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {/* Project Type Field */}
              <div className="form-field mb-6 relative">
                <label 
                  htmlFor="projectType" 
                  className={`absolute left-4 transition-all duration-200 ${focusedInput === 'projectType' || formState.projectType ? 'text-xs text-red-500 top-2' : 'text-gray-400 top-1/2 -translate-y-1/2'}`}
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formState.projectType}
                  onChange={handleChange}
                  onFocus={() => handleFocus('projectType')}
                  onBlur={handleBlur}
                  className={`w-full bg-gray-800 text-white border ${errors.projectType ? 'border-red-500' : 'border-gray-700'} rounded-md py-4 px-4 pt-6 focus:outline-none focus:border-red-500 transition-colors duration-200 appearance-none`}
                >
                  <option value=""></option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
              </div>
              
              {/* Message Field */}
              <div className="form-field mb-6 relative">
                <label 
                  htmlFor="message" 
                  className={`absolute left-4 transition-all duration-200 ${focusedInput === 'message' || formState.message ? 'text-xs text-red-500 top-2' : 'text-gray-400 top-6'}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  rows="5"
                  className={`w-full bg-gray-800 text-white border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-md py-4 px-4 pt-6 focus:outline-none focus:border-red-500 transition-colors duration-200 resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              
              {/* Submit Button */}
              <div className="form-field">
                <motion.button
                  id="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-md font-medium transition-all duration-300 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </motion.button>
                
                {/* Status Message Container */}
                <div id="form-status" className={`mt-4 ${submitSuccess || errors.submit ? '' : 'hidden'}`}>
                  <p id="status-message" className={submitSuccess ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
                    {submitSuccess ? 'Message sent successfully!' : errors.submit}
                  </p>
                </div>
                
                {/* Success Message - can be removed as we're using the status message above */}
                {/* {submitSuccess && (
                  <motion.div 
                    className="mt-4 p-3 bg-green-600 bg-opacity-20 border border-green-500 text-green-500 rounded-md text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Your message has been sent successfully!
                  </motion.div>
                )} */}
                
                {/* Error Message - can be removed as we're using the status message above */}
                {/* {errors.submit && (
                  <motion.div 
                    className="mt-4 p-3 bg-red-600 bg-opacity-20 border border-red-500 text-red-500 rounded-md text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.submit}
                  </motion.div>
                )} */}
              </div>
            </form>
          </div>
          
          {/* Contact Info Sidebar */}
          <div 
            ref={infoRef}
            className="bg-gray-900 rounded-lg p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
            
            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="info-item flex items-start">
                <div className="bg-red-600 rounded-full p-2 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:contact@quantumworks.services" className="text-white hover:text-red-500 transition-colors duration-300">contact@quantumworks.services</a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="info-item flex items-start">
                <div className="bg-red-600 rounded-full p-2 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+919392609877" className="text-white hover:text-red-500 transition-colors duration-300">+91 9392609877</a>
                </div>
              </div>
              
              {/* Address removed */}
            </div>
            
            {/* Social Links removed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;