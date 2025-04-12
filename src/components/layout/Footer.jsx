import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
  
  return (
    <footer className="footer">
      <motion.div 
        className="container footer-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div className="footer-section" variants={itemVariants}>
          <h3>
            <FaCalendarAlt className="icon" />
            EventBook
          </h3>
          <p>Your one-stop solution for event booking and management. Find and book your next event with ease.</p>
          <p className="tagline">Making every event <span className="highlight">memorable</span>.</p>
        </motion.div>
        
        <motion.div className="footer-section" variants={itemVariants}>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/booking">Book Now</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </motion.div>
        
        <motion.div className="footer-section" variants={itemVariants}>
          <h4>Contact Us</h4>
          <p>
            <FaEnvelope className="contact-icon" />
            <a href="mailto:info@eventbook.com">info@eventbook.com</a>
          </p>
          <p>
            <FaPhone className="contact-icon" />
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
          </p>
          <p>
            <FaMapMarkerAlt className="contact-icon" />
            <span>123 Event Avenue, New York, NY 10001</span>
          </p>
          
          <div className="social-icons">
            <motion.a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              whileHover={{ y: -5, scale: 1.1 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              whileHover={{ y: -5, scale: 1.1 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              whileHover={{ y: -5, scale: 1.1 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              whileHover={{ y: -5, scale: 1.1 }}
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div className="footer-section" variants={itemVariants}>
          <h4>Subscribe to Newsletter</h4>
          <p>Stay updated with our latest events and offers</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="form-control" 
            />
            <motion.button 
              type="submit" 
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} EventBook. All rights reserved. | <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 