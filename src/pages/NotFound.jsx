import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaCalendarAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import './Pages.css';

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  // Links for quick navigation
  const quickLinks = [
    {
      icon: <FaHome />,
      text: 'Home page',
      path: '/'
    },
    {
      icon: <FaCalendarAlt />,
      text: 'Book an event',
      path: '/booking'
    },
    {
      icon: <FaEnvelope />,
      text: 'Contact us',
      path: '/contact'
    }
  ];
  
  return (
    <div className="page not-found-page">
      <div className="container">
        {/* Decorative Background Elements */}
        <div className="dots-pattern"></div>
        
        {/* Decorative shapes */}
        <div className="booking-shapes">
          <div className="booking-shape booking-shape-1"></div>
          <div className="booking-shape booking-shape-2"></div>
          <div className="booking-shape booking-shape-3"></div>
          <div className="booking-shape booking-shape-4"></div>
        </div>
        
        {/* Additional wavy shapes */}
        <div className="wavy-shapes">
          <div className="wavy-shape wavy-shape-1"></div>
          <div className="wavy-shape wavy-shape-2"></div>
        </div>
        
        <motion.div 
          className="not-found-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="not-found-visual"
            variants={itemVariants}
          >
            <div className="error-code">404</div>
            <div className="error-illustration">
              <motion.div 
                className="calendar-page"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              >
                <div className="calendar-header">
                  <FaCalendarAlt />
                </div>
                <div className="calendar-body">
                  <span className="question-mark">?</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="not-found-info"
            variants={itemVariants}
          >
            <h1>Page Not Found</h1>
            <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
            
            <div className="not-found-actions">
              <Link to="/" className="btn-primary">
                Back to Home <FaArrowRight className="icon-right" />
              </Link>
            </div>
            
            <div className="quick-links">
              <h3>You might be looking for:</h3>
              <ul>
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={link.path}>
                      {link.icon} {link.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background shapes */}
      <div className="background-shapes">
        <motion.div 
          className="shape shape-1"
          animate={{ 
            x: [0, 30, -20, 10, 0],
            y: [0, -30, 10, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div 
          className="shape shape-2"
          animate={{ 
            x: [0, -40, 20, -10, 0],
            y: [0, 40, -30, 10, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div 
          className="shape shape-3"
          animate={{ 
            x: [0, 20, -30, 15, 0],
            y: [0, 20, 20, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>
    </div>
  );
};

export default NotFound; 